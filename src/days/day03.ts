/** @see https://adventofcode.com/2020/day/3 */

// This puzzle is an off-by-one NIGHTMARE

import { assert, splitOnLinebreak, countBy, cumulativeSum, cumulativeProd } from "../lib/utility";
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

  treeCountForTraversalPattern(rightBy:number,downBy:number){
    let [x,y] = [0,0];
    let treeTally = 0;
    while(y<this.height){
      treeTally += Number(this.isTree(x,y));
      x += rightBy;
      y += downBy;
    }
    return treeTally;
  }
}


/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const map = new TreeMap(dataset);
  return map.treeCountForTraversalPattern(3,1);
}

function puzzle2(dataset:string){
  const map = new TreeMap(dataset);
  const patterns = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2],
  ] as const;
  const counts = patterns
    .map(pattern=>map.treeCountForTraversalPattern(pattern[0],pattern[1]));
  return cumulativeProd(counts);
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
    puzzle2: 336
  },
  puzzle1,
  puzzle2,
};

export default day;
