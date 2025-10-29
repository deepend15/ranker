// OVERALL PSEUDOCODE:
// Given an array of initial values
// Initiate an empty 'ranked' array
// Begin large loop:
//   -Generate two random values from the initial values array
//   -If the two values are already in the ranked array, go back to beginning of large loop
//   -If the two values already have a relationship to each other, go back to beginning of large loop
//    **Relationship between X and Y means: X beats Y (or X beats something that beats Y), or Y beats X (or Y beats something that beats X)
//    **Relationship can be chained, i.e. 'X beats Y; Y beats Z; Z beats A' means that X has a relationship with all of Y, Z, and A
//   -Rank the two values, and store the rankings for each one
//   -Check if the 'ranked' array is empty. If so:
//   --Put the random value with the higher ranking in the first (ranked[0]) position in the ranked array, and the random value with the lower 
//   ranking in the second (ranked[1]) position in the ranked array
//     --Check if the ranked array length is equivalent to the initial value array length. If so, end large loop and return the ranked array. If
//     not, go back to beginning of large loop
//   -If ranked array is not empty, check if either one of the two random values is in the ranked array
//     --If neither random value is in the ranked array, go back to beginning of large loop
//     --If one of the values is in the ranked array:
//       ---"Present value" = the value in the ranked array
//       ---"Missing value" = the value not in the ranked array
//       ---If the present value ranks higher than the missing value, look to the right side of the present value in the ranked array
//       ---If the present value ranks lower than the missing value, look to the left side of the present value in the ranked array
//       ---If the corresponding right/left side is empty, add the missing value directly to the right/left position of the present value in the
//       ranked array. Then skip down to "After missing value is added to ranked."
//       ---If the corresponding right/left side is not empty, start a new (smaller) loop
//         ----Store the missing value. This is the value we are currently trying to rank
//         ----Create an empty "next up" variable. We will later assign the next value we are going to rank against the missing value
//         ----Create an array containing the values from the right/left side above. This array will be called "analyzing-array"
//         ----If analyzing-array length is 1, set the "next-up" variable equal to the value in "analyzing-array"
//         ----If analyzing-array length is greater than 1, generate a random value from analyzing-array, and set it as "next up"
//         ----Rank the missing value and "next up"
//         ----If analyzing-array length is 1, we can put the missing value in the ranked array right away. If the missing value ranks higher than
//         "next up", put the missing value directly to the left of "next up"'s position in the ranked array. If the missing value ranks lower than
//         "next up", put the missing value directly to the right of "next up"'s position in the ranked array. Then skip down to "After missing
//         value is added to ranked."
//         ----If analyzing-array length is greater than one, we must complete further checks before placing the missing value in ranked
//           -----If "next up" ranks higher than missing value, look to right side of "next up" in analyzing-array
//           -----If "next up" ranks lower than missing value, look to left side of "next up" in analyzing-array
//           -----If the corresponding right/left side is empty, add the missing value directly to the right/left position of "next up" in the
//           ranked array. Then skip down to "After missing value is added to ranked."
//           -----If the corresponding right/left side is not empty, we must start another smaller loop. Go back up to where the smaller loop was
//           started a few steps ago. Repeat the same process, this time setting the "corresponding side" equivalent to the new side that we just
//           looked at with "next up" as a reference point. This may create several more loops, until the missing value is eventually added to the
//           ranked array.
//       --After missing value is added to ranked:
//         ---Check if the value that was just added is storing ranking information on any other values that are not in the ranked array.
//         ---If there is stored information about values not yet in the ranked array, we want to place those values in the ranked array next.
//         I.e., if X was just added to the ranked array, and X has stored information that it ranks higher than Y, and Y is not yet in the ranked
//         array, we then want to proceed with placing Y in the ranked array.
//           ----To place stored, unranked values in the ranked array, get an array of the unranked values (stored-unranked array)
//           ----Get the first value in the array. This is set as the value we are now trying to rank.
//           ----First, double check that it's not in the ranked array. This is necessary in case it was added in a later chain of unranked values.
//           If it's now in the ranked array, we can skip it and move on to the next value in the stored-unranked array
//           ----Get the relationship between the unranked value and the value that was just added. If the just-added value ranks higher than the
//           unranked value, look to the right side of the just-ranked value in the ranked array. If the just-added value ranks lower than the
//           unranked value, look to the left of the just-ranked value in the the ranked array.
//           ----If the corresponding right/left side is empty, add the unranked value directly to the right/left position of the just-added value
//           in the ranked array. Then go back to beginning of "After missing value is added to ranked" and start that with the newly added value
//           -----If the corresponding right/left side is not empty, we must start another smaller loop. Go back up to the "If the corresponding
//           right/left side is not empty" section above, and start again from there.
//           ----Once the first value in the stored-unranked array (and potentially all of its subsequent stored, unranked values) is placed in the
//           ranked array, go to the next value (if any) in the stored-unranked array. Go back up to "First, double check that it's not in the
//           ranked array" and repeat the process
//           -----Repeat as many times as needed until the stored-unranked array is empty / all of the values in it have been placed in ranked
//         ---Once all of the just-added value's stored/unranked values have also been added to the ranked array (or if the just-added value
//         doesn't have any stored/unranked values), check the length of the ranked array
//         ---If the length of the ranked array is not the same as the length of the initial array, go all the way back to beginning of large loop
//         and generate two new random values from the initial array to rank
//         ---If the length of the ranked array is the same as the length of the initial array, the large loop is complete and we can return the
//         ranked array

