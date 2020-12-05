
/**
 *  # PROMPT
 *
    The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

    Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

    In your expense report, what is the product of the three entries that sum to 2020?
 */

import { cumulativeProd, cumulativeSum } from "../lib/utility";

/**
 * # NOTES
 *
 * + Still easy to brute-force, less obvious how to reduce total comparisons.
 * + Still likely fast enough, so no need to optimize unless doing so for fun.
*/

export default function (numbers:number[],sumTo=2020){
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
