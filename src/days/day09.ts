/** @see https://adventofcode.com/2020/day/9 */

import { assert, splitOnLinebreak, countBy, cumulativeSum } from "../lib/utility";
import {Day} from "../types/Day";

function parseDataset(string:string){
  return splitOnLinebreak(string)
    .map(Number);
}

function pairwiseSumExists(numbers:number[],sum:number){
  numbers = [...numbers].sort((a,b)=>a-b);
  for(let i=0;i<numbers.length-1;i++){
    if(numbers[i]>sum){ return false;}
    for(let j=i+1; j<numbers.length; j++){
      if(numbers[i]+numbers[j]==sum){
        return true;
      }
    }
  }
  return false;
}

function firstInvalidEntry(numbers:number[],preambleSize=25){
  for(let i=preambleSize; i<numbers.length; i++){
    const preambleStart = i-preambleSize;
    if(!pairwiseSumExists(numbers.slice(preambleStart,preambleStart+preambleSize),numbers[i])){
      return numbers[i];
    }
  }
  throw new Error("No invalid entries found");
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string,isSample=false){
  const data = parseDataset(dataset);
  return firstInvalidEntry(data,isSample ? 5 : 25);
}

function puzzle2(dataset:string){
  const data = parseDataset(dataset);
  return -Infinity;
}

const day: Day = {
  day: 9,
  sample:{
    input: `
      35
      20
      15
      25
      47
      40
      62
      55
      65
      95
      102
      117
      150
      182
      127
      219
      299
      277
      309
      576
    `,
    puzzle1: 127,
    puzzle2: Infinity
  },
  puzzle1,
  puzzle2,
};

export default day;