// Example scenario (all random numbers / comparisons were truly generated at random via JS functions):
// initial = [a, b, c, d, e, f], ranked = []
// random = [c, d]
// both in ranked? => no
// relationship? => no
// rank(c, d) => c > d ==> c = { beats: d }, d = { loses: c }
// is ranked empty? => yes => ranked = [c, d]
// ranked.length !== initial.length => next random pair
// random = [f, d]
// both in ranked? => no
// relationship? => no
// rank (f, d) => f > d ==> d = { loses: c, f }, 5: f = { beats: d }
// ranked empty? => no
// f or d in ranked? => yes => d
// since f beats d, look to left of d. not empty, so start new loop with anal-array equal to [c]
// NEW LOOP - trying to rank f
// anal-array = [c]. length = 1, so next-up = c
// rank(f, c) => f > c ==> c = { beats: d, loses: f }, f = { beats: c, d }
// since anal-array.length = 1, we can put f directly to left of c in ranked => ranked = [f, c, d]
// does f have any unranked wins or losses? => no
// ranked.length !== initial.length => next random pair
// random = [e, c]
// both in ranked? => no
// relationship? => no
// rank(e, c) => e < c ==> c = { beats: d, e loses: f }, e = { loses: c }
// ranked empty? => no
// e or c in ranked? => yes => c
// since c beats e, look to right of c in ranked. not empty, so new loop with anal-array equal to [d]
// NEW LOOP - trying to rank e
// anal-array = [d]. length = 1, 'nxt up' = d
// rank(e, d) => e > d ==> d = { loses: c, e, f }, e = { beats: d, loses: c }
// since anal.array.length = 1, we can put e directly to the left of d in ranked ==> ranked = [f, c, e, d]
// does e have any unranked wins or losses? => no
// ranked.length !== initial.length => next random pair
// random = [c, f]
// both in ranked? => yes => next random pair
// random = [b, d]
// both in ranked => no
// relationship => no
// rank (b, d) => b > d ==> b = { beats: d }, d = { loses: b, c, e, f }
// ranked empty? => no
// b or d in ranked? => yes => d
// since b beats d, look to left of d in ranked. not empty, so new loop with anal-array equal to [f, c, e]
// NEW LOOP - trying to rank b
// anal-array = [f, c, e]. length !== 1, so generate random 'up-next' = c
// rank(b, c) => b < c ==> b = { beats: d, loses: c }, c = { beats: b, d, e loses: f }
// anal-array.length !== 1, so continue checks
// since c beats b, look to right of c in anal-array. not empty, so new loop with anal-array equal to [e]
// NEW LOOP - trying to rank b
// anal-array = [e]. length = 1, so "up next" = e
// rank(b, e) => b < e ==> 1: b = { beats: d, loses: c, e }, 4: e = { beats: b, d, loses: c }
// since anal-array.length === 1, we can put b directly to the right of e in ranked ==> ranked = [f, c, e, b, d]
// does b have any unranked wins or losses? => no
// ranked.length !== initial.length => next random pair
// random = [a, c]
// both in ranked? => no
// relationship => no
// rank(a, c) => a < c ==> a = { loses: c }, c = { beats: a, b, d, e loses: f }
// ranked empty? => no
// a or c in ranked? => yes => c
// since c beats a, look to right of c in ranked. not empty, so new loop with anal-array equal to [e, b, d]
// NEW LOOP - trying to rank a
// anal-array = [e, b, d]. generate random "up next" = e
// rank(a, e) => a > e ==> a = { beats: e, loses: c }, e = { beats: b, d, loses: a, c }
// anal-array.length !== 1, so continue
// a beats e, so look to left of e in anal-array. it is empty, so we can put a directly before e in ranked => ranked = [f, c, a, e, b, d]
// does a have any unranked wins or losses? => no
// ranked.length === initial.length => return ranked
// 10 user rankings total
