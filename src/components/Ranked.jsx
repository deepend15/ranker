import "../styles/Ranked.css";

export default function Ranked({ items, rankedItems }) {
  function ListItem({ delayTime, id, index }) {
    const listItemStyle = {
      fontSize: "2rem",
      lineHeight: 1.5,
      animation: `li-pop-up 1500ms ${delayTime}ms backwards`,
    };

    return (
      <li style={listItemStyle}>
        {index + 1}. &nbsp;{items[id].value}
      </li>
    );
  }

  return (
    <div className="ranked-div">
      <h2>Results:</h2>
      <ul>
        {rankedItems.map((id, index) => {
          const delayTime = index * 400;
          return (
            <ListItem key={id} delayTime={delayTime} id={id} index={index} />
          );
        })}
      </ul>
    </div>
  );
}
