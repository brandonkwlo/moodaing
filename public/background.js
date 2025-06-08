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
        id: "aiAssist",
        title: "AI Assist",
        contexts: ["page", "selection"] 
    });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.isChecked) {
        const isChecked = changes.isChecked.newValue;
        
        if (isChecked) {
            createContextMenu();
        } else {
            chrome.contextMenus.removeAll();
        }
    }
});