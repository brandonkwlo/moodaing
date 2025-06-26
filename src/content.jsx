import Window from "./components/ai_window";
import { createRoot } from "react-dom/client";

console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "OPEN_CHAT") {
    console.log("Content script: Context:", message.context);
    console.log("Content script: Context Type:", message.contextType);

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
