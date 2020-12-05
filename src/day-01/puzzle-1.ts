
/**
 * # PROMPT
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
 */

/**
 * # NOTES
 *
 * + Easy to brute force, but it's a lot of pair-wise comparisons.
 * + Start with brute-forcing and only worry if it's VERY slow.
*/

export default function (numbers:number[],sumTo=2020){
  for(let i=0; i<numbers.length; i++){
    for(let j=i; j<numbers.length; j++){
      if(numbers[i]+numbers[j] == sumTo){
        return numbers[i] * numbers[j];
      }
    }
  }
}
