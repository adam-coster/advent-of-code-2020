/** @see https://adventofcode.com/2020/day/10 */

import { assert, splitOnLinebreak, countBy, cumulativeSum } from "../lib/utility";
import {Day} from "../types/Day";

function parseDataset (string:string){
  const nums = splitOnLinebreak(string).map(Number).sort((a,b)=>a-b);
  nums.unshift(0); // baseline
  nums.push(Math.max(...nums)+3); // device
  return nums;
}

function diffDist(numbers:number[]){
  const diffs: Map<number,number> = new Map();
  for(let i=1; i<numbers.length;i++){
    const diff = numbers[i]-numbers[i-1];
    diffs.set(diff,(diffs.get(diff)||0) + 1);
  }
  return diffs;
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const data = parseDataset(dataset);
  const dist = diffDist(data);
  return (dist.get(1)||0)*(dist.get(3)||0);
}

function puzzle2(dataset:string){
  const data = parseDataset(dataset);
  return -Infinity;
}

const day: Day = {
  day: 10,
  sample:{
    input: `
      28
      33
      18
      42
      31
      14
      46
      20
      48
      47
      24
      23
      49
      45
      19
      38
      39
      11
      1
      32
      25
      35
      8
      17
      7
      9
      4
      2
      34
      10
      3
    `,
    puzzle1: 220,
    puzzle2: Infinity
  },
  puzzle1,
  puzzle2,
};

export default day;
