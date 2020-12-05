
/**
 * ### Puzzle 1
 *
 * Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

 * For example, suppose your expense report contained the following:

 * 1721
 * 979
 * 366
 * 299
 * 675
 * 1456
 *
 * In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

 * Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
 *
 * ### Puzzle 2
 *  *  # PROMPT
 *
    The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

    Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

    In your expense report, what is the product of the three entries that sum to 2020?
 */

import { cumulativeProd, cumulativeSum, splitOnAllWhitespace } from "../lib/utility";
import {Day} from "../types/Day";

function parser(dataset:string){
  return splitOnAllWhitespace(dataset).map(x=>Number(x));
}

const sumTo = 2020;

const day: Day = {
  day:1,
  sample: {
    input: `
      1721
      979
      366
      299
      675
      1456
    `,
    puzzle1: 514579,
    puzzle2: 241861950,
  },
  puzzle1(dataset:string){
    const numbers = parser(dataset);
    for(let i=0; i<numbers.length; i++){
      for(let j=i; j<numbers.length; j++){
        if(numbers[i]+numbers[j] == sumTo){
          return numbers[i] * numbers[j];
        }
      }
    }
    throw new Error("No match found");
  },
  puzzle2(dataset:string){
    const numbers = parser(dataset);
    for(let k=0; k<numbers.length; k++){
      for(let i=0; i<numbers.length; i++){
        for(let j=i; j<numbers.length; j++){
          const sample = [i,j,k].map(x=>numbers[x]);
          if(cumulativeSum(sample)==sumTo){
            return cumulativeProd(sample);
          }
        }
      }
    }
    throw new Error("No match found");
  }
};

export default day;
