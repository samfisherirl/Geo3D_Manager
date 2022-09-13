chrome.webNavigation['onBeforeNavigate'].addListener(function (e) {
	bdiagnostic.log("onBeforeNavigate, tabID " + e.tabId + ", frameID " + e.frameId);
	if (e.frameId === 0) {
		if (walletStatus.subscriptionStatus !== "invalid"
			&& walletStatus.buttonEnabled
			&& walletStatus.db_status === "open") {
			chrome.tabs.sendMessage(e.tabId, {
				"verb": "before-navigate-event"
			});
		}
	}
	if (e.frameId === 0 && tabsInfo.pendingLogins[e.tabId] && tabsInfo.pendingLogins[e.tabId].asked) {
		delete tabsInfo.pendingLogins[e.tabId];
	}
});

function logLastError() {
	if (chrome.runtime.lastError) { 
		bdiagnostic.log(chrome.runtime.lastError.message); 
	} 
}

chrome.webNavigation['onDOMContentLoaded'].addListener(function (e) {
	bdiagnostic.log("onDOMContentLoaded, tabID " + e.tabId + ", frameID " + e.frameId);
	var tabId = e.tabId;
	try {
		if (CanInjectScript(e)) {
			chrome.tabs.executeScript(tabId, { file: "bundle.min.js", frameId: e.frameId});
			chrome.tabs.executeScript(tabId, { file: "constants.js", frameId: e.frameId});
			chrome.tabs.executeScript(tabId, { file: "constants.content.js", frameId: e.frameId});
			chrome.tabs.executeScript(tabId, { file: "constants.override.js", frameId: e.frameId});
			chrome.tabs.executeScript(tabId, { file: "sentry.init.js", frameId: e.frameId});
			chrome.tabs.executeScript(tabId, { file: "content.js", frameId: e.frameId }, 
				logLastError
			);
		}
	} catch (ex) { bdiagnostic.exception(ex); }
});

chrome.webNavigation['onTabReplaced'].addListener(function (e) {
	bdiagnostic.log("onTabReplaced, tabID " + e.tabId);
	var tabId = e.tabId;
	try {
		if (CanInjectScript(e)) {
			chrome.tabs.executeScript(tabId, { file: "content.js", frameId: e.frameId }, 
				logLastError
			);
		}
	} catch (e) { bdiagnostic.exception(e); }
});

function passMessageToTab(msg, doc_context, forgetIds) {
	var tabs = tabsInfo.documentInfos;
	if (doc_context) {
		for (var i = 0, size = tabs.length; i < size; i++) {
			if (tabs[i].context === doc_context) {
				chrome.tabs.sendMessage(tabs[i].tabId, msg);

				break;
			}
		}
	}
	else {
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
			if (tabs && tabs[0]) {
				chrome.tabs.sendMessage(tabs[0].id, msg);
			}
		});
	}
	if (forgetIds) {
		delete tabsInfo.pendingLogins[tabs[i].tabId];
	}
}

function handleHtmlDocUpdate(msg) {
	bdiagnostic.log("wallet_html_doc_update received");
	bdiagnostic.log(msg);

	var msgDoc = msg["wallet_html_doc_update"];
	var verb = msgDoc["wtx-verb"];

	var context;
	if ((verb === "doc-complete") ||                 //Update inputs with rule field
		(verb === "doc-password-generator-rsp") ||   //Fill with pwd values
		(verb === "before-navigate") ||              //Handle 2-phase login
		(verb === "handle-menu-rsp")) {              //Autofill with form values

		context = msgDoc["wtx-context"];
		passMessageToTab(msgDoc, context);
	}
	else if (verb === "doc-autofill") {
		//Autofill with values
		context = msgDoc["wtx-context"];
		passMessageToTab(msgDoc, context, true);
	}
	else if (verb === "open-page") {
		//Autofill with values
		chrome.tabs.create({
			"url": msgDoc["open-url"]
		}, function (tab) {
			bdiagnostic.log("new tab callback for id " + tab.id);
			tabsInfo.pendingLogins[tab.id] = { id: msgDoc["wtx-item-id"], asked: false };
		});
	}
	else if (verb === "handle-menu-report") {
		//Autofill with values
		chrome.tabs.create({
			"url": msgDoc["open-url"]
		});
	}
	else if (verb === "handle-menu-debug") {
		const cmd = msgDoc["wtx-cmd-id"];
		if (cmd) {
			if (cmd === "__dbg-generate-sentry-error") {
				setTimeout(() => { testSentryErrorReporting(); }, 1000);
			};
		}
	}
}

NMH.addListener(function (msg) {
	try {
		if (typeof msg["wallet_html_doc_update"] !== "undefined") {
			handleHtmlDocUpdate(msg);
		}
		if (typeof msg["ping"] !== "undefined") {
			var ping = msg["ping"];
			bdiagnostic.log("ping received: " + ping);
			NMH.postMessage({ 'ping_response': ping });
		}
	} catch (e) {
		bdiagnostic.exception(e);
	}
});

