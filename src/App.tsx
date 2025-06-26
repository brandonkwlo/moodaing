import "./App.css";
import Switch from "../src/components/toggle";
import HippoLogo from "../public/hippo.png";

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
