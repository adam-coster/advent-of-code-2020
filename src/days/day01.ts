/** @see https://adventofcode.com/2020/day/1 */

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
