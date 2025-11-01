export default function Ranking({ choice1, choice2 }) {
  return (
    <div className="ranking-main-div">
      <h2>Pick your favorite:</h2>
      <div className="ranking-items-div">
        <button>{choice1.value}</button>
        <button>{choice2.value}</button>
      </div>
    </div>
  );
}
