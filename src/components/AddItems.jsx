import "../styles/AddItems.css";

export default function AddItems({
  items,
  newItemValue,
  inputRef,
  itemInputValid,
  handleChange,
  handleClick,
}) {
  const itemObjects = Object.values(items);

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
              ref={inputRef}
              onChange={handleChange}
            />
            {!itemInputValid && (
              <span>Oops! Type in your item here first!</span>
            )}
          </div>
          <button className="add-item-btn" onClick={handleClick}>
            + Add Item
          </button>
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
