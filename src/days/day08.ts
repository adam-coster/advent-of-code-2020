/** @see https://adventofcode.com/2020/day/8 */

import { assert, splitOnLinebreak, countBy, cumulativeSum } from "../lib/utility";
import {Day} from "../types/Day";

type OperationName = 'acc'|'jmp'|'nop';

class BootSequence {
  private currentInstruction = 0;
  private visitedInstructions: Set<number> = new Set();
  private allInstructions:[OperationName,number][];
  private accumulator = 0;

  constructor(sequence:string){
    this.allInstructions = splitOnLinebreak(sequence)
      .map(instruction=>instruction.trim().split(' ') as [string,string])
      .map(inst=>[inst[0] as OperationName,Number(inst[1])]);
    try{
      for(const [method,value] of this.instructions()){
        this[method](value);
      }
    }
    catch{}
  }

  get accumulated(){ return this.accumulator; }

  *instructions(){
    while(true){
      yield this.allInstructions[this.currentInstruction];
    }
  }

  private nop(){this.jmp(1);}

  private acc(tally:number){
    this.accumulator += tally;
    this.jmp(1);
  }

  private jmp(indexChange:number){
    this.currentInstruction += indexChange;
    if(this.visitedInstructions.has(this.currentInstruction)){
      throw new Error(`Already vistied line ${this.currentInstruction}`);
    }
    else{
      this.visitedInstructions.add(this.currentInstruction);
    }
  }
}

function parseDataset (string:string){
  const lines = splitOnLinebreak(string);
  return lines;
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const game = new BootSequence(dataset);
  return game.accumulated;
}

function puzzle2(dataset:string){
  const data = parseDataset(dataset);
  return -Infinity;
}

const day: Day = {
  day: 8,
  sample:{
    input: `
      nop +0
      acc +1
      jmp +4
      acc +3
      jmp -3
      acc -99
      acc +1
      jmp -4
      acc +6
    `,
    puzzle1: 5,
    puzzle2: Infinity
  },
  puzzle1,
  puzzle2,
};

export default day;
