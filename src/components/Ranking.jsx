import "../styles/Ranking.css";

export default function Ranking({
  choice1,
  choice2,
  handleChoiceButtonClick,
  items,
  rankedItems,
  classThing,
}) {
  let className;
  classThing === 1 ? (className = "class-one") : (className = "class-two");

  return (
    <div className="ranking-main-div">
      <h2>Pick your favorite:</h2>
      <div className="ranking-items-div">
        <button
          // key={Math.random()}
          data-custom-id={choice1.id}
          onClick={handleChoiceButtonClick}
          className={className}
        >
          {choice1.value.toUpperCase()}
        </button>
        <button
          // key={Math.random()}
          data-custom-id={choice2.id}
          onClick={handleChoiceButtonClick}
          className={className}
        >
          {choice2.value.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
