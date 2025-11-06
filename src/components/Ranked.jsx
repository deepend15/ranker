import "../styles/Ranked.css";
import starImg from "../../images/star.svg";

export default function Ranked({
  items,
  rankedItems,
  handleRerankClick,
  handleRankNewItemsClick,
  handleEditListClick,
}) {
  function ListItem({ delayTime, id, index }) {
    const listItemStyle = {
      fontSize: "2rem",
      lineHeight: 1.5,
      animation: `fade-in-one 1500ms ${delayTime}ms backwards`,
    };

    return (
      <li style={listItemStyle}>
        {index + 1}. &nbsp;{items[id].value}
      </li>
    );
  }

  return (
    <div className="ranked-main-div">
      <div className="ranked-results-div">
        <h2>
          <img src={starImg} alt="Star icon" />
          <span>Results:</span>
          <img src={starImg} alt="Star icon" />
        </h2>
        <ul>
          {rankedItems.map((id, index) => {
            const delayTime = index * 125;
            return (
              <ListItem key={id} delayTime={delayTime} id={id} index={index} />
            );
          })}
        </ul>
      </div>
      <div className="ranked-buttons-div">
        <button
          onClick={handleRankNewItemsClick}
          className="rank-new-items-btn"
        >
          Rank new items
        </button>
        <button onClick={handleRerankClick} className="rerank-btn">
          Re-rank this list
        </button>
        <button onClick={handleEditListClick} className="edit-list-btn">
          Edit this list
        </button>
      </div>
    </div>
  );
}
