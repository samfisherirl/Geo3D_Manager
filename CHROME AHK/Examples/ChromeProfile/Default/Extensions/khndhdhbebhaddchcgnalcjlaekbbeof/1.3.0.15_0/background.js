/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BROWSER_CONTEXT = exports.TELEMETRY_EVENT_TYPE = exports.SCREEN_UI = exports.TAB_INFO_TRANSITION = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.CategoryInfo = CategoryInfo;
exports.getTrackerCategoryName = getTrackerCategoryName;
exports.getTrackerCategoryDescription = getTrackerCategoryDescription;
exports.getTrackerCategoryTooltip = getTrackerCategoryTooltip;
exports.getTrackerCategoryStatus = getTrackerCategoryStatus;
exports.setBadgeMessage = setBadgeMessage;
exports.copyTabInfo = copyTabInfo;
exports.copyTabStack = copyTabStack;
exports.getTabStackTrackersBlocked = getTabStackTrackersBlocked;
exports.updateUiStack = updateUiStack;
exports.getTelemetryJson = getTelemetryJson;
exports.isBdTrackingIds = isBdTrackingIds;
exports.TabInfo = TabInfo;
exports.getPathFromUrl = getPathFromUrl;
exports.getTabUrl = getTabUrl;
exports.getBrowserContext = getBrowserContext;
exports.getDomain = getDomain;
exports.isThirdPartyDomain = isThirdPartyDomain;
exports.replaceStringInObjectProperties = replaceStringInObjectProperties;

var _parseUrl = __webpack_require__(8);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _urijs = __webpack_require__(12);

var _urijs2 = _interopRequireDefault(_urijs);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

var _tracking = __webpack_require__(17);

var _tracking2 = _interopRequireDefault(_tracking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * helpers functions
 */

//chrome.extension.getBackgroundPage().
function CategoryInfo() {
    this.name = '';
    this.blocked = '';
    this.icon = '';
    this.className = '';
}

function setCategoryInfo(bdLang, catTitle, pageTitle, catIcon, catClassName) {
    var catInfo = new CategoryInfo();

    catInfo.name = bdLang.getString(catTitle);
    catInfo.blocked = bdLang.getString(pageTitle);
    catInfo.icon = catIcon;
    catInfo.className = catClassName;

    return catInfo;
}

function setCategoryStatus(bdLang, catStatus, catEnabled, catDisabled) {
    var status = '';

    if (catStatus) {
        status = bdLang.getString(catEnabled);
    } else {
        status = bdLang.getString(catDisabled);
    }

    return status;
}

/**
 * get trackers category name
 * @param {*} trackerCategoryType 
 */
function getTrackerCategoryName(bdLang, trackerCategoryType) {

    var catInfo = new CategoryInfo();

    switch (trackerCategoryType) {
        case '1':
            {
                catInfo = setCategoryInfo(bdLang, 'advertising_category_title', 'advertising_page_title', 'advertising-icon', 'category-trackers-list advertising');
                break;
            }
        case '2':
            {
                catInfo = setCategoryInfo(bdLang, 'analytics_category_title', 'analytics_page_title', 'analytics-icon', 'category-trackers-list analytics');
                break;
            }
        case '4':
            {
                catInfo = setCategoryInfo(bdLang, 'interaction_category_title', 'interaction_page_title', 'customer-icon', 'category-trackers-list customer');
                break;
            }
        case '8':
            {
                catInfo = setCategoryInfo(bdLang, 'social_category_title', 'social_page_title', 'social-icon', 'category-trackers-list social');
                break;
            }
        case '16':
            {
                catInfo = setCategoryInfo(bdLang, 'essential_category_title', 'essential_page_title', 'essentials-icon', 'category-trackers-list essentials');
                break;
            }
    }

    return catInfo;
}

/**
 * getTrackerCategoryDescription
 * @param {*} trackerCategoryType 
 */
function getTrackerCategoryDescription(bdLang, trackerCategoryType) {

    var description = '';

    switch (trackerCategoryType) {
        case '1':
            {
                description = bdLang.getString("advertising_category_desc");
                break;
            }
        case '2':
            {
                description = bdLang.getString("analytics_category_desc");
                break;
            }
        case '4':
            {
                description = bdLang.getString("interaction_category_desc");
                break;
            }
        case '8':
            {
                description = bdLang.getString("social_category_desc");
                break;
            }
        case '16':
            {
                description = bdLang.getString("essential_category_desc");
                break;
            }
    }

    return description;
}

/**
 * getTrackerCategoryTooltip
 * @param {*} trackerCategoryType 
 */
function getTrackerCategoryTooltip(bdLang, trackerCategoryType) {

    var tooltip = '';

    switch (trackerCategoryType) {
        case '1':
            {
                tooltip = bdLang.getString("advertising_category_tooltip");
                break;
            }
        case '2':
            {
                tooltip = bdLang.getString("analytics_category_tooltip");
                break;
            }
        case '4':
            {
                tooltip = bdLang.getString("interaction_category_tooltip");
                break;
            }
        case '8':
            {
                tooltip = bdLang.getString("social_category_tooltip");
                break;
            }
        case '16':
            {
                tooltip = bdLang.getString("essential_category_tooltip");
                break;
            }
    }

    return tooltip;
}

/**
 * getTrackerCategoryStatus
 * @param {*} trackerCategoryStatus 
 */
function getTrackerCategoryStatus(bdLang, trackerCategoryType, trackerCategoryStatus) {

    var status = '';

    switch (trackerCategoryType) {
        case '1':
            {
                status = setCategoryStatus(bdLang, trackerCategoryStatus, 'advertising_page_button_block', 'advertising_page_button_unblock');
                break;
            }
        case '2':
            {
                status = setCategoryStatus(bdLang, trackerCategoryStatus, 'analytics_page_button_block', 'analytics_page_button_unblock');
                break;
            }
        case '4':
            {
                status = setCategoryStatus(bdLang, trackerCategoryStatus, 'interaction_page_button_block', 'interaction_page_button_unblock');
                break;
            }
        case '8':
            {
                status = setCategoryStatus(bdLang, trackerCategoryStatus, 'social_page_button_block', 'social_page_button_unblock');
                break;
            }
        case '16':
            {
                status = setCategoryStatus(bdLang, trackerCategoryStatus, 'essential_page_button_block', 'essential_page_button_unblock');
                break;
            }
    }

    return status;
}

/* setBadgeMessage
 * @param {*} currentTabId, nrTrackers
 */
function setBadgeMessage(currentTabId, nrTrackers) {

    chrome.browserAction.setBadgeBackgroundColor({ color: "rgb(0,0,255)" });
    chrome.browserAction.setBadgeText({ text: nrTrackers.toString(), tabId: currentTabId });
}

function copyTabInfo(inputTabInfo) {
    var outputTabInfo = {
        'transition': TAB_INFO_TRANSITION.COMMITED,
        'url': '',
        'trackersBlocked': 0,
        'pageLoad': 0,
        'pageLoadStartTime': 0,
        'trackersMap': {}
    };
    if (inputTabInfo !== undefined) {
        outputTabInfo = {
            'transition': inputTabInfo.transition,
            'url': inputTabInfo.url,
            'trackersBlocked': inputTabInfo.trackersBlocked,
            'pageLoad': inputTabInfo.pageLoad,
            'pageLoadStartTime': inputTabInfo.pageLoadStartTime,
            'trackersMap': inputTabInfo.trackersMap
        };
    }
    return outputTabInfo;
}

function copyTabStack(inputTabStack) {
    var outputTabStack = [];
    if (inputTabStack !== undefined) {
        for (var i = 0; i < inputTabStack.length; i++) {
            var outputTabInfo = copyTabInfo(inputTabStack[i]);
            outputTabStack[i] = outputTabInfo;
        }
    }
    return outputTabStack;
}

function getTabStackTrackersBlocked(inputTabStack) {
    var trackersBlocked = 0;
    if (inputTabStack !== undefined) {
        for (var i = 0; i < inputTabStack.length; i++) {
            trackersBlocked += inputTabStack[i].trackersBlocked;
        }
    }
    return trackersBlocked;
}

/* updateUiStack
 * @param {*} tabId, inputTabStack, whitelist
 */
function updateUiStack(tabId, inputTabStack, whitelist) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (null != tabs && null != tabs[0]) {
            if (tabId === tabs[0].id && null != inputTabStack) {

                var inputTabInfo = inputTabStack[0];
                if (null != inputTabInfo) {

                    var trackersBlocked = getTabStackTrackersBlocked(inputTabStack);
                    var objectTabStack = copyTabStack(inputTabStack);

                    setBadgeMessage(tabId, trackersBlocked);
                    chrome.runtime.sendMessage({
                        type: 'update_tab_stack',
                        tabStack: objectTabStack,
                        sessionWhitelist: whitelist });
                }
            }
        }
    });
}

/* getTelemetryJson
 * @param {*} telemetry_type, telemetry_value
 */
function getTelemetryJson(telemetry_type, telemetry_value) {

    var telemetry_json = {
        'method': 'send_telemetry',
        'browser_context': getBrowserContext()
    };

    var telemetry_info = {
        'type': telemetry_type,
        'value': telemetry_value
    };
    telemetry_json['telemetry_info'] = telemetry_info;

    return telemetry_json;
}

/* isBdTrackingIds
 * @param  tab_url: cirrent tab url
 * @param  scan_url: current scan url
 */
