import "../styles/App.css";
import { useState, useRef, useEffect } from "react";
import { initialItems } from "./ItemList";
import AddItems from "./AddItems";
import Ranking from "./Ranking";

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItemValue, setEditItemValue] = useState("");
  const [editItemInputValid, setEditItemInputValid] = useState(true);
  const editInputRef = useRef(null);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [rankedItems, setRankedItems] = useState([]);
  const [analyzingSmallArray, setAnalyzingSmallArray] = useState(false);
  const [analyzingArray, setAnalyzingArray] = useState([]);

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

  function haveRelationship(x, y, parentObject) {
    function beats(x, y, parentObject) {
      let response = false;
      if (x.beats.includes(y.id)) response = true;
      else {
        for (let i = 0; i < x.beats.length; i++) {
          const id = x.beats[i];
          if (
            parentObject[id].beats !== undefined &&
            beats(parentObject[id], y, parentObject)
          ) {
            response = true;
            break;
          }
        }
      }
      return response;
    }

    if (!(x.beats === undefined && y.beats === undefined)) {
      if (x.beats !== undefined && beats(x, y, parentObject)) return true;
      if (y.beats !== undefined && beats(y, x, parentObject)) return true;
    }

    return false;
  }

  function generateRandomItemPair(passedItems, passedRankedArray) {
    const passedItemObjects = Object.values(passedItems);

    const index1 = Math.floor(Math.random() * passedItemObjects.length);
    const index2 = Math.floor(Math.random() * passedItemObjects.length);

    if (index1 !== index2) {
      const item1 = passedItemObjects[index1];
      const item2 = passedItemObjects[index2];
      if (passedRankedArray.length === 0) {
        setChoice1(item1);
        setChoice2(item2);
      } else {
        if (
          (passedRankedArray.includes(item1.id) &&
            passedRankedArray.includes(item2.id)) ||
          haveRelationship(item1, item2, passedItems)
        ) {
          generateRandomItemPair(passedItems, passedRankedArray);
        } else {
          setChoice1(item1);
          setChoice2(item2);
        }
      }
    } else generateRandomItemPair(passedItems, passedRankedArray);
  }

  function handleRankItemsClick() {
    if (itemObjects.length < 2) setNumberOfItemsStatus("invalid");
    else {
      generateRandomItemPair(items, rankedItems);
      setAppStatus("ranking");
    }
  }

  function handleChoiceButtonClick(e) {
    // identify winner & loser
    const winnerId = e.target.dataset.customId;
    let winnerItem;
    winnerId === choice1.id ? (winnerItem = choice1) : (winnerItem = choice2);
    let loserItem;
    winnerItem === choice1 ? (loserItem = choice2) : (loserItem = choice1);

    // store winner / loser ranking data in their respective item objects
    const newItems = { ...items };
    if (
      Object.prototype.hasOwnProperty.call(newItems[winnerItem.id], "beats")
    ) {
      newItems[winnerItem.id].beats.push(loserItem.id);
    } else {
      newItems[winnerItem.id].beats = [loserItem.id];
    }
    if (Object.prototype.hasOwnProperty.call(newItems[loserItem.id], "loses")) {
      newItems[loserItem.id].loses.push(winnerItem.id);
    } else {
      newItems[loserItem.id].loses = [winnerItem.id];
    }
    setItems(newItems);

    if (!analyzingSmallArray) {
      if (rankedItems.length === 0) {
        const newRankedItemArray = [winnerItem.id, loserItem.id];
        setRankedItems(newRankedItemArray);
        if (newRankedItemArray.length === itemObjects.length)
          setAppStatus("ranked");
        else generateRandomItemPair(newItems, newRankedItemArray);
      } else {
        if (
          !rankedItems.includes(winnerItem.id) &&
          !rankedItems.includes(loserItem.id)
        ) {
          generateRandomItemPair(newItems, rankedItems);
        } else {
          const newRankedItemArray = rankedItems.slice();
          let presentItem;
          let missingItem;
          if (newRankedItemArray.includes(winnerItem.id)) {
            presentItem = winnerItem;
            missingItem = loserItem;
          } else {
            presentItem = loserItem;
            missingItem = winnerItem;
          }
          const presentItemIndex = newRankedItemArray.indexOf(presentItem.id);
          let correspondingSide;
          presentItem.id === winnerItem.id
            ? (correspondingSide = newRankedItemArray.slice(
                presentItemIndex + 1
              ))
            : (correspondingSide = newRankedItemArray.slice(
                0,
                presentItemIndex
              ));
          if (correspondingSide.length === 0) {
            presentItem.id === winnerItem.id
              ? newRankedItemArray.push(missingItem.id)
              : newRankedItemArray.unshift(missingItem.id);
            setRankedItems(newRankedItemArray);
          } else {
            let nextUp;
            if (correspondingSide.length === 1) nextUp = correspondingSide[0];
            else {
              let randomIndex = Math.floor(
                Math.random() * correspondingSide.length
              );
              nextUp = correspondingSide[randomIndex];
            }
            const nextUpItem = newItems[nextUp];
            setAnalyzingSmallArray(true);
            setAnalyzingArray(correspondingSide);
            setChoice1(missingItem);
            setChoice2(nextUpItem);
          }
          // unfinished. go back up to "if (correspondingSide.length === 0)" and check after the setRankedItems() call. at some point, need to implement checks if newRankedItemArray = itemObjects length, and also if added value has stored unranked data
        }
      }
    } else if (analyzingSmallArray) {
      // from earlier logic, choice1 = missingItem, choice2 = nextUpItem
      if (analyzingArray.length === 1) {
        const newRankedItemArray = rankedItems.slice();
        const nextUpIndex = newRankedItemArray.indexOf(choice2.id);
        winnerItem.id === choice1.id
          ? newRankedItemArray.splice(nextUpIndex, 0, choice1.id)
          : newRankedItemArray.splice(nextUpIndex + 1, 0, choice1.id);
        setAnalyzingSmallArray(false);
        setAnalyzingArray([]);
        setRankedItems(newRankedItemArray);
      } else {
        let newAnalyzingArray = analyzingArray.slice();
        let correspondingSide;
        const nextUpIndex = newAnalyzingArray.indexOf(choice2.id);
        winnerItem.id === choice1.id
          ? (correspondingSide = newAnalyzingArray.slice(0, nextUpIndex))
          : (correspondingSide = newAnalyzingArray.slice(nextUpIndex + 1));
        if (correspondingSide.length === 0) {
          const newRankedItemArray = rankedItems.slice();
          const nextUpIndexInRanked = newRankedItemArray.indexOf(choice2.id);
          winnerItem.id === choice1.id
            ? newRankedItemArray.splice(nextUpIndexInRanked, 0, choice1.id)
            : newRankedItemArray.splice(nextUpIndexInRanked + 1, 0, choice1.id);
          setAnalyzingSmallArray(false);
          setAnalyzingArray([]);
          setRankedItems(newRankedItemArray);
        } else {
          let nextUp;
          if (correspondingSide.length === 1) nextUp = correspondingSide[0];
          else {
            let randomIndex = Math.floor(
              Math.random() * correspondingSide.length
            );
            nextUp = correspondingSide[randomIndex];
          }
          const nextUpItem = newItems[nextUp];
          setAnalyzingArray(correspondingSide);
          setChoice2(nextUpItem);
        }
      }
    }
  }

  return (
    <>
      <h1>Ranker</h1>
      {appStatus === "add-items" && (
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
      )}
      {appStatus === "ranking" && (
        <Ranking
          choice1={choice1}
          choice2={choice2}
          handleChoiceButtonClick={handleChoiceButtonClick}
          items={items}
          rankedItems={rankedItems}
        />
      )}
    </>
  );
}

export default App;
