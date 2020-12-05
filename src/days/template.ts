/** @see https://adventofcode.com/2020/day/? */

import { assert, splitOnLinebreak, countBy, cumulativeSum } from "../lib/utility";
import {Day} from "../types/Day";

function parseDataset (string:string){
  const lines = splitOnLinebreak(string);
  return lines;
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const data = parseDataset(dataset);
  return Infinity;
}

function puzzle2(dataset:string){
  const data = parseDataset(dataset);
  return Infinity;
}

const day: Day = {
  day: Infinity,
  sample:{
    input: `
    
    `,
    puzzle1: Infinity,
    puzzle2: Infinity
  },
  puzzle1,
  puzzle2,
};

export default day;
