import "../styles/AddItems.css";
import { useState } from "react";
import { initialItems } from "./ItemList";

export default function AddItems() {
  const [newItemValue, setNewItemValue] = useState("");
  const [items, setItems] = useState(initialItems);
  const itemObjects = Object.values(items);
  const [itemInputValid, setItemInputValid] = useState("valid");

  function handleChange(e) {
    if (itemInputValid === "invalid") setItemInputValid("valid");
    setNewItemValue(e.target.value);
  }

  function handleClick() {
    if (newItemValue !== "") {
      const newNumber = (itemObjects.length + 1).toString();
      const newPropertyName = "item" + newNumber;
      const newItems = {
        ...items,
        [newPropertyName]: {
          value: newItemValue,
          id: newPropertyName,
        },
      };
      setItems(newItems);
      setNewItemValue("");
    } else {
      setItemInputValid("invalid");
    }
  }

  return (
    <div className="add-items-main-div">
      <h2>Enter whatever items you wish to rank!</h2>
      <div className="add-and-view-div">
        <div className="new-item-div">
          <label htmlFor="new-item">New item:</label>
          <div className="new-item-input-div">
            <input
              type="text"
              id="new-item"
              name="new-item"
              value={newItemValue}
              onChange={handleChange}
            />
            {itemInputValid === "invalid" && (
              <span>Oops! Type in your item here first!</span>
            )}
          </div>
          <button onClick={handleClick}>+ Add Item</button>
        </div>
        <div className="display-items-div">
          <h3>Item List:</h3>
          <ul>
            {itemObjects.length > 0 &&
              itemObjects.map((itemObject) => {
                return (
                  <li key={itemObject.id} className="single-item-div">
                    {itemObject.value}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
