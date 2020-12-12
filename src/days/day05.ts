/** @see https://adventofcode.com/2020/day/5 */

import { splitOnLinebreak } from "../lib/utility";
import {Day} from "../types/Day";

function narrowRange(remainingDirections:string,min:number,max:number):number{
  const newBoundary = (max-min)/2 + min;
  if(!remainingDirections.length){
    return newBoundary;
  }
  if(['F','L'].includes(remainingDirections[0])){
    // Lower half
    const newMax = Math.floor(newBoundary);
    return narrowRange(remainingDirections.slice(1),min,newMax);
  }
  else{
    const newMin = Math.ceil(newBoundary);
    return narrowRange(remainingDirections.slice(1),newMin,max);
  }
}

interface Seat {
  row:number,col:number,id:number
}

function seatToNumber(seat:string,): Seat{
  const [rowInfo,colInfo] = [seat.slice(0,7),seat.slice(7)];
  const row = narrowRange(rowInfo,0,127);
  const col = narrowRange(colInfo,0,7);
  const id = (row * 8) + col;
  return {
    row,
    col,
    id
  };
}

function parseDataset (string:string): Seat[]{
  const seats = splitOnLinebreak(string);
  return seats.map(seatToNumber);
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const seats = parseDataset(dataset);
  return Math.max(...seats.map(seat=>seat.id));
}

function seatIsAssigned(seats:Seat[],id:number){
  return seats.find(seat=>seat.id==id);
}

function puzzle2(dataset:string){
  const seats = parseDataset(dataset);
  // Just do a brute-force search.
  // For each possible seat:
  // 1. Is it missing from the assigned?
  // 2. Are those at pos +/- 1 assigned?
  const mySeats: number[] = [];
  for(let row=0; row<128; row++){
    for(let col=0; col<8; col++){
      const id = (row*8)+col;
      const isMySeat = !seatIsAssigned(seats,id) &&
        seatIsAssigned(seats,id-1) &&
        seatIsAssigned(seats,id+1);
      if(isMySeat){
        return id;
      }
    }
  }
  throw new Error("No seat found.");
}

const day: Day = {
  day: 5,
  sample:{
    input: `FBFBBFFRLR`,
    puzzle1: 357
  },
  puzzle1,
  puzzle2,
};

export default day;
