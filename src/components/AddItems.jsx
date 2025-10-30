import "../styles/AddItems.css";

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
          <h3>Item List:</h3>
          <ul>
            {itemObjects.length > 0 &&
              itemObjects.map((itemObject) => {
                return (
                  <li
                    key={itemObject.id}
                    className="single-item-div"
                    data-custom-id={itemObject.id}
                  >
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
