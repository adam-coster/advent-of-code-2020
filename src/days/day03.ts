/** @see https://adventofcode.com/2020/day/3 */

// This puzzle is an off-by-one NIGHTMARE

import { assert, splitOnLinebreak, countBy, cumulativeSum } from "../lib/utility";
import {Day} from "../types/Day";
import {undent} from "@bscotch/utility";

export class TreeMap {

  readonly map:    string[]; // Note: readonly doesn't confer much protection on a array
  readonly width:  number;
  readonly height: number;

  constructor(source:string){
    this.map = source.trim().split(/[\r\n]+/mg);
    this.height = this.map.length;
    this.width  = this.map[0].length;
    assert(this.height>0 && this.width>0,'All dims must be non-zero');
    assert(this.map.every(row=>row.length==this.width),`All map rows must be the same length`);
  }

  isTree(x:number,y:number){
    assert(y<this.height,'y cannot be large than the map height');
    x = x % this.width;
    return this.map[y][x] == '#';
  }
}


/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const map = new TreeMap(dataset);
  let [x,y] = [0,0];
  let treeTally = 0;
  while(y<map.height){
    treeTally += Number(map.isTree(x,y));
    x += 3;
    y += 1;
  }
  return treeTally;
}

function puzzle2(dataset:string){
  return Infinity;
}

const day: Day = {
  day: 3,
  sample:{
    input: undent`
      ..##.......
      #...#...#..
      .#....#..#.
      ..#.#...#.#
      .#...##..#.
      ..#.##.....
      .#.#.#....#
      .#........#
      #.##...#...
      #...##....#
      .#..#...#.#`,
    puzzle1: 7,
    puzzle2: Infinity
  },
  puzzle1,
  puzzle2,
};

export default day;
