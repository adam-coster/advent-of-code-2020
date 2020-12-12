/** @see https://adventofcode.com/2020/day/4 */

import {Day} from "../types/Day";
import {undent} from "@bscotch/utility";
import { splitOnEmptyLine } from "../lib/utility";

const passportFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid','cid'] as const;

type PassportField = typeof passportFields[number];

type Passport = {
  [key in PassportField]?: string
}

function passportsFromDataset (string:string){
  return splitOnEmptyLine(string)
    .map(entry=>{
      const pairs = entry.trim()
        .split(/\s+/gm)
        .map(pair=>pair.split(':'));
      return Object.fromEntries(pairs);
    }) as Passport[];
}

function isInRange(number:number,min:number,max:number){
  return number <= max && number >= min;
}

function isValidYear(value:string,min:number,max:number){
  return value.match(/^\d{4}$/) &&
    isInRange(Number(value),min,max);
}

function isValidHeight(value:string){
  const match = value.match(/^(\d+)(in|cm)$/i);
  if(!match){return false;}
  const height = Number(match[1]);
  if(match[2] == 'in' ){
    return isInRange(height,59,76);
  }
  return isInRange(height,150,193);
}

function isValidField(field:PassportField,value?:string){
  if(!value){ return false; }
  if(field=='byr'){
    return isValidYear(value,1920,2002);
  }
  else if(field=='iyr'){
    return isValidYear(value,2010,2020);
  }
  else if(field=='eyr'){
    return isValidYear(value,2020,2030);
  }
  else if(field=='hgt'){
    return isValidHeight(value);
  }
  else if(field=='hcl'){
    return value.match(/^#[0-9a-f]{6}$/);
  }
  else if(field=='ecl'){
    return ['amb','blu','brn','gry','grn','hzl','oth'].includes(value);
  }
  else if(field=='pid'){
    return value.match(/^\d{9}$/);
  }
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const data = passportsFromDataset(dataset);
  const validPassports = data.filter(passport=>{
    return passportFields
      .every(field=>passport[field]||field=='cid');
  }) ;
  return validPassports.length;
}

function puzzle2(dataset:string){
  const data = passportsFromDataset(dataset);
  const validPassports = data.filter(passport=>{
    return passportFields
      .every(field=>isValidField(field,passport[field])||field=='cid');
  }) ;
  return validPassports.length;
}

const day: Day = {
  day: 4,
  sample:{
    input: undent`
      ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
      byr:1937 iyr:2017 cid:147 hgt:183cm

      iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
      hcl:#cfa07d byr:1929

      hcl:#ae17e1 iyr:2013
      eyr:2024
      ecl:brn pid:760753108 byr:1931
      hgt:179cm

      hcl:#cfa07d eyr:2025 pid:166559648
      iyr:2011 ecl:brn hgt:59in
    `,
    puzzle1: 2,
    puzzle2: 2
  },
  puzzle1,
  puzzle2,
};

export default day;
