export function EditItemDialog({
  dialogRef,
  handleCloseDialogClick,
  selectedItem,
  editItemValue,
  handleEditItemChange,
}) {
  return (
    <dialog id="edit-item-dialog" ref={dialogRef}>
      <p>
        <label htmlFor="edit-item-name">Item name:</label>
        <input
          type="text"
          id="edit-item-name"
          name="edit-item-name"
          value={editItemValue}
          onChange={handleEditItemChange}
        />
      </p>
      <div className="edit-dialog-btns">
        <button><span>delete item</span></button>
        <button>OK</button>
      </div>
      <button className="close-dialog-btn" onClick={handleCloseDialogClick}>
        X
      </button>
    </dialog>
  );
}
