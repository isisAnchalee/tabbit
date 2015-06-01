var bg = chrome.extension.getBackgroundPage();
var div = document.getElementById("container");

function createList(tabObj){
  var ul = document.createElement('ul');
  ul.id = 'list';
  div.appendChild(ul);
  for (tabs in tabObj) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    li.appendChild(a);
    a.innerHTML = '<a>' + tabObj[tabs].title + '</a>';
    a.setAttribute('href', tabObj[tabs].url);
    a.setAttribute('target', '_blank');
    ul.appendChild(li);
  }
};

createList(bg.windowCollection);


// These functions need to be cleaned up to re-collect the window collection
// on restore
document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('restore').addEventListener('click', function () {
    windowCollection = bg.windowCollection;
    for (tab in windowCollection) {
      bg.createTab(windowCollection[tab].url);
    }
    bg.reload = true;
    bg.collectTabs();
  });

    document.getElementById('clean').addEventListener('click', function () {
    bg.collectTabs();
    windowCollection = bg.windowCollection;
    for (tab in windowCollection) {
      bg.closeTab(windowCollection[tab].id);
    }
  });
});