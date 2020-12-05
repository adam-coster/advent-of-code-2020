
export interface Day {
  day:number,
  sample: {
    input: string,
    puzzle1: number,
    puzzle2: number,
  },
  puzzle1:(dataset:string)=>number,
  puzzle2:(dataset:string)=>number,
}