var bg = chrome.extension.getBackgroundPage();
bg.collectTabs();
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

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('thisWindow').addEventListener('click', function () {
    windowCollection = bg.windowCollection;
  });


  document.getElementById('goTabbit').addEventListener('click', function () {
    windowCollection = bg.windowCollection;
    for (tab in windowCollection) {
      bg.closeTab(windowCollection[tab].id);
    }
    bg.createTab('');
  });
});