function isBdTrackingIds(tab_url, scan_url) {

    var scan_url_lower = scan_url.toLowerCase();
    if (tab_url.toLowerCase().includes('bitdefender') || scan_url_lower.includes('bitdefender')) {
        return true;
    }

    if (scan_url_lower.includes('assets.adobedtm.com/launch-en6b51aa9552f941f88576315ed8766e3f')) {
        return true;
    }

    if (scan_url_lower.includes('assets.adobedtm.com/4b7ac0a30c6cfe2deb06368f62d41f996c29744e/satelliteLib-3a8d5287cf775324dc6c68719a1ddc96c5a139ba')) {
        return true;
    }

    if (scan_url_lower.includes('gtm-pljjb3') || scan_url_lower.includes('gtm-mq8rtn')) {
        return true;
    }

    if (scan_url_lower.includes('assets.adobedtm.com/launch-ENa82c50bdc4c541bdb7d581931510efc5')) {
        return true;
    }

    if (scan_url_lower.includes('assets.adobedtm.com/extensions/EP308220a2a4c4403f97fc1960100db40f/AppMeasurement')) {
        return true;
    }

    if (scan_url_lower.includes('assets.adobedtm.com/extensions/EP308220a2a4c4403f97fc1960100db40f/AppMeasurement_Module_AudienceManagement')) {
        return true;
    }

    if (scan_url_lower.includes('assets.adobedtm.com/8a93f8486ba4/df27e7ff35f3/6ad1b33eca05/RC22febb28520c43e3af9acfb4f9bfa34f')) {
        return true;
    }

    return false;
}

var TAB_INFO_TRANSITION = exports.TAB_INFO_TRANSITION = {
    COMMITED: 1,
    PROVISIONAL: 2

    /* TabInfo
     * @param null
     */
};function TabInfo() {
    this.transition = TAB_INFO_TRANSITION.COMMITED;
    this.url = '';
    this.trackersBlocked = 0;
    this.pageLoad = 0;
    this.pageLoadStartTime = 0;
    this.trackersMap = {};
}

var SCREEN_UI = exports.SCREEN_UI = {
    MAIN: 1,
    CATEGORY: 2,
    SETTINGS: 4
};

var TELEMETRY_EVENT_TYPE = exports.TELEMETRY_EVENT_TYPE = {
    ENABLED: 0,
    PAUSE: 1,
    ADVERTISING: 2,
    ANALYTICS: 3,
    INTERACTION: 4,
    SOCIAL_MEDIA: 5,
    ESSENTIAL: 6,
    SPECIAL_OFFERS: 7
};

var BROWSER_CONTEXT = exports.BROWSER_CONTEXT = {
    BROWSER_CONTEXT_ALL: 0,
    BROWSER_CONTEXT_CHROME: 1,
    BROWSER_CONTEXT_FIREFOX: 2,
    BROWSER_CONTEXT_EDGE: 3,
    BROWSER_CONTEXT_IE: 4,
    BROWSER_CONTEXT_IE64: 5,
    BROWSER_CONTEXT_UNKNOWN: 6

    /* getPathFromUrl
     * @param {String} url
     */
};function getPathFromUrl(url) {
    return url.split(/[?#]/)[0];
}

function getTabUrl(url) {
    if (undefined !== url) {
        if (url.startsWith('file:')) {
            return url;
        } else {
            return (0, _parseUrl2.default)(url).hostname;
        }
    }
    return url;
}

function getBrowserContext() {

    try {
        var internalUrl = chrome.runtime.getURL("home.html");
        if (internalUrl.toLowerCase().startsWith('moz-extension')) {
            return BROWSER_CONTEXT.BROWSER_CONTEXT_FIREFOX;
        }
        if (internalUrl.toLowerCase().startsWith('chrome-extension://')) {
            return BROWSER_CONTEXT.BROWSER_CONTEXT_CHROME;
        }
        if (internalUrl.toLowerCase().startsWith('extension://')) {
            return BROWSER_CONTEXT.BROWSER_CONTEXT_EDGE;
        }
        return BROWSER_CONTEXT_EDGE;
    } catch (ex) {}

    if ('bdtbe@bitdefender.com' === chrome.runtime.id) {
        return BROWSER_CONTEXT.BROWSER_CONTEXT_FIREFOX;
    }

    return BROWSER_CONTEXT.BROWSER_CONTEXT_UNKNOWN;
}

/**
 * 
 * @param {String} host_name 
 */
function getDomain(host_name) {
    var uri = new _urijs2.default(host_name);
    if (uri.protocol() === '') {
        uri = new _urijs2.default('https://' + host_name);
    }
    var domain = uri.domain();
    _log2.default.info('getDomain: [' + host_name + '] [' + domain + ']');
    return domain;
}

/**
 * 
 * @param {String} request_host 
 * @param {String} tab_host 
 */
function isThirdPartyDomain(request_host, tab_host) {
    var ret = true;
    if (null === request_host || null === tab_host) {
        ret = false;
    } else {
        ret = getDomain(request_host) !== getDomain(tab_host);
    }
    if (ret) {
        if (_tracking2.default.isThirdPartyDomainException(request_host, tab_host)) {
            _log2.default.info('isThirdPartyDomainException: [' + request_host + '] <- [' + tab_host + ']');
            ret = false;
        }
    }
    _log2.default.info('isThirdPartyDomain: [' + request_host + '] <- [' + tab_host + '] [' + ret + ']');
    return ret;
}

function replaceStringInObjectProperties(entity, regExp, replacement) {
    for (var property in entity) {
        if (!entity.hasOwnProperty(property)) {
            continue;
        }
        var value = entity[property];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object") {
            value = replaceStringInObjectProperties(value, regExp, replacement);
        } else if (typeof value === "string") {
            value = value.replace(regExp, replacement);
        }
        entity[property] = value;
    }
    return entity;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = __webpack_require__(23);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE = 'bdat';
var COLOURS = {
  trace: 'lightblue',
  info: 'purple',
  warn: 'orange',
  error: 'red'
};

//check for debug logs
//console.log(process.env.NODE_ENV);
//console.log(process.env.DEBUG);
//console.log(process.env.APP_RELEASE);

localStorage.removeItem('debug');
_debug2.default.disable();
if (false) {}

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);

    this.source = null;
  }

  _createClass(Log, [{
    key: 'init',
    value: function init(source) {
      this.source = source;
    }
  }, {
    key: 'generateMessage',
    value: function generateMessage(level, message) {
      // Set the prefix which will cause debug to enable the message
      var namespace = BASE + ':' + level;
      var createDebug = (0, _debug2.default)(namespace);

      // Set the colour of the message based on the level
      createDebug.color = COLOURS[level];

      if (this.source) {
        createDebug(this.source, message);
      } else {
        createDebug(message);
      }
    }
  }, {
    key: 'trace',
    value: function trace(message) {
      return this.generateMessage('trace', message);
    }
  }, {
    key: 'info',
    value: function info(message) {
      return this.generateMessage('info', message);
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      return this.generateMessage('warn', message);
    }
  }, {
    key: 'error',
    value: function error(message) {
      return this.generateMessage('error', message);
    }
  }]);

  return Log;
}();

exports.default = new Log();

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urijs = __webpack_require__(12);

var _urijs2 = _interopRequireDefault(_urijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (url) {

  if (null === url || '' === url) {
    return {
      schema: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: ''
    };
  }

  try {
    var uri = new _urijs2.default(url);
    return {
      schema: uri.protocol(),
      hostname: uri.hostname(),
      port: uri.port(),
      pathname: uri.pathname(),
      search: uri.search(),
      hash: uri.hash()
    };
  } catch (ex) {}

  return {
    schema: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
    hash: ''
  };
};

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.2
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(13), __webpack_require__(15), __webpack_require__(16));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13), __webpack_require__(15), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  function isInteger(value) {
    return /^[0-9]+$/.test(value);
  }

  URI.version = '1.19.2';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      preventInvalidHostname: URI.preventInvalidHostname,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: throw on invalid hostname
  // see https://github.com/medialize/URI.js/pull/345
  // and https://github.com/medialize/URI.js/issues/354
  URI.preventInvalidHostname = false;
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\._-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // list of protocols which always require a hostname
  URI.hostProtocols = [
    'http',
    'https'
  ];

  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {
        preventInvalidHostname: URI.preventInvalidHostname
      };
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    if (!string) {
      string = '';
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    if (parts.preventInvalidHostname) {
      URI.ensureValidHostname(parts.hostname, parts.protocol);
    }

    if (parts.port) {
      URI.ensureValidPort(parts.port);
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';
    var requireAbsolutePath = false

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
      requireAbsolutePath = true
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && requireAbsolutePath) {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key)) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };

  URI.setQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.setQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      data[name] = value === undefined ? null : value;
    } else {
      throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
    }
  };

  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v, protocol) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    var hasHostname = !!v; // not null and not an empty string
    var hasProtocol = !!protocol;
    var rejectEmptyHostname = false;

    if (hasProtocol) {
      rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
    }

    if (rejectEmptyHostname && !hasHostname) {
      throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
      }
    }
  };

  URI.ensureValidPort = function (v) {
    if (!v) {
      return;
    }

    var port = Number(v);
    if (isInteger(port) && (port > 0) && (port < 65536)) {
      return;
    }

    throw new TypeError('Port "' + v + '" is not a valid port');
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (key === 'query') { continue; }
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
      if (src.query) {
        this.query(src.query, false);
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v) {
      // accept trailing ://
      v = v.replace(/:(\/\/)?$/, '');

      if (!v.match(URI.protocol_expression)) {
        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
      }
    }

    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        URI.ensureValidPort(v);
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = { preventInvalidHostname: this._parts.preventInvalidHostname };
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
      if (this._parts.preventInvalidHostname) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }
    }

    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      if (v) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      URI.ensureValidHostname(v, this._parts.protocol);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (resolved._parts.protocol) {
      // Directly returns even if this._parts.hostname is empty.
      return resolved;
    } else {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.preventInvalidHostname = function(v) {
    this._parts.preventInvalidHostname = !!v;
    return this;
  };

  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)(module), __webpack_require__(14)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.19.2
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }

    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.19.2
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * tracking logic 
 */
var thirdPartyDomainExceptions = [{
  from: 'drive.google.com',
  to: ['ssl.gstatic.com', 'www.gstatic.com', 'fonts.gstatic.com', 'fonts.googleapis.com', '(.+)\\.googleusercontent\\.com$']
}, {
  from: 'docs.google.com',
  to: ['ssl.gstatic.com', 'www.gstatic.com', 'fonts.gstatic.com', 'fonts.googleapis.com', '(.+)\\.googleusercontent\\.com$']
}, {
  from: '(.+)\\.googleusercontent\\.com$',
  to: ['ssl.gstatic.com', 'www.gstatic.com', 'www.google.com', 'drive.google.com', 'docs.google.com', 'accounts.google.com', 'play.google.com', 'clients([0-9]+)\\.google\\.com$']
}, {
  from: 'accounts.google.com',
  to: ['(.+)\\.googleusercontent\\.com$']
}];

