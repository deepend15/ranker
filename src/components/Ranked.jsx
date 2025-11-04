export default function Ranked({ items, rankedItems }) {
  return (
    <>
      <h2>Your results:</h2>
      <div>
        {rankedItems.map((id, index) => {
          return (
            <p key={id}>
              {index + 1}. {items[id].value}
            </p>
          );
        })}
      </div>
    </>
  );
}
