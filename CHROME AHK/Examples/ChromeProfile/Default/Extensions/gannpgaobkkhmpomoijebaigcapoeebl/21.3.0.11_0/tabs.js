var tabsInfo = (function () {
	var pendingLogins = {};
	var documentInfos = [];
	var topInfos = {};
	
	return {
		pendingLogins : pendingLogins,
		documentInfos : documentInfos,
		topInfos : topInfos
	};
})();

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	delete tabsInfo.pendingLogins[tabId];
	delete tabsInfo.topInfos[tabId];

	for (var i = tabsInfo.documentInfos.length - 1; i >= 0; i--) {
		if (tabsInfo.documentInfos[i].tabId === tabId) {
			tabsInfo.documentInfos.splice(i,1);
		}
	}
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    NMH.postMessage({
        method: "tab-change",
        data: null
    });
});