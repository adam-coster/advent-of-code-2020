export function assert (claim:any,message:string): asserts claim {
  if(!claim){ throw new Error(message);}
}

export function splitOnLinebreak(string:string){
  assert(typeof string == 'string',`${string} is not a string`);
  return string.split(/[\r\n]+/mg)
    .map(x=>x.trim())
    .filter(x=>x);
}

export function splitOnEmptyLine(string:string){
  return string
    .split(/[\r\n]{2,}/gm)
    .filter(entry=>entry.trim());
}

export function splitOnAllWhitespace(string:string){
  assert(typeof string == 'string',`${string} is not a string`);
  return string.split(/\s+/mg)
    .filter(x=>x);
}

export function cumulativeSum(numbers:number[]){
  return numbers.reduce((total,current)=>total+current,0);
}

export function cumulativeProd(numbers:number[]){
  return numbers.reduce((total,current)=>total*current,1);
}

export function countBy<T extends any>(array:T[],test:(value:T)=>any){
  return array.reduce((count,current)=>test(current)?count+1:count, 0);
}