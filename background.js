// For communication between various tabbit modules
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('hey');
});

// Instantiate our data objects
var oneWindowCollection = {},
  windowEvents = {
    urlDict: {}
  },
  windowCollection = {},
  reload = false;

// Validate that these tabs aren't already stored

  windowEvents.cleanDict = function () {
    if (reload == true) {
      windowEvents.urlDict = {};
    }
    reload = false;
  };

  windowEvents.validateUrl = function (tab) {
    windowEvents.cleanDict();
    return !windowEvents.urlDict.hasOwnProperty(tab.url);
  }

// populate the urlDict and windowCollection
  windowEvents.populate = function (tab) {
    windowEvents.urlDict[tab.url] = true;
    windowCollection[tab.title] = tab;
  };

// Process through the window object
  windowEvents.process = function (windowObj) {
    for (tab in windowObj) {
      var tabObj = windowObj[tab];
      if (windowEvents.validateUrl(tabObj)) {
        windowEvents.populate(tabObj);
      }
    }
  };


// Get all Tabs from a window
var oneWindowTabs = function(callback) {
  var windowsTabs = {};
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      windowsTabs[tabs[i].title] = tabs[i];
    }
    callback(windowsTabs);
  });
};

// Get all windows
var allWindows = function () {
  var windowsTabs = [];
  chrome.windows.getAll({populate: true}, function (windows) {
    for (var i = 0; i < windows.length; i++) {
      windowsTabs[i] = windows[i];
    }
  });
  return windowsTabs;
};

// function for popup.js
function collectTabs () {
  oneWindowTabs(windowEvents.process);
};

// open a tab in the current window, defaults to tabbit home
function createTab (url, active) {
  if (!url) {
    url = chrome.extension.getURL("payload.html");
    active = true;
  }
  if (!active) {
     active = false;
  }
  chrome.tabs.create({'url': url, 'active': active});
};

function closeTab (tab) {
    chrome.tabs.remove(tab);
};

