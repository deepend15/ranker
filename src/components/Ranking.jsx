import "../styles/Ranking.css";

export default function Ranking({
  choice1,
  choice2,
  handleChoiceButtonClick,
  items,
  rankedItems,
  classTracker,
}) {
  let classNameChoice1;
  let classNameChoice2;

  if (classTracker === 1) {
    classNameChoice1 = "choice1-class1";
    classNameChoice2 = "choice2-class1";
  } else {
    classNameChoice1 = "choice1-class2";
    classNameChoice2 = "choice2-class2";
  }

  return (
    <div className="ranking-main-div">
      <h2>Pick your favorite:</h2>
      <div className="ranking-items-div">
        <button
          data-custom-id={choice1.id}
          onClick={handleChoiceButtonClick}
          className={classNameChoice1}
        >
          <p>{choice1.value.toUpperCase()}</p>
        </button>
        <button
          data-custom-id={choice2.id}
          onClick={handleChoiceButtonClick}
          className={classNameChoice2}
        >
          <p>{choice2.value.toUpperCase()}</p>
        </button>
      </div>
    </div>
  );
}
