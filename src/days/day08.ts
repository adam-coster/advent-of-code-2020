/** @see https://adventofcode.com/2020/day/8 */

import { splitOnLinebreak } from "../lib/utility";
import {Day} from "../types/Day";
import clone from "lodash/cloneDeep";

type OperationName = 'acc'|'jmp'|'nop';

class BootSequence {
  private currentInstruction = 0;
  private visitedInstructions: Set<number> = new Set();
  private allInstructions:[OperationName,number][];
  private modifiedInstructions!:[OperationName,number][];
  private lastModifiedInstruction?:number;
  private initialAccumulator = 0;
  private accumulator = 0;

  constructor(sequence:string){
    this.allInstructions = splitOnLinebreak(sequence)
      .map(instruction=>instruction.trim().split(' ') as [string,string])
      .map(inst=>[inst[0] as OperationName,Number(inst[1])]);
    this.runProgram();
    this.initialAccumulator = this.accumulator;
    while(this.isCorrupted){
      this.runProgram();
    }
  }

  runProgram(){
    this.currentInstruction = 0;
    this.visitedInstructions.clear();
    this.accumulator = 0;
    this.modifiedInstructions = clone(this.allInstructions);
    if(typeof this.lastModifiedInstruction == 'number'){
      // Find the next instruction to modify
      for(let i=this.lastModifiedInstruction+1; i<this.allInstructions.length; i++){
        const [method,value] = this.modifiedInstructions[i];
        if(method=='acc'){
          continue;
        }
        if(method=='nop' && value==0){
          // Swapping would create infinite loop
          continue;
        }
        this.modifiedInstructions[i][0] = method=='nop' ? 'jmp' : 'nop';
        this.lastModifiedInstruction = i;
        break;
      }
    }
    else{
      this.lastModifiedInstruction = -1;
    }
    try{
      for(const [method,value] of this.instructions()){
        this[method](value);
      }
    }
    catch{}
  }

  get initialAccumulated(){ return this.initialAccumulator;}
  get accumulated(){ return this.accumulator; }
  get isCorrupted(){
    // Only valid if final index is one past the last instruction
    return this.currentInstruction != this.allInstructions.length;
  }

  *instructions(){
    while(true){
      yield this.modifiedInstructions[this.currentInstruction];
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

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const game = new BootSequence(dataset);
  return game.initialAccumulated;
}

function puzzle2(dataset:string){
  const game = new BootSequence(dataset);
  return game.accumulated;
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
    puzzle2: 8
  },
  puzzle1,
  puzzle2,
};

export default day;
