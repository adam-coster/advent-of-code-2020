export function assert (claim:any,message:string): asserts claim {
  if(!claim){ throw new Error(message);}
}

export function splitOnAllWhitespace(string:string,options?:{includeFalsey:boolean}){
  assert(typeof string == 'string',`${string} is not a string`);
  return string.split(/\s+/mg)
    .filter(x=>x || options?.includeFalsey);
}

export function cumulativeSum(numbers:number[]){
  return numbers.reduce((total,current)=>total+current,0);
}

export function cumulativeProd(numbers:number[]){
  return numbers.reduce((total,current)=>total*current,1);
}