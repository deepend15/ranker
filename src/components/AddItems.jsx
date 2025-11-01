import "../styles/AddItems.css";

export default function AddItems({
  itemObjects,
  newItemValue,
  inputRef,
  itemInputValid,
  handleNewItemChange,
  handleAddItemClick,
  handleRankItemsClick,
  numberOfItemsStatus,
  handleSingleItemClick,
  dialogRef,
  handleCloseDialogClick,
  editInputRef,
  editItemValue,
  editItemInputValid,
  handleEditItemChange,
  handleDialogOKClick,
  handleDeleteItemClick,
}) {
  let editItemInputClassName = "";
  if (!editItemInputValid) editItemInputClassName = "invalid-input";

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
                onChange={handleNewItemChange}
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
                  <div key={itemObject.id}>
                    <button
                      className="single-item-btn"
                      data-custom-id={itemObject.id}
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
        <p>
          <label htmlFor="edit-item-name">Item name:</label>
          <input
            type="text"
            id="edit-item-name"
            name="edit-item-name"
            ref={editInputRef}
            value={editItemValue}
            className={editItemInputClassName}
            onChange={handleEditItemChange}
          />
          {!editItemInputValid && <span>item name required</span>}
        </p>
        <div className="edit-dialog-btns">
          <button onClick={handleDeleteItemClick}>
            <span>delete item</span>
          </button>
          <button onClick={handleDialogOKClick}>OK</button>
        </div>
        <button className="close-dialog-btn" onClick={handleCloseDialogClick}>
          X
        </button>
      </dialog>
    </div>
  );
}
