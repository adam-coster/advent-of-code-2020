/** @see https://adventofcode.com/2020/day/2 */

import { assert, splitOnLinebreak, countBy, cumulativeSum } from "../lib/utility";
import {Day} from "../types/Day";

const lineRegex = /^(?<min>\d+)-(?<max>\d+)\s(?<character>.):\s(?<password>.*)$/;

/** Crate a validator for Puzzle 1 */
function generatePolicyValidatorV1(min:number,max:number,character:string){
  return (password:string)=>{
    const charCount = password.split('').filter(x=>x==character).length;
    return charCount >= min && charCount <= max;
  };
}

/** Crate a validator for Puzzle 2 */
function generatePolicyValidatorV2(positions:[number,number],character:string){
  return (password:string)=>{
    const positionMatchesCharacter = (pos:number)=>{
      return pos <= password.length ? password[pos-1] == character : false;
    };
    const matches = cumulativeSum(positions.map(pos=>Number(positionMatchesCharacter(pos))));
    return matches == 1;
  };
}

function parseLine (line:string){
  const match = line.match(lineRegex);
  assert(match,`Line ${line} did not match regex`);
  const min = Number(match.groups!.min);
  const max = Number(match.groups!.max);
  const character = match.groups!.character;
  const password = match.groups!.password;
  const validator = generatePolicyValidatorV1(min,max,character);
  const validatorV2 = generatePolicyValidatorV2([min,max],character);
  return {
    min,
    max,
    character,
    password,
    isValid: validator(password),
    isValidV2: validatorV2(password)
  };
}

/**
 * Convert dataset where each line looks like
 * "1-3 a: abcde"
 * into objects describing each data point
 */
function parseDataset (string:string){
  const lines = splitOnLinebreak(string);
  return lines.map(parseLine);
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  return countBy(parseDataset(dataset),x=>x.isValid);
}

function puzzle2(dataset:string){
  return countBy(parseDataset(dataset),x=>x.isValidV2);
}

const day: Day = {
  day:2,
  sample:{
    input: `
      1-3 a: abcde
      1-3 b: cdefg
      2-9 c: ccccccccc
    `,
    puzzle1: 2,
    puzzle2: 1
  },
  puzzle1,
  puzzle2,
};

export default day;
