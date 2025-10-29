import { useState } from "react";
import "../styles/App.css";
import AddItems from "./AddItems";

function App() {
  const [appStatus, setAppStatus] = useState("add-items");

  return (
    <>
      <h1>Ranker</h1>
      {appStatus === "add-items" && (
        <>
          <AddItems />
          <button className="rank-button">Rank my items!</button>
        </>
      )}
    </>
  );
}

export default App;