chrome.browserAction.onClicked.addListener(function (tab) {
	bdiagnostic.log("button clicked");
	var msg = {};
	if (walletStatus.buttonEnabled) {
		if (walletStatus.db_status === "not configured") {
			NMH.postMessage({
				method: "configure-wallet",
				data: null
			});
		} else if (walletStatus.db_status === "open") {
			var parentTitle = "";
			var parentUrl = "";
			if (tab) {
				parentTitle = tab.title;
				parentUrl = tab.url;
				if (tabsInfo[tab.id]) {
					try {
						parentTitle = tabsInfo.topInfos[tab.id].title;
						parentUrl = tabsInfo.topInfos[tab.id].url;
					} catch (e) {
						bdiagnostic.exception(e);
					}
				}
			}
			msg["wtx-title"] = parentTitle;
			msg["wtx-parent-url"] = parentUrl;

			NMH.postMessage({
				method: "drop-down",
				data: msg
			});
		} else if (walletStatus.db_status === "locked") {
			NMH.postMessage({
				method: "unlock-wallet",
				data: null
			});
		}
	}
	else if (!walletStatus.agent_running && (walletStatus.subscriptionStatus !== "valid")) {
		walletStatus.openWalletTimestamp = Date.now();
		NMH.postMessage({
			method: "start-agent",
			data: null
		});
	}
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (!walletStatus.buttonEnabled || walletStatus.db_status !== "open") {
		return;
	}
	bdiagnostic.log("received", message);
	try {
		var tabId;
		var msg;
		if (message.verb === "request-generate-password") {
			NMH.postMessage({
				method: "request-generate-password",
				data: message.data
			});
		} else if (message.verb === "info-onclick") {
			NMH.postMessage({
				method: "on-msg-html-doc",
				data: message.data
			});
		} else if (message.verb === "info-onsubmit") {
			tabId = sender.tab.id;
			msg = message.data;

			var parentTitle = sender.tab.title;
			var parentUrl = sender.tab.url;
			
			try {
				parentTitle = tabsInfo.topInfos[tabId].title;
				parentUrl = tabsInfo.topInfos[tabId].url;
			} catch (e) {
				bdiagnostic.exception(e);
			}

			try {
				if (msg["wtx-verb"] = "before-navigate") {
					if (msg["wtx-title-error"] === "true") {
						msg["wtx-title"] = parentTitle;
					}
					if (msg["wtx-parent-url-error"] === "true") {
						if (URI(msg["wtx-before-url"]).domain() === 
							URI(parentUrl).domain()) {

							msg["wtx-parent-url"] = parentUrl;
						}
						else {
							msg["wtx-parent-url"] = msg["wtx-before-url"];
						}
					}
				}
			} catch (e) {
				bdiagnostic.exception(e);
			}

			NMH.postMessage({
				method: "on-msg-html-doc",
				data: msg
			});
		} else if (message.verb === "info-oncomplete") {
			tabId = sender.tab.id;
			msg = message.data;

			tabsInfo.topInfos[tabId] = tabsInfo.topInfos[tabId] || {};
			tabsInfo.topInfos[tabId].title = sender.tab.title;
			tabsInfo.topInfos[tabId].url = sender.tab.url;

			try {
				if (msg["wtx-title-error"] === "true") {
						msg["wtx-title"] = sender.tab.title;
					}
					if (msg["wtx-parent-url-error"] === "true") {
						if (URI(msg["wtx-before-url"]).domain() === 
							URI(sender.tab.url).domain()) {

							msg["wtx-parent-url"] = sender.tab.url;
						}
						else {
							msg["wtx-parent-url"] = msg["wtx-before-url"];
						}
					}
			} catch (e) {
				bdiagnostic.exception(e);
			}

			bdiagnostic.log("Interogating loginId of new tab " + tabId);
			if (tabsInfo.pendingLogins[tabId] && tabsInfo.pendingLogins[tabId].id) {
				msg["wtx-item-id"] = tabsInfo.pendingLogins[tabId].id;
				tabsInfo.pendingLogins[tabId].asked = true;
			}

			tabsInfo.documentInfos.push({
				tabId: sender.tab.id,
				context: msg["wtx-context"]
			});

			NMH.postMessage({
				method: "on-msg-html-doc",
				data: msg
			});
		} else if (message.verb === "update-buttons-status") {
			tabId = sender.tab.id;
			msg = (walletStatus.subscriptionStatus !== "invalid"
				&& walletStatus.buttonEnabled
				&& walletStatus.db_status === "open") ? "show-wallet-controls" : "hide-wallet-controls";
			chrome.tabs.sendMessage(tabId, {
				"verb": msg
			});
		}
	} catch (ex) { bdiagnostic.exception(ex); }
});