export const initialItems = {
//   Item1: {
//     value: "Song Title 1",
//     id: "Item1",
//   },
//   Item2: {
//     value: "Song Title 2",
//     id: "Item2",
//   },
};
// const objects = Object.values(initialOptions);

// function rank(list) {
//   const queue = [objects[0], objects[1]];
//   const ranked = [];

//   function rankPair([option1, option2]) {
//     let winner;
//     if (option1[option2.id] === "win") {
//       winner = option1;
//     } else if (option1[option2.id] === "lose") {
//       winner = option2;
//     }
//     if (ranked.length > 0) {
//       const matchingWinnerArray = ranked.filter(
//         (option) => option.id === winner.id
//       );
//       if (matchingWinnerArray.length > 0) {
//         const matchingWinner = matchingWinnerArray[0];
//         const matchingWinnerIndex = ranked.indexOf(matchingWinner);
//         ranked.splice(matchingWinnerIndex + 1, 0, option2);
//       }
//       // add else conditions (i.e. matching loser)
//     } else {
//       ranked.push(option1, option2);
//     }
//   }
// }
