// Instantiate our data objects
var oneWindowCollection = {},
  windowEvents = {
    urlDict: {}
  },
  windowCollection = {};

// Validate that these tabs aren't already stored
  windowEvents.validateUrl = function (tab) {
    return !windowEvents.urlDict.hasOwnProperty(tab.url);
  }

// populate the urlDict and windowCollection
  windowEvents.populate = function(tab) {
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
var oneWindowTabs = function() {
  var results = {};
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      results[tabs[i].title] = tabs[i];
    }
  });
  return results;
};

// Get all windows
var allWindows = function () {
  var results = [];
  chrome.windows.getAll({populate: true}, function (windows) {
    for (var i = 0; i < windows.length; i++) {
      results[i] = windows[i];
    }
  });
  return results;
};

function collectTabs () {
  windowEvents.process(oneWindowTabs);
};


// returns an array of Elements by Class Name
function getElsByClass(className){
  return document.getElementsByClassName(className);
}

// returns the element by its id
function getElById(id){
 return document.getElementById(id);
}


// Get elemeents by selector
function getBySelector(selector, type){
  if (type == "class"){
    getElsByClass(selector)
  } else if (type == "id"){
    getElById(selector)
  } else {
    throw "error";
  }
}