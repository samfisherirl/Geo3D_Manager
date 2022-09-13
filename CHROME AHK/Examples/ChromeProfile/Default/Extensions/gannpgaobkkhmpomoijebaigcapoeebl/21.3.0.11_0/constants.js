const BROWSER_KEYS = {
	ENABLED : "Unknown_enabled"
};

const BROWSER_VERSION = chrome.runtime.getManifest().version;

const BROWSER_VALUES = {
	SOURCE : "unknown",
	ENVIRONMENT : "background",
	RELEASE : "wallet@" + BROWSER_VERSION
};