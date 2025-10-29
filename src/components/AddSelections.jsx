import "../styles/AddSelections.css";
import { useState } from "react";
import { initialSelections } from "./Selections";

export default function AddSelections() {
  const [selections, setSelections] = useState(initialSelections);

  return (
    <div className="add-selections-main-div">
      <p>Enter whatever you want to rank!</p>
      <div className="add-and-view-div">
        <div className="selection-div">
          <label htmlFor="new-selection">Enter your selection:</label>
          <input type="text" name="new-selection" id="new-selection" />

          <button>+ Add Selection</button>
        </div>
        <div className="display-div">
          <h2>Selection List:</h2>
        </div>
      </div>
    </div>
  );
}