var cookiesSet = new Set(['nosdn.127.net', 'bnet.163.com', '123greetings.com', '122.2o7.net', '112.2o7.net', '5min.com', 'accuweather.com', 'actionnetwork.org', 'imagesrv.adition.com', 'auth.adobe.com', 'wwwimages.adobe.com', 'xsdownload.adobe.com', 'assets.adobedtm.com', 'affirm.com', 'akamai.net', 'akamaihd.net', 'akamaized.net', 'al.com', 'alert60.com', 'alexa.com', 'ally.com', 's3.amazonaws.com', 'amazonaws.com', 'coin.amazonpay.com', 'coin-eu.amazonpay.com', 'americanhomecomings.com', 'ancestry.com', 'angularjs.org', 'anonymto.me', 'up.anv.bz', 'anvato.net', 'tkx-acc.apis.anvato.net', 'cdn.anvato.net', 'tkx2-prod.anvato.net', 'mcp-media5.anvato.net', 'aol.com', 'aolcdn.com', 'ap.org', 'apnewsregistry.com', 'hiroservers.appspot.com', 'snapabug.appspot.com', 'appspot.com', 'arcgis.com', 'arcgisonline.com', 'archive.org', 'secure5.arcot.com', 'arcot.com', 'cdn.arstechnica.net', 'art19.com', 'aspnetcdn.com', 'c64.assets-yammer.com', 'assetfiles.com', 'assets-cdk.com', 'auth0.com', 'authorize.net', 'autoforums.com', 'azureedge.net', 'bac-assets.com', 'api.map.baidu.com', 'sapi.map.baidu.com', 'bandcamp.com', 'bankid.no', 'bankrate.com', 'bazaarvoice.com', 'bcbits.com', 'betterttv.net', 'static.beyondmenu.com', 'www.beyondmenu.com', 'bigcommerce.com', 'www.bing.com', 'bit.ly', 'bizrate.com', 'blockstack.org', 'blogblog.com', 'blogger.com', 'blogher.org', 'blogspot.com', 'bp.blogspot.com', 'bloxcms.com', 'boldchat.com', 'bootstrapcdn.com', 'braintreegateway.com', 'brcdn.com', 'break.com', 'breakingburner.com', 'brightcove.com', 'players.brightcove.net', 'bungie.net', 'buzzfed.com', 'buzzfeed.com', 'cachefly.net', 'cardinalcommerce.com', 'cars.com', 'cbsi.com', 'cbsimg.net', 'cbsistatic.com', 'cdninstagram.com', 'cdnpk.com', 'cern.ch', 'charter.com', 'pwc.chase.com', 'civicscience.com', 'cleanprint.net', 'cleveland.com', 'cloudflare.com', 'cloudfront.net', 'cloudinary.com', 'bbb.org', 'grapeshot.co.uk', 'w.graphiq.com', 's.graphiq.com', 's2.graphiq.com', 's3.graphiq.com', 'files.graphiq.com', 'gr-assets.com', 'guardian.co.uk', 'media-imdb.com', 'mediaworks.co.nz', 'cc.cnetcontent.com', 'cdn.cnetcontent.com', 'ws.cnetcontent.com', 'com.com', 'complex.com', 'convio.net', 'copyscape.com', 'corporate-ir.net', 'coupons.com', 'craveonline.com', 'creativecommons.org', 'crowdynews.com', 'cstv.com', 'cursecdn.com', 'custhelp.com', 'd3js.org', 'dailymotion.com', 'danid.dk', 'dealer.com', 'dealerinspire.com', 'delicious.com', 'delvenetworks.com', 'denverpost.com', 'deviantart.com', 'deviantart.net', 'digitalriver.com', 'digitalrivercontent.net', 'cdn.discourse.org', 'discovery.com', 'disqus.com', 'disquscdn.com', 'a.disquscdn.com', 'uploads.disquscdn.com', 'dmcdn.net', 'dmcdn.com', 'screendoor.dobt.co', 'documentcloud.org', 'domainnamesales.com', 'donorbox.org', 'dotsub.com', 'dl.dropboxusercontent.com', 'dudamobile.com', 'dumpert.nl', 'duosecurity.com', 'cdn.dynamicyield.com', 'cdn-eu.dynamicyield.com', 'rcom.dynamicyield.com', 'rcom-eu.dynamicyield.com', 'static.dynamicyield.com', 'st.dynamicyield.com', 'st-eu.dynamicyield.com', 'ebayimg.com', 'ebayrtm.com', 'ebaystatic.com', 'ecwid.com', 'edgecastcdn.net', 'edgefcs.net', 'edgekey.net', 'editmysite.com', 'files.edx.org', 'ehc.com', 'elasticbeanstalk.com', 'eltrafiko.com', 'api-cdn.embed.ly', 'api.embed.ly', 'cdn.embed.ly', 'cdn.embedly.com', 'i-cdn.embed.ly', 'i.embed.ly', 'epoch.com', 'epoq.de', 'estara.com', 'et4.de', 'ethn.io', 'evcdn.com', 'ebmedia.eventbrite.com', 'everyaction.com', 's-static.ak.facebook.com', 'staticxx.facebook.com', 'fansonly.com', 'travis-ci-org.global.ssl.fastly.net', 'fastly.net', 'fbcdn.net', 'attachment.fbsbx.com', 'feedburner.com', 'filepicker.io', 'financialcontent.com', 'findnsave.com', 'firstlook.org', 'flipcause.com', 'framasoft.org', 'frz.io', 'build.origami.ft.com', 'fz.io', 'fzcdn.net', 'hello.firefox.com', 'flattr.com', 'flickr.com', 'fling.com', 'flowplayer.org', 'flyertown.ca', 'adm.fwmrm.net', 'fontawesome.com', 'fontdeck.com', 'fonts.com', 'fonts.net', 'force.com', 'fuseservice.com', '140cc.v.fwmrm.net', 'fyre.co', 'gannett-cdn.com', 'gannettonline.com', 'gannett-tv.com', 'gasbuddy.com', 'gawkerassets.com', 'geenstijl.nl', 'geetest.com', 'geoplugin.net', 'geotrust.com', 'getpocket.com', 'giant.gfycat.com', 'gfycat.com', 'ggpht.com', 'gigya.com', 'giphy.com', 'github.com', 'githubusercontent.com', 'gmodules.com', 'go.com', 'godaddy.com', 'godatafeed.com', 'gogousenet.com', 'apis.google.com', 'books.google.com', 'calendar.google.com', 'checkout.google.com', 'clients1.google.com', 'clients6.google.com', 'consent.google.com', 'cse.google.com', 'developers.google.com', 'docs.google.com', 'drive.google.com', 'feedburner.google.com', 'feedproxy.google.com', 'fonts.google.com', 'fusiontables.google.com', 'kh.google.com', 'khms0.google.com', 'khms1.google.com', 'khms2.google.com', 'khms3.google.com', 'khms4.google.com', 'labs.google.com', 'mapsengine.google.com', 'maps.google.com', 'mt0.google.com', 'mt1.google.com', 'mts0.google.com', 'mts1.google.com', 'mw1.google.com', 'mw2.google.com', 'pay.google.com', 'picasaweb.google.com', 'play.google.com', 'plus.google.com', 'sites.google.com', 'smartlock.google.com', 'spreadsheets.google.com', 'talkgadget.google.com', 'translate.google.com', 'trends.google.com', 'video.google.com', 'ajax.googleapis.com', 'storage.googleapis.com', 'googleapis.com', 'googlecode.com', 'googlecommerce.com', 'googletagservices.com', 'cdn.leafletjs.com', 'lh4.googleusercontent.com', 'googleusercontent.com', 'googlevideo.com', 'governmentjobs.com', 'gravatar.com', 'greenhouse.io', 'gscdn.nl', 'gstatic.com', 'guildwars2.com', 'hackerone-user-content.com', 'helium.com', 'hellobar.com', 'herokuapp.com', 'code.highcharts.com', 'homestead.com', 'cdn.hometogo.net', 'honcode.ch', 'hootsuite.com', 'howaboutwe.com', 'hwcdn.net', 'hypothes.is', 'ibsys.com', 'ibtimes.com', 'icbdr.com', 'mpsnare.iesnare.com', 'imagecorn.com', 'imageg.net', 'imagehost123.com', 'images-amazon.com', 'imageshack.us', 'imagetwist.com', 'imagevenue.com', 'www.img-bahn.de', 'imgchili.com', 'imgfarm.com', 'imgspice.com', 'imgur.com', 'imgix.net', 'imshopping.com', 'indeed.com', 'inergizedigital.com', 'inq.com', 'instagram.com', 'instantservice.com', 'instapaper.com', 'intellicast.com', 'intensedebate.com', 'intercom.io', 'members.internetdefenseleague.org', 'investingchannel.com', 'script.ioam.de', 'issuu.com', 'janrain.com', 'jquery.com', 'jquerytools.org', 'jsdelivr.net', 'jsonip.com', 'jtvnw.net', 'justin.tv', 'jwpcdn.com', 'jwpltx.com', 'content.jwplatform.com', 'jwpsrv.com', 'cdnapi.kaltura.com', 'cdnapisec.kaltura.com', 'cdnbakmi.kaltura.com', 'cdnsecakmi.kaltura.com', 'cfvod.kaltura.com', 'www.kaltura.com', 'kampyle.com', 'kataweb.it', 'kickapps.com', 'kickstarter.com', 'kickstatic.com', 'kingfeatures.com', 'kinja-static.com', 'klarna.com', 'klarnacdn.net', 'klm.com', 'kxcdn.com', 'ddragon.leagueoflegends.com', 'libsyn.com', 'licdn.com', 'licensebuttons.net', 'addon.lidl.de', 'media.lidl.com', 'linkwithin.com', 'list-manage.com', 'i.lithium.com', 'messenger.live.com', 'officeapps.live.com', 'onedrive.live.com', 'livechatinc.com', 'livefyre.com', 'livehelpnow.net', 'liveperson.net', 'livestream.com', 'llnwd.net', 'loggly.com', 'logos.com', 'lphbs.com', 'mail.ru', 'mailchimp.com', 'mapbox.com', 'mapquestapi.com', 'marketo.com', 'masslive.com', 'mathjax.org', 'maxmind.com', 'mcclatchyinteractive.com', 'meebocdn.net', 'mfstatic.cz', 'mlive.com', 'mncdn.com', 'mobify.com', 'verify.monzo.com', 'loop.services.mozilla.com', 'mozilla.net', 'mozilla.org', 'mozu.com', 'mqcdn.com', 'msecnd.net', 'msn.com', 'mtv.com', 'mtvnservices.com', 'mycapture.com', 'myportfolio.com', 'myshopify.com', 'mzstatic.com', 'nationbuilder.com', 'nationalgeographic.com', 'nbcuni.com', 'neighborsink.com', 'netdna-cdn.com', 'netdna-ssl.com', 'nos.netease.com', 'networksolutions.com', 'newsinc.com', 'newslook.com', 'newstogram.com', 'nextopiasoftware.com', 'nfl.com', 'nflcdn.com', 'assets.nflxext.com', 'cdn3.nflxext.com', 'nflxext.com', 'ngfiles.com', 'ngpvan.com', 'nj.com', 'nmcdn.us', 'nola.com', 'npmcdn.com', 'nrcdn.com', 'nsimg.net', 'media.nu.nl', 'nyt.com', 'nytimes.com', 'c.o0bg.com', 'ocdn.eu', 'ocsn.com', 'olark.com', 'omroep.nl', 'amazoncustomerservice.d2.sc.omtrdc.net', 'omny.fm', 'attservicesinc.tt.omtrdc.net', 'dsw.tt.omtrdc.net', 'onswipe.com', 'api.ooyala.com', 'c.ooyala.com', 'l.ooyala.com', 'opf.ooyala.com', 'player.ooyala.com', 'secure-cf-c.ooyala.com', 'tile.opencyclemap.org', 'tile2.opencyclemap.org', 'openlayers.org', 'openlibrary.org', 'openload.co', 'tile.openstreetmap.fr', 'openstreetmap.org', 'optimizely.com', 'oregonlive.com', 'outlook.com', 'paddle.com', 'pandacommerce.net', 'parastorage.com', 'passwordbox.com', 'paypal.com', 'paypalobjects.com', 'pdf.yt', 'pennlive.com', 'performgroup.com', 'pgcdn.com', 'phncdn.com', 'photobucket.com', 'phplist.com', 'piclens.com', 'pinimg.com', 'piratebay.org', 'pistachio-cdn.graze.com', 'pixietrixcomix.com', 'plex.tv', 'plot.ly', 'web.poecdn.com', 'poll.fm', 'polldaddy.com', 'postimg.org', 'powerreviews.com', 'pricegrabber.com', 'printfriendly.com', 'prismic.io', 'providesupport.com', 'psswrdbx.com', 'publiekeomroep.nl', 'img.purch.com', 'qualtrics.com', 'quotemedia.com', 'api.razorpay.com', 'checkout.razorpay.com', 'razorpay.com', 'rackcdn.com', 'rackspacecloud.com', 'radikal.ru', 'rambler.ru', 'images.rapgenius.com', 'readability.com', 'readthedocs.org', 'recaptcha.net', 'recurly.com', 'redcdn.pl', 'redefine.pl', 'cdngeneral.rentcafe.com', 'resellerratings.com', 'resultspage.com', 'rewardstyle.com', 'rpxnow.com', 'rssinclude.com', 'salesforce.com', 'salesforceliveagent.com', 'salsalabs.com', 'sbnation.com', 'schd.ws', 'sched.org', 'schibsted.com', 'schibsted.io', 'schibsted.no', 'schibsted.tech', 'scribd.com', 'scribdassets.com', 'www.searchanise.com', 'securesuite.co.uk', 'securitymetrics.com', 'seeclickfix.com', 'sgizmo.com', 'shopping.com', 'shop-pro.jp', 'shoprunner.com', 'sidearmsports.com', 'siteimprove.com', 'shield.sitelock.com', 'sketchfab.com', 'slidedeck.com', 'public.slidesharecdn.com', 's-msft.com', 's-msn.com', 'smugmug.com', 'snapengage.com', 'sndcdn.com', 'auth.api.sonyentertainmentnetwork.com', 'cdn-a.sonyentertainmentnetwork.com', 'api.soundcloud.com', 'feeds.soundcloud.com', 'springboardplatform.com', 'squarespace.com', 'squareup.com', 'squirt.io', 'ssl-images-amazon.com', 'cdn.sstatic.net', 'sstatic.net', 'stackexchange.com', 'stackoverflow.com', 'staticamzn.com', 'cdn.static-economist.com', 'staticflickr.com', 'steampowered.com', 'store.akamai.steamstatic.com', 'steamusercontent.com', 'stellaservice.com', 'stripe.com', 'stripecdn.com', 'surveygizmo.com', 'surveymonkey.com', 'swiftype.com', 'syracuse.com', 'public.tableausoftware.com', 'c.tadst.com', 'taleo.net', 'uploads.tapatalk-cdn.com', 'targetimg1.com', 'targetimg2.com', 'technorati.com', 'tegna-media.com', 'textalk.se', 'theplatform.com', 'tile.thunderforest.com', 'timeinc.net', 'tinypass.com', 'tinypic.com', 'tinyurl.com', 'tiqcdn.com', 'tmsbuyatoyota.com', 'torbit.com', 'townnews.com', 'cookieblock.trackersimulate.org', 'tradingview.com', 'trb.com', 'trbimg.com', 'trumba.com', 'privacy-policy.truste.com', 'trustkeeper.net', 'trustwave.com', 'ttvnw.net', 'tumblr.com', 'turner.com', 'turnto.com', 'twimg.com', 'api.twisto.cz', 'static.twisto.cz', 'api.twisto.pl', 'twitch.tv', 'twitter.com', 'platform.twitter.com', 'syndication.twitter.com', 'typeform.com', 'typekit.com', 'typekit.net', 'typepad.com', 'typography.com', 'assets.ubuntu.com', 'uicdn.com', 'ui-portal.de', 'ultimedia.com', 'ultraimg.com', 'unicornmedia.com', 'uplynk.com', 'usa.gov', 'viafoura.net', 'viddler.com', 'videobash.com', 'vidible.tv', 'viduki.com', 'vimeo.com', 'vimeocdn.com', 'virtualearth.net', 'visa.com', 'vmixcore.com', 'voxmedia.com', 'vox-cdn.com', 'w3.org', 'wallst.com', 'weather.com', 'weather.gov', 'weatherbug.com', 'weathernationtv.com', 'weatherzone.com.au', 'webflow.com', 'webs.com', 'websimages.com', 'webtype.com', 'weebly.com', 'where.com', 'widgetserver.com', 'wikidata.org', 'wikimedia.org', 'wikipedia.org', 'wildapricot.org', 'windy.com', 'wishabi.com', 'wistia.net', 'wistia.com', 'wix.com', 'wixapps.net', 'gatherer.wizards.com', 's.w.org', 'ts.w.org', 'ps.w.org', 'wnyc.org', 'wordpress.com', 'worldnow.com', 'wp.com', 'wpengine.com', 'wufoo.com', 'wunderground.com', 'wxc.com', 'wxug.com', 'y3.analytics.yahoo.com', 'pipes.yahoo.com', 'search.yahoo.com', 'yahooapis.com', 'api-maps.yandex.ru', 'img-fotki.yandex.ru', 'yardbarker.com', 'yastatic.net', 'yellowpages.com', 'seatme.yelp.com', 'yelpcdn.com', 'yimg.com', 'yottaa.net', 'youku.com', 'youtube-nocookie.com', 'youwatch.org', 'ytimg.com', 'zap2it.com', 'zdassets.com', 'zencdn.net', 'zendesk.com', 'ziplist.com', 'zlcdn.com', 'zoho.com', 'zoho.eu', 'zohopublic.com', 'zohostatic.com', 'zombaio.com', 'zope.net', 'zopim.com', 'zvents.com']);

