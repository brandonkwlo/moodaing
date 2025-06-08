import "./App.css";
import Switch from "../src/components/toggle";
import HippoLogo from "../public/hippo.png";
//import PredictiveInput from "../src/components/PredictiveInput.tsx";

// TODO:
// - Add AI assistance website (or another context script) for the user
//    - add to context menu
//      - have different sized pics (16 by 16 for context menu)
//    - lead context menu to another popup near the bottom right corner
//        of browser screen where AI pops up

function App() {
  return (
    <>
      <div>
        <img src={HippoLogo} className="logo" alt="Hippo logo" />
      </div>
      <h1>Moo DAIng </h1>
      <div className="card">
        <Switch />
      </div>
      <p className="read-the-docs">Toggle for AI assistance</p>
    </>
  );
}

export default App;
