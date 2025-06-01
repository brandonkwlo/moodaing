import { useState } from "react";
import "./App.css";
import Switch from "../src/components/toggle";
import HippoLogo from "../public/hippo.png";
//import PredictiveInput from "../src/components/PredictiveInput.tsx";

// TODO:
// - Add toggle state persistence
//    - after extension pop is closed
//    - during browser session 
//      - think about when user closes web page
// - Add AI assistance website (or another context script) for the user


function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = (isOn: boolean) => {
    setIsEnabled(isOn);
    console.log(`The toggle is ${isOn}`);
  };

  return (
    <>
      <div>
        <img src={HippoLogo} className="logo" alt="Hippo logo" />
      </div>
      <h1>Moo DAIng </h1>
      <div className="card">
        <Switch onToggle={handleToggle} isChecked={isEnabled}/>
      </div>
      <p className="read-the-docs">Toggle for AI assistance</p>
    </>
  );
}

export default App;