var trackersMap = new Map();

module.exports = {

  categories: {
    ADS: 1,
    SITE_ANALYTICS: 2,
    CUSTOMER_INTERACTION: 4,
    SOCIAL_MEDIA: 8,
    ESSENTIAL: 16,
    UNKNOWN: 32
  },

  /**
   * 
   * @param {*} trackers_list 
   * @param {Number} category 
   */
  loadCatTrackers: function loadCatTrackers(trackers_list, category) {
    for (var i = 0; i < trackers_list.length; i++) {
      trackersMap.set(trackers_list[i], category);
    }
  },

  /**
   * 
   * @param {JSON} trackersJson 
   */
  loadTrackers: function loadTrackers(trackersJson) {

    if (undefined === trackersJson) {
      return;
    }
    trackersMap.clear();

    //advertising trackers
    if (trackersJson.hasOwnProperty('advertising')) {
      this.loadCatTrackers(trackersJson.advertising, this.categories.ADS);
    }

    //analytics trackers
    if (trackersJson.hasOwnProperty('analytics')) {
      this.loadCatTrackers(trackersJson.analytics, this.categories.SITE_ANALYTICS);
    }

    //customer_interaction trackers
    if (trackersJson.hasOwnProperty('customer_interaction')) {
      this.loadCatTrackers(trackersJson.customer_interaction, this.categories.CUSTOMER_INTERACTION);
    }

    //social_media trackers
    if (trackersJson.hasOwnProperty('social_media')) {
      this.loadCatTrackers(trackersJson.social_media, this.categories.SOCIAL_MEDIA);
    }

    //essential trackers
    if (trackersJson.hasOwnProperty('essential')) {
      this.loadCatTrackers(trackersJson.essential, this.categories.ESSENTIAL);
    }
  },

  /**
   * 
   * @param {String} url 
   * @param {Number} categories 
   */
  isTracker: function isTracker(url, categories) {

    if (null === url || 0 === trackersMap.size) {
      return this.categories.NO_FILTER;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = trackersMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var tracker = _ref2[0];
        var cat = _ref2[1];

        if (categories & cat) {
          if (new RegExp(tracker).test(url)) {
            return cat;
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return this.categories.NO_FILTER;
  },

  /**
   * 
   * @param {String} domain 
   */
  blockDomainCookie: function blockDomainCookie(domain) {
    if (undefined === domain || null === domain) {
      return false;
    }

    if (cookiesSet.has(domain)) {
      return true;
    }
    return false;
  },

  isThirdPartyDomainException: function isThirdPartyDomainException(toHost, fromHost) {
    var ret = false;
    thirdPartyDomainExceptions.forEach(function (exc) {
      if (exc.from === fromHost || exc.from.includes('\\') && new RegExp(exc.from).test(fromHost)) {
        exc.to.forEach(function (toExc) {
          if (toExc === toHost || toExc.includes('\\') && new RegExp(toExc).test(toHost)) {
            ret = true;
          }
        });
      }
    });
    return ret;
  }
};

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = "bdat:*";
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(24)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(25);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getLangMap = getLangMap;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * get lang Map
 * @param {*} langJson 
 */
function getLangMap(langJson) {

    var langMap = new Map();
    var keys = Object.keys(langJson);
    for (var index = 0; index < keys.length; index++) {
        var key = keys[index];
        if (null != key) {
            langMap.set(key, langJson[key]["message"]);
        }
    }
    return langMap;
}

var BdLang = function () {
    function BdLang() {
        _classCallCheck(this, BdLang);

        this.langMap = null;
    }

    _createClass(BdLang, [{
        key: "init",
        value: function init(_langMap) {
            this.langMap = _langMap;
        }
    }, {
        key: "getString",
        value: function getString(message) {
            if (null != this.langMap) {
                if (this.langMap.has(message)) {
                    return this.langMap.get(message);
                }
            }
            return chrome.i18n.getMessage(message);
        }
    }]);

    return BdLang;
}();

exports.default = new BdLang();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  enabled: true,
  specialOffers: true,
  categories: 127,
  globalBlocked: 0,
  whitelist: []
};

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Native Messaging Host
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

var _helpers = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BdNmh = function () {
    function BdNmh() {
        _classCallCheck(this, BdNmh);

        this.native_hostname = 'com.bitdefender.webtrackers.v1';
        this.port = null;
    }

    _createClass(BdNmh, [{
        key: 'start',
        value: function start() {
            try {

                if (null !== this.port) {
                    onDisconnected();
                }
                this.port = chrome.runtime.connectNative(this.native_hostname);
                if (null !== this.port) {
                    this.port.onMessage.addListener(this.onNativeMessage);
                    this.port.onDisconnect.addListener(this.onDisconnected);
                    var get_settings = {
                        'method': 'get_settings',
                        'browser_context': (0, _helpers.getBrowserContext)()
                    };
                    this.postNativeMessage(get_settings);
                }
            } catch (error) {
                _log2.default.error('exception: ' + error);
            }
        }
    }, {
        key: 'postNativeMessage',
        value: function postNativeMessage(message) {
            if (null !== this.port) {
                this.port.postMessage(message);
            }
        }
    }, {
        key: 'onNativeMessage',
        value: function onNativeMessage(message) {

            if (undefined === message || null === message) {
                return;
            }
            _log2.default.info('Message received from native host: ' + JSON.stringify(message));
            if (!message.hasOwnProperty('method')) {
                return;
            }

            var method = message['method'];
            if (null === method) {
                _log2.default.info('Method not found');
                return;
            }

            if ('set_settings' === method) {
                var settings = message['settings'];
                BdNmh.on_set_settings(settings);
            } else if ('set_module_status' === method) {
                if (message.hasOwnProperty('module_status')) {
                    var module_status = message['module_status'];
                    _log2.default.info('received module status: ' + module_status);
                    bdAt.onModuleStatusChanged(module_status);
                }
            } else if ('update' === method) {
                if (message.hasOwnProperty('status')) {
                    var b_is_update = message['status'];
                    bdAt.onUpdateState(b_is_update);
                }
            } else if ('disconnect' === method) {
                onDisconnected();
            }
        }
    }, {
        key: 'onDisconnected',
        value: function onDisconnected() {
            if (undefined !== this.port && null !== this.port) {
                this.port.disconnect();
                this.port = null;
            }
        }
    }], [{
        key: 'on_set_settings',
        value: function on_set_settings(settings) {

            if (undefined === settings || null === settings) {
                _log2.default.info('Get settings object failed');
                return;
            }

            if (!settings.hasOwnProperty('enable')) {
                _log2.default.info('Get enable failed');
                return;
            }
            var setting_enabled = settings['enable'];
            if (!settings.hasOwnProperty('categories')) {
                _log2.default.info('Get categories failed');
                return;
            }
            var setting_categories = settings['categories'];
            if (settings.hasOwnProperty('lang')) {
                var lang = settings['lang'];
                if (!lang.startsWith('pt')) {
                    lang = lang.substring(0, 2);
                } else {
                    lang = lang.replace("-", "_");
                }
                _log2.default.info('current lang: ' + lang);
                if (undefined !== lang && lang !== chrome.i18n.getUILanguage()) {
                    var langRelPath = '_locales/' + lang + '/messages.json';
                    bdAt.loadLang(langRelPath);
                }
            }
            _log2.default.info('received settings: ' + setting_enabled + ', categories: ' + setting_categories);
            bdAt.onSettingsChanged(setting_enabled, setting_categories);
        }
    }]);

    return BdNmh;
}();

exports.default = new BdNmh();

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tracking = __webpack_require__(17);

var _tracking2 = _interopRequireDefault(_tracking);

var _defaults = __webpack_require__(28);

var _defaults2 = _interopRequireDefault(_defaults);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

var _locale_lang = __webpack_require__(27);

var _helpers = __webpack_require__(5);

var _web_scan = __webpack_require__(51);

var _web_scan2 = _interopRequireDefault(_web_scan);

var _tab_events = __webpack_require__(52);

var _tab_events2 = _interopRequireDefault(_tab_events);

var _nmh = __webpack_require__(31);

var _nmh2 = _interopRequireDefault(_nmh);

var _local_comm = __webpack_require__(53);

var _local_comm2 = _interopRequireDefault(_local_comm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Anti-tracker.
 */
var BdAt = function () {
  function BdAt() {
    _classCallCheck(this, BdAt);

    this.is_update = false;
    this.tabs_map = new Map();
    this.lang_map = null;
    this.session_whitelist = [];
    this.state = _defaults2.default;
  }

  /**
   * start anti-tracker engine
   */


  _createClass(BdAt, [{
    key: 'start',
    value: function start() {
      var _this = this;

      chrome.storage.local.get(function (storedState) {
        //set extension state
        _this.setState(Object.assign({}, _defaults2.default, storedState));
      });

      var trackersUrl = chrome.runtime.getURL('tracking/trackers.json');
      fetch(trackersUrl).then(function (response) {
        return response.json();
      }) //assuming file contains json
      .then(function (json) {
        return _tracking2.default.loadTrackers(json);
      });

      // start listeners
      _web_scan2.default.startListeners();
      _nmh2.default.start();
      _local_comm2.default.start();
      _tab_events2.default.startListeners();

      _log2.default.info("Bitdefender Anti-tracker is ready!");
    }

    /**
     * 
     * @param {*} new_state 
     * update state
     */

  }, {
    key: 'setState',
    value: function setState(new_state) {

      _log2.default.info('setState, current_state: ' + this.state.enabled + ', new state: ' + new_state.enabled);
      if (!this.state || this.state.enabled !== new_state.enabled) {
        chrome.browserAction.setIcon({
          path: true === new_state.enabled ? 'assets/bdlogo.png' : 'assets/bdlogo_disabled.png'
        });
      }

      this.state = new_state;
      chrome.storage.local.set(this.state);
    }

    /**
     * Check if anti-tracler is enabled and
     * check against the whitelist
     *
     * @param {Number} tab_id 
     * @param {String} request_url 
     * @returns {Boolean} true if scan enabled
     */

  }, {
    key: 'isScanEnabled',
    value: function isScanEnabled(tab_id, request_url) {

      if (!this.state.enabled) {
        _log2.default.info('extension not enabled');
        return false;
      }

      var tab_stack = this.tabs_map.get(tab_id);
      if (undefined === tab_stack || null === tab_stack) {
        _log2.default.info('invalid tab stack');
        return false;
      }

      var tab_info = tab_stack[0];
      if (undefined === tab_info || null === tab_info) {
        _log2.default.info('invalid tab info');
        return false;
      }

      if (null === tab_info.url || '' === tab_info.url) {
        _log2.default.info('empty tab url');
        return false;
      }

      if ((0, _helpers.getBrowserContext)() === _helpers.BROWSER_CONTEXT.BROWSER_CONTEXT_CHROME) {
        if ('local-ntp' === tab_info.url) {
          _log2.default.info('chrome new tab url');
          return false;
        }
      }

      if (this.state.specialOffers) {
        if ((0, _helpers.isBdTrackingIds)(tab_info.url, request_url)) {
          _log2.default.warn('ignore bd tracking ids: ' + request_url);
          return false;
        }
      }

      if (undefined !== this.session_whitelist && this.session_whitelist.length > 0 && this.session_whitelist.includes(tab_info.url)) {
        _log2.default.warn('ignore url by session whitelist: ' + tab_info.url);
        return false;
      }
      var url_hostname = tab_info.url;
      if (url_hostname.startsWith("www.")) {
        url_hostname = url_hostname.substring(4);
      }
      if (url_hostname === 'newtab' || url_hostname === 'local-ntp') {
        return false;
      }
      if (undefined !== this.state.whitelist && this.state.whitelist.length > 0 && this.state.whitelist.includes(url_hostname)) {
        _log2.default.warn('ignore url by global whitelist: ' + url_hostname);
        return false;
      }

      return true;
    }

    /**
     * 
     * @param {*} langRelPath 
     */

  }, {
    key: 'loadLang',
    value: function loadLang(lang_json_path) {
      var _this2 = this;

      var lang_json_url = chrome.runtime.getURL(lang_json_path);
      fetch(lang_json_url).then(function (response) {
        return response.json();
      }) //assuming file contains json
      .then(function (json_lang) {
        _this2.lang_map = (0, _locale_lang.getLangMap)(json_lang);
        _log2.default.info(_this2.lang_map);
      });
    }

    /**
     * 
     * @param {Boolean} b_is_update 
     */

  }, {
    key: 'onUpdateState',
    value: function onUpdateState(b_is_update) {
      _log2.default.info('onUpdateState: ' + b_is_update);
      this.isUpdate = b_is_update;
    }

    /**
     * 
     * @param {Number} enabled current extension status
     * @param {Number} categories  current extension categories
     */

  }, {
    key: 'onSettingsChanged',
    value: function onSettingsChanged(enabled, categories) {

      _log2.default.info("onSettingsChanged: " + enabled + ', ' + categories);
      var new_state = Object.create(this.state);
      new_state.enabled = enabled;
      new_state.categories = categories;
      this.setState(new_state);
    }

    /**
     * 
     * @param {*} module_status  current extension status
     */

  }, {
    key: 'onModuleStatusChanged',
    value: function onModuleStatusChanged(module_status) {
      var new_state = Object.create(this.state);
      new_state.enabled = module_status;
      this.setState(new_state);
    }

    /**
     * 
     * @param {Number} tab_id 
     * @param {Object} tab_stack 
     */

  }, {
    key: 'updateTabStack',
    value: function updateTabStack(tab_id, tab_stack) {
      this.tabs_map.set(tab_id, tab_stack);
      this.state.globalBlocked++;
      chrome.storage.local.set(this.state);
    }

    /**
     * 
     * @param {Number} tab_id 
     * @returns {Object} curent tab info stack
     */

  }, {
    key: 'getTabStack',
    value: function getTabStack(tab_id) {
      return this.tabs_map.get(tab_id);
    }

    /**
     * 
     * @param {Object} details 
     */

  }, {
    key: 'isValidRequest',
    value: function isValidRequest(details) {

      if (undefined === details.url || null === details.url || details.tabId < 0) {
        return false;
      }

      if (undefined === details.type) {
        return false;
      }

      if ('main_frame' === details.type) {
        _log2.default.info('skip main frame');
        return false;
      }
      if ('stylesheet' === details.type || 'font' === details.type || 'media' === details.type) {
        _log2.default.info('skip resource type: ' + details.type);
        return false;
      }

      return true;
    }

    /**
     * 
     * @param {List} trackers_list 
     * @param {String} url_path
     */

  }, {
    key: 'isTrackerExist',
    value: function isTrackerExist(trackers_list, url_path) {

      var bExist = false;
      for (var item = 0; item < trackers_list.length; item++) {
        var current_tracker = trackers_list[item];
        if (url_path === current_tracker) {
          bExist = true;
          break;
        }
      }

      return bExist;
    }
  }]);

  return BdAt;
}();

;

//anti-tracker
var bdAt = window.bdAt = new BdAt();
bdAt.start();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * web_scan callbacks and listeners
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

var _helpers = __webpack_require__(5);

var _parseUrl = __webpack_require__(8);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _tracking = __webpack_require__(17);

var _tracking2 = _interopRequireDefault(_tracking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BdWebScan = function () {
  function BdWebScan() {
    _classCallCheck(this, BdWebScan);
  }

  _createClass(BdWebScan, [{
    key: 'startListeners',
    value: function startListeners() {

      var HTTP_URL = 'http://*/*';
      var HTTPS_URL = 'https://*/*';
      //url request listener
      chrome.webRequest.onBeforeRequest.addListener(this.onBeforeRequest, {
        urls: [HTTP_URL, HTTPS_URL]
      }, ['blocking']);

      //header request listener
      var extra_info_spec = ['requestHeaders', 'blocking'];
      if (chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) {
        extra_info_spec.push('extraHeaders');
      }
      chrome.webRequest.onBeforeSendHeaders.addListener(this.onBeforeSendHeaders, {
        urls: [HTTP_URL, HTTPS_URL]
      }, extra_info_spec);

      //header response listener
      extra_info_spec = ['responseHeaders', 'blocking'];
      if (chrome.webRequest.OnHeadersReceivedOptions.hasOwnProperty('EXTRA_HEADERS')) {
        extra_info_spec.push('extraHeaders');
      }
      chrome.webRequest.onHeadersReceived.addListener(this.onHeadersReceived, { urls: [HTTPS_URL, HTTPS_URL] }, extra_info_spec);
    }

    /**
     * Intercept script request and decide if we need to block it.
     *
     * @param {Object} details The event details
     * @returns {Object} Can cancel requests
     * function onBeforeRequest({ url }) { //{url} gets only url parameters
     */

  }, {
    key: 'onBeforeRequest',
    value: function onBeforeRequest(details) {

      var requestStatus = false;

      do {

        if (!bdAt.isValidRequest(details)) {
          break;
        }

        if (!bdAt.isScanEnabled(details.tabId, details.url)) {
          break;
        }

        var request_hostname = (0, _parseUrl2.default)(details.url).hostname;
        var tab_stack = bdAt.getTabStack(details.tabId);
        var tab_info = tab_stack[0];
        if (!(0, _helpers.isThirdPartyDomain)(request_hostname, tab_info.url)) {
          break;
        }

        var url_path = (0, _helpers.getPathFromUrl)(details.url);
        var trackerCategory = _tracking2.default.isTracker(url_path.toLowerCase(), bdAt.state.categories);
        requestStatus = trackerCategory !== _tracking2.default.categories.NO_FILTER ? true : false;
        if (false === requestStatus) {
          break;
        }

        _log2.default.warn('tabId: ' + details.tabId + ' tab url: ' + tab_info.url + ' url blocked: ' + details.url);
        if (undefined === tab_info.trackersMap[trackerCategory] || null === tab_info.trackersMap[trackerCategory]) {
          tab_info.trackersMap[trackerCategory] = []; //empty array
        }

        if (!bdAt.isTrackerExist(tab_info.trackersMap[trackerCategory], url_path)) {
          tab_info.trackersMap[trackerCategory].push(url_path);
          tab_info.trackersBlocked += 1;
          bdAt.updateTabStack(details.tabId, tab_stack);
          (0, _helpers.updateUiStack)(details.tabId, tab_stack, bdAt.session_whitelist);
        }
      } while (false);

      return {
        cancel: requestStatus
      };
    }

    /**
     * Filters outgoing cookies and referer
     * Injects DNT
     *
     * @param {Object} details Event details
     * @returns {Object} modified headers
     */

  }, {
    key: 'onBeforeSendHeaders',
    value: function onBeforeSendHeaders(details) {

      var new_headers = details.requestHeaders;

      do {

        if (undefined === details.url || null === details.url || details.tabId < 0) {
          break;
        }

        if (!bdAt.isScanEnabled(details.tabId, details.url)) {
          break;
        }

        new_headers.push({
          name: "dnt",
          value: "1"
        });

        var request_hostname = (0, _parseUrl2.default)(details.url).hostname;
        if (null === request_hostname || '' === request_hostname) {
          break;
        }

        var tab_stack = bdAt.getTabStack(details.tabId);
        var tab_info = tab_stack[0];
        if (!(0, _helpers.isThirdPartyDomain)(request_hostname, tab_info.url)) {
          break;
        }
        if (_tracking2.default.blockDomainCookie(request_hostname)) {
          _log2.default.warn('onBeforeSendHeaders, Third party cookie blocked: ' + details.url);
          //remove cookie headers and referer
          new_headers = details.requestHeaders.filter(function (header) {
            return header.name.toLowerCase() !== "cookie" && header.name.toLowerCase() !== "referer";
          });
        }
      } while (false);

      return {
        requestHeaders: new_headers
      };
    }

    /**
     * Received incoming headers 
     *
     * @param {Object} details The event details
     * @returns {Object} The new response headers
     */

  }, {
    key: 'onHeadersReceived',
    value: function onHeadersReceived(details) {

      var new_headers = details.responseHeaders;

      do {

        if (undefined === details.url || null === details.url || details.tabId < 0) {
          break;
        }

        if (!bdAt.isScanEnabled(details.tabId, details.url)) {
          break;
        }

        var request_hostname = (0, _parseUrl2.default)(details.url).hostname;
        if (null === request_hostname || '' === request_hostname) {
          break;
        }

        var tab_stack = bdAt.getTabStack(details.tabId);
        var tab_info = tab_stack[0];
        if (!(0, _helpers.isThirdPartyDomain)(request_hostname, tab_info.url)) {
          break;
        }

        if (_tracking2.default.blockDomainCookie(request_hostname)) {
          _log2.default.warn('onHeadersReceived, Third party cookie blocked: ' + details.url);
          //remove set-cookie headers valie
          new_headers = details.responseHeaders.filter(function (header) {
            return header.name.toLowerCase() !== "set-cookie";
          });
        }
      } while (false);

      return {
        responseHeaders: new_headers
      };
    }
  }]);

  return BdWebScan;
}();

exports.default = new BdWebScan();

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * web_scan callbacks and listeners
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

var _parseUrl = __webpack_require__(8);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _helpers = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BdTabEvents = function () {
    function BdTabEvents() {
        _classCallCheck(this, BdTabEvents);
    }

    _createClass(BdTabEvents, [{
        key: 'startListeners',
        value: function startListeners() {
            chrome.webNavigation.onCommitted.addListener(this.onCommitted);
            chrome.webNavigation.onBeforeNavigate.addListener(this.onBeforeNavigate);
            chrome.webNavigation.onCompleted.addListener(this.onCompletedNavigate);
            chrome.tabs.onCreated.addListener(this.onTabCreated);
            chrome.tabs.onActivated.addListener(this.onTabActivated);
            chrome.tabs.onUpdated.addListener(this.onTabUpdated);
            chrome.tabs.onRemoved.addListener(this.onTabRemoved);
            chrome.tabs.onReplaced.addListener(this.onTabReplaced);
        }

        /**** listen tab events ******/
        /**
         * 
         * Fired when a tab is created.
         * 
         * @param {Object} tab 
         */

    }, {
        key: 'onTabCreated',
        value: function onTabCreated(tab) {

            _log2.default.info('onTabCreated:' + JSON.stringify(tab));

            if (!bdAt.state.enabled) {
                return;
            }

            if (tab.url) {
                if (null !== bdAt.tabs_map) {
                    var tab_info = new _helpers.TabInfo();
                    var tab_url = (0, _helpers.getTabUrl)(tab.url);
                    if (undefined !== tab_url) {
                        tab_info.url = tab_url;
                    }
                    bdAt.tabs_map.set(tab.id, [tab_info]);
                }
            }
        }

        /**
         * Fires when the active tab in a window changes. 
         * Note that the tab's URL may not be set at the time this event fired, 
         * but you can listen to onUpdated events so as to be notified when a URL is set. 
         * * @param {Object} active_tab_info 
         */

    }, {
        key: 'onTabActivated',
        value: function onTabActivated(active_tab_info) {
            _log2.default.info('onTabActivated: ' + JSON.stringify(active_tab_info));

            if (false === bdAt.state.enabled) {
                return;
            }

            if (null === bdAt.tabs_map) {
                return;
            }

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {

                if (null === tabs || null === tabs[0]) {
                    return;
                }

                if (active_tab_info.tabId !== tabs[0].id) {
                    return;
                }

                if (null === tabs[0].url || '' === tabs[0].url) {
                    return;
                }

                if (tabs[0].url.startsWith("chrome-extension:")) {
                    _log2.default.info('onActivated: ignore chrome extension url: ' + tabs[0].url);
                    return;
                }

                var objectTabStack = [{
                    'transition': _helpers.TAB_INFO_TRANSITION.COMMITED,
                    'url': '',
                    'trackersBlocked': 0,
                    'pageLoad': 0,
                    'trackersMap': {}
                }];

                var trackersBlocked = 0;
                if (bdAt.tabs_map.has(active_tab_info.tabId)) {
                    _log2.default.info('onTabActivated found tabId');

                    var tab_stack = bdAt.tabs_map.get(active_tab_info.tabId);
                    trackersBlocked = (0, _helpers.getTabStackTrackersBlocked)(tab_stack);
                    objectTabStack = (0, _helpers.copyTabStack)(tab_stack);
                } else {
                    _log2.default.info('onActivated NOT found tabId');
                    var tab_info = new _helpers.TabInfo();
                    var tab_url = (0, _helpers.getTabUrl)(tabs[0].url);
                    if (undefined !== tab_url) {
                        tab_info.url = tab_url;
                    }
                    bdAt.tabs_map.set(active_tab_info.tabId, [tab_info]);
                }

                (0, _helpers.updateUiStack)(active_tab_info.tabId, objectTabStack, bdAt.session_whitelist);
                _log2.default.info('onTabActivated, blocked: ' + trackersBlocked);
            });
        }

        /**
         * 
         * @param {*} tabId 
         * @param {*} changeInfo 
         * @param {*} tab 
         * Fired when a tab is updated. 
         */

    }, {
        key: 'onTabUpdated',
        value: function onTabUpdated(tabId, change_info, tab) {
            _log2.default.info('onTabUpdated:' + JSON.stringify(tab));

            if (null === bdAt.tabs_map || !bdAt.tabs_map.has(tabId)) {
                _log2.default.info('onTabUpdated: tabId not found');
                bdAt.tabs_map.set(tabId, [new _helpers.TabInfo()]);
                (0, _helpers.setBadgeMessage)(tabId, 0);
                return;
            }

            var tab_stack = bdAt.tabs_map.get(tabId);
            if (undefined === tab_stack || null === tab_stack) {
                _log2.default.info('onTabUpdated: tabStack undefined or null');
                return;
            }
            var tab_info = tab_stack[0];
            if (undefined === tab_info || null === tab_info) {
                _log2.default.info('onTabUpdated: tab_info undefined or null');
                return;
            }

            if (!bdAt.state.enabled) {
                _log2.default.info("extension disabled");
                if (tab_info.pageLoad > 0) {
                    tab_info.trackersBlocked = 0;
                    tab_info.pageLoad = 0;
                    tab_info.trackersMap = {};
                    bdAt.tabs_map.set(tabId, [tab_info]);
                    chrome.browserAction.setIcon({
                        path: 'assets/bdlogo_disabled.png'
                    });
                }
                return;
            }

            if (undefined === change_info.status) {
                _log2.default.info('status tab undefined');
                return;
            }

            if (undefined === tab) {
                _log2.default.info('tab undefined');
                return;
            }
            _log2.default.info('status tab: ' + change_info.status);

            var trackersBlocked = 0;
            for (var i = 0; i < tab_stack.length; i++) {
                trackersBlocked += tab_stack[i].trackersBlocked;
            }

            if ('loading' === change_info.status) {
                (0, _helpers.setBadgeMessage)(tabId, trackersBlocked);
            }
        }

        /**
         * Event handler when a tab gets removed
         *
         * @param {Integer} tabId Id of the tab
         */

    }, {
        key: 'onTabRemoved',
        value: function onTabRemoved(tabId) {
            _log2.default.info('onTabRemoved: ' + tabId);
            if (bdAt.tabs_map.size && bdAt.tabs_map.has(tabId)) {
                bdAt.tabs_map.delete(tabId);
            }
        }

        /**
         * Update internal db on tabs when a tab gets replaced
         *
         * @param {Integer} addedTabId The new tab id that replaces
         * @param {Integer} removedTabId The tab id that gets removed
         */

    }, {
        key: 'onTabReplaced',
        value: function onTabReplaced(addedTabId, removedTabId) {
            _log2.default.info('onTabReplaced: addedTabId: ' + addedTabId + ' removedTabId: ' + removedTabId);
            if (bdAt.tabs_map.size && bdAt.tabs_map.has(removedTabId)) {
                bdAt.tabs_map.delete(removedTabId);
                bdAt.tabs_map.set(addedTabId, [new _helpers.TabInfo()]);
            }
        }
    }, {
        key: 'onBeforeNavigate',
        value: function onBeforeNavigate(details) {

            if (0 !== details.frameId) {
                return;
            }

            _log2.default.info("onBeforeNavigate, tabId: " + details.tabId + ', frameId: ' + details.frameId + ', url: [' + details.url + ']');

            if (null === bdAt.tabs_map || !bdAt.tabs_map.has(details.tabId)) {
                _log2.default.info('onBeforeNavigate: tabId not found');
                bdAt.tabs_map.set(details.tabId, [new _helpers.TabInfo()]);
            }

            var tab_stack = bdAt.tabs_map.get(details.tabId);
            if (undefined === tab_stack || null === tab_stack) {
                _log2.default.info('onBeforeNavigate: tab_stack undefined or null');
                return;
            }

            if (undefined === tab_stack[0] || null === tab_stack[0]) {
                _log2.default.info('onBeforeNavigate: tab_stack[0] undefined or null');
                return;
            }

            var tab_info = (0, _helpers.copyTabInfo)(tab_stack[0]);
            var tab_url = (0, _helpers.getTabUrl)(details.url);

            if (tab_info.url === tab_url) {
                _log2.default.info('same navigation target');
                return;
            }

            if (undefined !== tab_url) {
                tab_info.url = tab_url;
            }

            _log2.default.info('tab hostname: ' + tab_info.url);

            tab_info.transition = _helpers.TAB_INFO_TRANSITION.PROVISIONAL;
            tab_info.pageLoadStartTime = Date.now();
            tab_info.pageLoad = 0;
            tab_info.trackersBlocked = 0;
            tab_info.trackersMap = {};

            if (tab_stack[0].transition === _helpers.TAB_INFO_TRANSITION.PROVISIONAL) {
                if (tab_stack[0].trackersBlocked > 0) {
                    if (tab_stack[0].pageLoad == 0 && tab_stack[0].pageLoadStartTime > 0) {
                        var redirectLoadMillis = tab_info.pageLoadStartTime - tab_stack[0].pageLoadStartTime;
                        var redirectSeconds = (redirectLoadMillis / 1000).toFixed(2);
                        tab_stack[0].pageLoad = redirectSeconds;
                    }
                    tab_stack.splice(0, 0, tab_info); //insert as 1st position
                } else {
                    tab_stack[0] = tab_info;
                }
            } else {
                tab_stack.splice(0, 0, tab_info); //insert as 1st position
            }

            bdAt.tabs_map.set(details.tabId, tab_stack);

            (0, _helpers.updateUiStack)(details.tabId, tab_stack, bdAt.session_whitelist);
            _log2.default.info('onBeforeNavigate, pageLoad: ' + tab_info.pageLoad);
        }
    }, {
        key: 'onCommitted',


        /**
         * @param {Object} details
         * webNavigation.onCommitted
         */
        value: function onCommitted(details) {

            if (0 !== details.frameId) {
                return;
            }

            _log2.default.info("onCommitted, tabId: " + details.tabId + ', frameId: ' + details.frameId + ', url: [' + details.url + ']');

            if (null === bdAt.tabs_map || !bdAt.tabs_map.has(details.tabId)) {
                _log2.default.info('onCommitted: tabId not found');
                bdAt.tabs_map.set(details.tabId, [new _helpers.TabInfo()]);
            }

            var tab_stack = bdAt.tabs_map.get(details.tabId);
            if (undefined === tab_stack || null === tab_stack) {
                _log2.default.info('onCommitted: tab_stack undefined or null');
                return;
            }

            if (undefined === tab_stack[0] || null === tab_stack[0]) {
                _log2.default.info('onCommitted: tab_stack[0] undefined or null');
                return;
            }

            var tab_info = (0, _helpers.copyTabInfo)(tab_stack[0]);
            var tab_url = (0, _helpers.getTabUrl)(details.url);
            if (undefined !== tab_url) {
                tab_info.url = tab_url;
            }

            _log2.default.info('tab hostname: ' + tab_info.url);

            var is_redirect = BdTabEvents.isCommitRedirect(details, tab_info);

            tab_info.pageLoadStartTime = Date.now();
            tab_info.pageLoad = 0;
            tab_info.trackersBlocked = 0;
            tab_info.trackersMap = {};

            if (is_redirect) {
                //only keep stats when trackers have been blocked
                if (tab_stack[0].trackersBlocked > 0) {
                    if (tab_stack[0].pageLoad == 0 && tab_stack[0].pageLoadStartTime > 0) {
                        var redirectLoadMillis = tab_info.pageLoadStartTime - tab_stack[0].pageLoadStartTime;
                        var redirectSeconds = (redirectLoadMillis / 1000).toFixed(2);
                        tab_stack[0].pageLoad = redirectSeconds;
                    }
                    tab_stack.splice(0, 0, tab_info); //insert as 1st position
                } else {
                    tab_stack[0] = tab_info;
                }
            } else {
                tab_stack = [tab_info]; //reset whole stack
            }

            bdAt.tabs_map.set(details.tabId, tab_stack);

            (0, _helpers.updateUiStack)(details.tabId, tab_stack, bdAt.session_whitelist);
            _log2.default.info('onCommitted, pageLoad: ' + tab_info.pageLoad);
        }

        /**
         * 
         * @param {*} details 
         * webNavigation.onCompleted
         */

    }, {
        key: 'onCompletedNavigate',
        value: function onCompletedNavigate(details) {

            if (0 !== details.frameId) {
                return;
            }

            _log2.default.info("onCompletedNavigate, tabId: " + details.tabId + ', frameId: ' + details.frameId + ', url: [' + details.url + ']');

            if (null === bdAt.tabs_map || !bdAt.tabs_map.has(details.tabId)) {
                _log2.default.info('onCompletedNavigate: tabId not found');
                return;
            }

            var tab_stack = bdAt.tabs_map.get(details.tabId);
            if (undefined === tab_stack || null === tab_stack) {
                _log2.default.info('onCompletednavigate: tabStack undefined or null');
                return;
            }

            var tab_info = tab_stack[0];
            if (undefined === tab_info || null === tab_info) {
                _log2.default.info('onCompletednavigate: tabInfo undefined or null');
                return;
            }

            var millis = 0;
            if (0 !== tab_info.pageLoadStartTime) {
                millis = Date.now() - tab_info.pageLoadStartTime;
                tab_info.pageLoadStartTime = 0; //reset page loadStartTime
            }
            if (0 === tab_info.pageLoad) {
                var seconds = (millis / 1000).toFixed(2);
                tab_info.pageLoad = seconds;
                bdAt.tabs_map.set(details.tabId, tab_stack);
            }

            (0, _helpers.updateUiStack)(details.tabId, tab_stack, bdAt.session_whitelist);
            _log2.default.info('onCompletednavigate: pageLoad:' + tab_info.pageLoad);
        }
        /**** listen tab events ******/

    }], [{
        key: 'isUserInitiatedAction',
        value: function isUserInitiatedAction(details) {
            if (details.transitionType === "typed" || details.transitionType === "auto_bookmark" || details.transitionType === "generated" || details.transitionType === "auto_toplevel" || details.transitionType === "reload" || details.transitionType === "keyword" || details.transitionType === "keyword_generated" || details.transitionQualifiers.includes("from_address_bar") || details.transitionQualifiers.includes("forward_back")) {
                return true;
            }
            return false;
        }
    }, {
        key: 'isAutomaticRedirect',
        value: function isAutomaticRedirect(details) {
            if (details.transitionQualifiers.includes("server_redirect") || details.transitionQualifiers.includes("client_redirect")) {
                return true;
            }
            return false;
        }
    }, {
        key: 'isFirefoxHeuristicRedirect',
        value: function isFirefoxHeuristicRedirect(details, tab_info) {
            //firefox does not correctly set transitionQualifiers
            //https://bugzilla.mozilla.org/show_bug.cgi?id=1595621
            //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/TransitionQualifier
            //'server_redirect' is limited to top-level frames and 'client_redirect' is not supplied when redirections are created by JavaScript.
            if ((0, _helpers.getBrowserContext)() === _helpers.BROWSER_CONTEXT.BROWSER_CONTEXT_FIREFOX) {
                if (details.transitionType === "link" && details.transitionQualifiers.length === 0) {
                    if (tab_info.pageLoad === 0) {
                        var newPageLoadStartTime = Date.now();
                        if (newPageLoadStartTime - tab_info.pageLoadStartTime < 2500) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }, {
        key: 'isCommitRedirect',
        value: function isCommitRedirect(details, tab_info) {
            var is_redirect = false;

            try {
                do {
                    if (BdTabEvents.isUserInitiatedAction(details)) {
                        is_redirect = false; //user reset the location
                        break;
                    }
                    if (BdTabEvents.isAutomaticRedirect(details)) {
                        is_redirect = true; //automatic redirect
                        break;
                    }

                    if (BdTabEvents.isFirefoxHeuristicRedirect(details, tab_info)) {
                        _log2.default.warn("Firefox redirect heuristic!");
                        is_redirect = true;
                        break;
                    }
                } while (false);
            } catch (error) {
                _log2.default.error('exception: ' + error);
            }

            return is_redirect;
        }
    }]);

    return BdTabEvents;
}();

exports.default = new BdTabEvents();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _nmh = __webpack_require__(31);

var _nmh2 = _interopRequireDefault(_nmh);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

var _helpers = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalComm = function () {
  function LocalComm() {
    _classCallCheck(this, LocalComm);
  }

  _createClass(LocalComm, [{
    key: 'start',
    value: function start() {
      try {

        chrome.runtime.onMessage.addListener(this.onMessage);
      } catch (error) {
        _log2.default.error('exception: ' + error);
      }
    }
  }, {
    key: 'onMessage',


    /****listen internal message ******/
    /**
     * 
     * @param {*} request 
     * @param {*} sender 
     * @param {*} sendResponse 
     */
    value: function onMessage(request, sender, sendResponse) {
      _log2.default.info('onMessage: ' + request.type);
      switch (request.type) {
        case 'new_state':
          {
            LocalComm.onNewState(request);
            break;
          }
        case 'get_current_tab_stack':
          {
            var get_tab_stack = LocalComm.onGetCurrentTabStack(request);
            sendResponse(get_tab_stack);
            break;
          }
        case 'whitelist_changed':
          {
            LocalComm.onWhitelistChanged(request);
            break;
          }
        case 'sessionWhitelist_changed':
          {
            LocalComm.onSessionWhitelistChanged(request);
            break;
          }
        case 'special_offers':
          {
            LocalComm.onSpecialOffers(request);
            break;
          }
      }
    }
    /****listen internal message ******/

  }], [{
    key: 'onNewState',
    value: function onNewState(request) {
      bdAt.setState(request.state);
      var settings_json = {
        'method': 'set_settings',
        'browser_context': (0, _helpers.getBrowserContext)()
      };
      var settings = {
        'enable': request.state.enabled,
        'categories': request.state.categories
      };
      settings_json['settings'] = settings;
      _log2.default.info("send msg to nmh: " + settings_json);
      _nmh2.default.postNativeMessage(settings_json);
    }
  }, {
    key: 'onGetCurrentTabStack',
    value: function onGetCurrentTabStack(request) {
      var get_tab_stack = {
        'tabStack': [{
          'transition': _helpers.TAB_INFO_TRANSITION.COMMITED,
          'url': '',
          'trackersBlocked': 0,
          'pageLoad': 0,
          'trackersMap': {}
        }],
        'sessionWhitelist': bdAt.session_whitelist,
        'isUpdate': bdAt.is_update,
        'langMap': null !== bdAt.lang_map ? JSON.stringify([].concat(_toConsumableArray(bdAt.lang_map))) : undefined
      };

      if (bdAt.tabs_map.size && bdAt.tabs_map.has(request.tabId)) {
        var tab_stack = bdAt.tabs_map.get(request.tabId);
        get_tab_stack.tabStack = (0, _helpers.copyTabStack)(tab_stack);
      } else {
        var tab_url = (0, _helpers.getTabUrl)(request.url);
        if (undefined !== tab_url) {
          get_tab_stack.tabStack[0].url = tab_url;
        }
      }
      return get_tab_stack;
    }
  }, {
    key: 'onWhitelistChanged',
    value: function onWhitelistChanged(request) {
      bdAt.state.whitelist = request.whitelist;
    }
  }, {
    key: 'onSessionWhitelistChanged',
    value: function onSessionWhitelistChanged(request) {
      bdAt.session_whitelist = request.sessionWhitelist;
      if (request.disabled) {
        if (request.url.toLowerCase().includes('newtab')) {
          return;
        }
        var telemetry_json = (0, _helpers.getTelemetryJson)(_helpers.TELEMETRY_EVENT_TYPE.PAUSE, request.url);
        _log2.default.info("sending msg to nmh: " + telemetry_json);
        _nmh2.default.postNativeMessage(telemetry_json);
      }
    }
  }, {
    key: 'onSpecialOffers',
    value: function onSpecialOffers(request) {
      bdAt.state.specialOffers = request.specialOffers;
      var new_special_offers_state = true === bdAt.state.specialOffers ? '1' : '0';
      var telemetry_json = (0, _helpers.getTelemetryJson)(_helpers.TELEMETRY_EVENT_TYPE.SPECIAL_OFFERS, new_special_offers_state);
      _log2.default.info("sending msg to nmh: " + telemetry_json);
      _nmh2.default.postNativeMessage(telemetry_json);
    }
  }]);

  return LocalComm;
}();

exports.default = new LocalComm();

/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map