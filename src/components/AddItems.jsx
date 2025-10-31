import "../styles/AddItems.css";
import { EditItemDialog } from "./EditItemDialog";

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
  selectedItem,
  editItemValue,
  handleEditItemChange,
}) {
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
      <EditItemDialog
        dialogRef={dialogRef}
        handleCloseDialogClick={handleCloseDialogClick}
        selectedItem={selectedItem}
        editItemValue={editItemValue}
        handleEditItemChange={handleEditItemChange}
      />
    </div>
  );
}
