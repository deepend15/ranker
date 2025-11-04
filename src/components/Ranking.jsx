export default function Ranking({
  choice1,
  choice2,
  handleChoiceButtonClick,
  items,
  rankedItems,
}) {
  return (
    <div className="ranking-main-div">
      <h2>Pick your favorite:</h2>
      <div className="ranking-items-div">
        <button
          // key={Math.random()}
          data-custom-id={choice1.id}
          onClick={handleChoiceButtonClick}
        >
          {choice1.value}
        </button>
        <button
          // key={Math.random()}
          data-custom-id={choice2.id}
          onClick={handleChoiceButtonClick}
        >
          {choice2.value}
        </button>
      </div>
    </div>
  );
}
