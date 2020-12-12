/** @see https://adventofcode.com/2020/day/6 */

import { undent } from "@bscotch/utility";
import { cumulativeSum, splitOnEmptyLine, splitOnAllWhitespace } from "../lib/utility";
import {Day} from "../types/Day";

function getGroupAnswersFromData (string:string){
  return splitOnEmptyLine(string)
    .map(group=>group.replace(/[^a-z]/gm,''));
}

function groupUniqueAnswers (groupAnswers:string){
  return [...new Set(groupAnswers.split(''))];
}

function getGroupUniversalAnswers (group:string){
  const allAnswersInGroup = groupUniqueAnswers(getGroupAnswersFromData(group)[0]);
  const people = splitOnAllWhitespace(group)
    .map(person=>new Set(person.split('')));
  const universalAnswers = allAnswersInGroup.filter(answer=>{
    return people.every(person=>person.has(answer));
  });
  return universalAnswers;
}

function getGroupCommonAnswersFromData (string:string){
  return splitOnEmptyLine(string)
    .map(getGroupUniversalAnswers);
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const groups = getGroupAnswersFromData(dataset);
  return cumulativeSum(groups.map(group=>groupUniqueAnswers(group).length));
}

function puzzle2(dataset:string){
  const groups = getGroupCommonAnswersFromData(dataset);
  return cumulativeSum(groups.map(group=>group.length));
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
    puzzle2: 6
  },
  puzzle1,
  puzzle2,
};

export default day;
