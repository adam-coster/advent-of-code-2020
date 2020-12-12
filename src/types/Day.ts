
export interface Day {
  day:number,
  sample: {
    input: string,
    puzzle1?: number,
    /** Not all Puzzle 2s have sample output. */
    puzzle2?: number,
  },
  puzzle1:(dataset:string)=>number,
  puzzle2:(dataset:string)=>number,
}