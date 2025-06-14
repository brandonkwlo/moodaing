console.log('Content script loaded!');

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'OPEN_CHAT') {
  
    console.log("Content script: Context:", message.context);
    console.log("Content script: Context Type:", message.contextType);
    
    sendResponse({ received: true });
  }
  return true;
}); 