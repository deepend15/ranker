import "../styles/AddItems.css";
import { useRef, useEffect, useState } from "react";

export default function AddItems({
  items,
  newItemValue,
  inputRef,
  itemInputValid,
  handleChange,
  handleAddItemClick,
  handleRankItemsClick,
  numberOfItemsStatus,
}) {
  const itemObjects = Object.values(items);
  const dialogRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (showDialog) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [showDialog]);

  function handleSingleItemClick() {
    setShowDialog(true);
  }

  function handleCloseDialogClick() {
    setShowDialog(false);
  }

  return (
    <div className="add-items-main-div">
      <h2>Enter whatever items you wish to rank!</h2>
      <div className="left-and-right-side-div">
        <div className="left-side-div">
          <div className="new-item-div">
            <label htmlFor="new-item">New item:</label>
            <div className="new-item-input-div">
              <input
                type="text"
                id="new-item"
                name="new-item"
                value={newItemValue}
                ref={inputRef}
                onChange={handleChange}
              />
              {!itemInputValid && (
                <span>Oops! Type in your item here first!</span>
              )}
            </div>
            <button className="add-item-btn" onClick={handleAddItemClick}>
              + Add Item
            </button>
          </div>
          <div className="rank-button-div">
            <button className="rank-button" onClick={handleRankItemsClick}>
              Rank my items!
            </button>
            {numberOfItemsStatus === "invalid" && (
              <span className="not-enough-items-span">
                Add 2 or more items to begin ranking!
              </span>
            )}
          </div>
        </div>
        <div className="display-items-div">
          <h3>Item List (click to edit/delete):</h3>
          <div className="item-btn-div">
            {itemObjects.length > 0 &&
              itemObjects.map((itemObject) => {
                return (
                  <div key={itemObject.id} data-custom-id={itemObject.id}>
                    <button
                      className="single-item-btn"
                      onClick={handleSingleItemClick}
                    >
                      {itemObject.value}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <dialog id="edit-item-dialog" ref={dialogRef}>
        <p>test</p>
        <button onClick={handleCloseDialogClick}>Close Dialog</button>
      </dialog>
    </div>
  );
}
