import "../styles/App.css";
import { useState, useRef, useEffect } from "react";
import { initialItems } from "./ItemList";
import AddItems from "./AddItems";

function App() {
  const [appStatus, setAppStatus] = useState("add-items");
  const [newItemValue, setNewItemValue] = useState("");
  const [items, setItems] = useState(initialItems);
  const itemObjects = Object.values(items);
  const inputRef = useRef(null);
  const [itemInputValid, setItemInputValid] = useState(true);
  const [numberOfItemsStatus, setNumberOfItemsStatus] = useState("initial");
  const dialogRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [editItemValue, setEditItemValue] = useState("");
  const [editItemInputValid, setEditItemInputValid] = useState(true);
  const editInputRef = useRef(null);

  function handleNewItemChange(e) {
    if (!itemInputValid) setItemInputValid(true);
    setNewItemValue(e.target.value);
  }

  function handleAddItemClick() {
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
      if (numberOfItemsStatus === "invalid") {
        if (Number(newNumber) >= 2) setNumberOfItemsStatus("valid");
      }
    } else {
      setItemInputValid(false);
      if (!itemInputValid && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }

  function windowClickHandler(e) {
    if (!(e.target.id === "new-item" || e.target.className === "add-item-btn"))
      setItemInputValid(true);
  }

  useEffect(() => {
    if (!itemInputValid && inputRef.current) {
      inputRef.current.focus();
      window.addEventListener("click", windowClickHandler);
    }
    return () => {
      window.removeEventListener("click", windowClickHandler);
    };
  }, [itemInputValid]);

  useEffect(() => {
    if (showDialog) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [showDialog]);

  function handleSingleItemClick(e) {
    const targetedId = e.target.dataset.customId;
    const targetedItemArray = itemObjects.filter(
      (itemObject) => itemObject.id === targetedId
    );
    const targetedItem = targetedItemArray[0];
    setSelectedItem(targetedItem);
    setEditItemValue(targetedItem.value);
    setShowDialog(true);
  }

  function handleEditItemChange(e) {
    if (!editItemInputValid) setEditItemInputValid(true);
    setEditItemValue(e.target.value);
  }

  function handleCloseDialogClick() {
    if (!editItemInputValid) setEditItemInputValid(true);
    setShowDialog(false);
  }

  function handleDialogOKClick() {
    if (editItemValue === "") {
      setEditItemInputValid(false);
      editInputRef.current.focus();
    } else {
      const newItems = {
        ...items,
        [selectedItem.id]: {
          ...selectedItem,
          value: editItemValue,
        },
      };
      setItems(newItems);
      setShowDialog(false);
    }
  }

  function handleDeleteItemClick() {
    const newItems = { ...items };
    delete newItems[selectedItem.id];
    const itemIdNumber = Number(selectedItem.id.slice(4));
    if (!(itemObjects.length === itemIdNumber)) {
      let rightOfItem = itemObjects.slice(itemIdNumber);
      rightOfItem.forEach((itemObject) => {
        const itemNumber = Number(itemObject.id.slice(4));
        const newItemId = "item" + (itemNumber - 1).toString();
        newItems[newItemId] = {
          ...itemObject,
          id: newItemId,
        };
        delete newItems[itemObject.id];
      });
    }
    setItems(newItems);
    if (!editItemInputValid) setEditItemInputValid(true);
    setShowDialog(false);
  }

  function handleRankItemsClick() {
    if (itemObjects.length < 2) setNumberOfItemsStatus("invalid");
  }

  return (
    <>
      <h1>Ranker</h1>
      {appStatus === "add-items" && (
        <>
          <AddItems
            itemObjects={itemObjects}
            newItemValue={newItemValue}
            inputRef={inputRef}
            itemInputValid={itemInputValid}
            handleNewItemChange={handleNewItemChange}
            handleAddItemClick={handleAddItemClick}
            handleRankItemsClick={handleRankItemsClick}
            numberOfItemsStatus={numberOfItemsStatus}
            handleSingleItemClick={handleSingleItemClick}
            dialogRef={dialogRef}
            handleCloseDialogClick={handleCloseDialogClick}
            selectedItem={selectedItem}
            editInputRef={editInputRef}
            editItemValue={editItemValue}
            editItemInputValid={editItemInputValid}
            handleEditItemChange={handleEditItemChange}
            handleDialogOKClick={handleDialogOKClick}
            handleDeleteItemClick={handleDeleteItemClick}
          />
        </>
      )}
    </>
  );
}

export default App;
