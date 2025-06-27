import Window from "./components/ai_window";
import { createRoot } from "react-dom/client";

console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "OPEN_CHAT") {
    let existingChat = document.getElementById("moodaing-chat");

    if (existingChat) {
      const minimizedBar = existingChat.querySelector(".minimized-bar");
      if (minimizedBar) {
        minimizedBar.click();
      }
      sendResponse({ received: true });
      return true;
    }

    const domNode = document.createElement("div");
    domNode.id = "moodaing-chat";
    const root = createRoot(domNode);
    root.render(
      <Window context={message.context} contextType={message.contextType} />
    );
    document.body.appendChild(domNode);

    sendResponse({ received: true });
  }
  return true;
});
