import { useState } from "react";
import "../styles/App.css";
import AddSelections from "./AddSelections";

function App() {
  const [appStatus, setAppStatus] = useState("add-selections");

  return (
    <>
      <h1>Ranker</h1>
      {appStatus === "add-selections" && (
        <>
          <AddSelections />
          <button className="rank-button">Rank my selections!</button>
        </>
      )}
    </>
  );
}

export default App;
