/**
To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc

Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies?
 */

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
