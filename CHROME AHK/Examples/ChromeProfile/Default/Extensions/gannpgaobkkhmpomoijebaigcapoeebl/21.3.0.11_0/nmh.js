var NMH = NMH || function (undefined) {
	var port = undefined;

	function getPort() {
		return port;
	}

	var subscribers = [];
	var fragments = {};

	function addListener(callback) {
		subscribers.push(callback);
	}


	function onMessage(msg) {
        try {
            if (msg["nmh_message"]) {
                if (msg["nmh_message"] === "update") {
                    uninitPort();
                    chrome.browserAction.setTitle({ title: TooltipStrings.update });
                }
            }
			if (msg.reply === "success") {
				bdiagnostic.log("nmh message fragment id:" + msg.id + " fragment-no:" + msg.fragment);
				fragments[msg.id] = fragments[msg.id] || "";
				if (msg.fragment === "final") {
					var assembledMessage = fragments[msg.id] + msg.data;
					delete fragments[msg.id];

					var utf8Arr = base64DecToArr(assembledMessage);
					var stringMessage = UTF8ArrToStr(utf8Arr);
					var finalMessage = JSON.parse(stringMessage);

					var i = 0;
					for (var i = 0, size = subscribers.length; i < size; i++) {
						subscribers[i](finalMessage);
					}
				} else {
					//TODO: Check id order. Shouldn't be an issue, though;
					var currMessage = fragments[msg.id];
					fragments[msg.id] = currMessage + msg.data;
				}
			}
		} catch (e) {
			bdiagnostic.exception(e);
		}
		return true;
	}

	function postMessage(msg) {
		function splitSubstr(str, len) {
			var ret = [];
			for (var offset = 0, strLen = str.length; offset < strLen; offset += len) {
				ret.push(str.substr(offset, len));
			}
			return ret;
		}

		function genid() {
			var id = [];
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 10; i++)
				id.push(possible.charAt(Math.floor(Math.random() * possible.length)));

			return id.join();
		}
		try {
			var manifest = chrome.runtime.getManifest();
			if (!manifest) {
				manifest = {
					'version': "unknown"
				};
			}
			msg['__version__'] = manifest.version;
			var str_msg = JSON.stringify(msg);

			var utf8array = strToUTF8Arr(str_msg);
			var base64enc = base64EncArr(utf8array);

			var encLenght = base64enc.length;

			var chunks = splitSubstr(base64enc, 512);

			var id = genid();

			var i = 0,
				size = 0;
			for (i = 0, size = chunks.length; i < size; i++) {
				port.postMessage({
					'id': id,
                    'fragment': (i === (size - 1)) ? 'final' : i,
					'msg': chunks[i]
				});
			}
		} catch (e) {
			bdiagnostic.exception(e);
		}
	}
	
	function checkAndUninstall(p) {
		if (p.error && p.error.message && browser) {
			if (p.error.message.startsWith("No such native application")) {
				browser.management.getSelf().then(function (info) {
					setTimeout(() => {
						browser.management.uninstallSelf();
					}, 500);
				});
			}
		}
	}

	function initPort() {
		bdiagnostic.log("nmh starting new port");

		if (port) {
			port.disconnect();
		}
		port = chrome.runtime.connectNative('com.bitdefender.wallet.v19');
		checkAndUninstall(port);
		port.onDisconnect.addListener(function (p) {
			checkAndUninstall(p);
			bdiagnostic.log("Port disconnected");
			uninitPort();
			if (chrome.runtime.lastError && chrome.runtime.lastError.message === "Specified native messaging host not found.") {
				bdiagnostic.log("Missing native messaging host");
				//TODO Show message to user that NMH is not installed (kit is missing);
			}
		});
		port.onMessage.addListener(onMessage);
		postMessage({
			'method': 'init-host',
			'data': null
		});
	}

	function uninitPort() {
		if (port) {
			bdiagnostic.log("nmh destroying port");
			port.disconnect();
			port = null;
		}
		chrome.browserAction.setTitle({ title: TooltipStrings.restart });
		chrome.browserAction.setIcon({ path: "images/ico_wallet_off.png" });
		walletStatus.buttonEnabled = false;
	}

	initPort();

	return {
		name: "NMH",
		initPort: initPort,
		uninitPort: uninitPort,
		getPort: getPort,
		postMessage: postMessage,
		addListener: addListener,
	}
}
	();
