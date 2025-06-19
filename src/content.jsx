import Card from "./components/Card";
import { createRoot } from "react-dom/client";
// import React from "react";

console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "OPEN_CHAT") {
    console.log("Content script: Context:", message.context);
    console.log("Content script: Context Type:", message.contextType);

    const domNode = document.createElement("div");
    const root = createRoot(domNode);
    root.render(<Card />);
    document.body.appendChild(domNode);

    sendResponse({ received: true });
  }
  return true;
});
