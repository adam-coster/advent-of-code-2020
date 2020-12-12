/** @see https://adventofcode.com/2020/day/6 */

import { undent } from "@bscotch/utility";
import { assert, splitOnLinebreak, countBy, cumulativeSum, splitOnEmptyLine } from "../lib/utility";
import {Day} from "../types/Day";

function getGroupAnswersFromData (string:string){
  const groups = splitOnEmptyLine(string)
    .map(group=>group.replace(/[^a-z]/gm,''));
  return groups;
}

function groupUniqueAnswerCount (groupAnswers:string){
  return new Set(groupAnswers.split('')).size;
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const groups = getGroupAnswersFromData(dataset);
  return cumulativeSum(groups.map(groupUniqueAnswerCount));
}

function puzzle2(dataset:string){
  const data = getGroupAnswersFromData(dataset);
  return -Infinity;
}

const day: Day = {
  day: 6,
  sample:{
    input: undent`
      abc

      a
      b
      c

      ab
      ac

      a
      a
      a
      a

      b
    `,
    puzzle1: 11,
    puzzle2: Infinity
  },
  puzzle1,
  puzzle2,
};

export default day;
