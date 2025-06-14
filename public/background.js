chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
      chrome.storage.local.get(['isChecked'], (result) => {
          if (result.isChecked) {
              createContextMenu();
          }
      });
  });
});

function createContextMenu() {
  chrome.contextMenus.create({
    id: "parentAssist",
    title: "AI Assist",
    contexts: ["all"],
  });

  // summarize page
  chrome.contextMenus.create({
    id: "childAssist1",
    parentId: "parentAssist",
    title: "Use page",
    contexts: ["page"],

  });

  // summarize selection
  chrome.contextMenus.create({
    id: "childAssist2",
    parentId: "parentAssist",
    title: "Use selection",
    contexts: ["selection"],
  });

  // quick search or for other purposes
  chrome.contextMenus.create({
    id: "childAssist3",
    parentId: "parentAssist",
    title: "Discuss",
    contexts: ["all"],
  });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
if (namespace === "local" && changes.isChecked) {
  const isChecked = changes.isChecked.newValue;
  if (isChecked) {
    createContextMenu();
  } else {
    chrome.contextMenus.removeAll();
  }
}
});

chrome.contextMenus.onClicked.addListener((info, tab ) => {
if (!tab?.id) return;
let context = '';
let contextType = '';

switch (info.menuItemId) {
  case 'childAssist1':
    context = tab.url || '';
    contextType = 'page';
    break;
  case 'childAssist2':
    context = info.selectionText || '';
    contextType = 'selection';
    break;
  case 'childAssist3':
    context = 'discussion';
    contextType = 'discussion';
    break;
  default:
    return;
}

  chrome.tabs.sendMessage(tab.id, {
    type: 'OPEN_CHAT',
    context: context,
    contextType: contextType
  });
});