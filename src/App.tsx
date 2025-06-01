//import { useState } from "react";
import "./App.css";
import Switch from "../src/components/toggle";
import HippoLogo from "../public/hippo.png";
//import PredictiveInput from "../src/components/PredictiveInput.tsx";

function App() {
  const handleToggle = async (isOn: boolean) => {
    let [tab] = await chrome.tabs.query({ active: true });
    if (isOn) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          alert("Its on!");
        },
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          alert("Its off dawg");
        },
      });
    }
  };
  // Note 2-23-25 11:06 AM: now when I toggle the switch it should allow AI assistance in line auto rec for any
  // text area.
  return (
    <>
      <div>
        <img src={HippoLogo} className="logo" alt="Hippo logo" />
      </div>
      <h1>Moo DAIng </h1>
      <div className="card">
        <Switch onToggle={handleToggle} defaultChecked={false} />
      </div>
      <p className="read-the-docs">Toggle for AI assistance</p>
    </>
  );
}

export default App;
/*
function App() {
  const [isPredictiveEnabled, setIsPredictiveEnabled] = useState(false);

  const handleToggle = (isOn: boolean) => {
    setIsPredictiveEnabled(isOn);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Switch onToggle={handleToggle} defaultChecked={false} />
        <span style={{ marginLeft: "10px" }}>
          Predictive Text: {isPredictiveEnabled ? "On" : "Off"}
        </span>
      </div>
      <PredictiveInput isPredictiveEnabled={isPredictiveEnabled} />
    </div>
  );
}

export default App;
*/