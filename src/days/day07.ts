/** @see https://adventofcode.com/2020/day/7 */

import { undent } from "@bscotch/utility";
import { assert, splitOnLinebreak } from "../lib/utility";
import {Day} from "../types/Day";

class Bag {
  private innerBags:Map<Bag,number> = new Map();

  constructor(readonly color:string){}

  addBag(bag:Bag,count:number){
    this.innerBags.set(bag,count);
  }

  /**
   * Search children tree for any matching bag colors.
   * Make sure to terminte if we end up back where we started
   * (the parent)
   */
  containsBagColor(color:string,parent?:Bag){
    if(!this.innerBags.size){
      return false;
    }
    for(const [bag,count] of this.innerBags){
      if(bag.color==color){
        return true;
      }
      if(bag.containsBagColor(color,parent||this)){
        return true;
      }
    }
    return false;
  }

  /**
   * Recursively tally the number of bags contained
   * inside this one.
   */
  innerBagCount(){
    let count = 0;
    for(const [bag,containsCount] of this.innerBags){
      count += containsCount + (containsCount * bag.innerBagCount());
    }
    return count;
  }
}

class Bags {
  public bags: Map<string,Bag> = new Map();

  constructor(data:string){
    splitOnLinebreak(data)
      .forEach(line=>{
        const [parentColor,childrenString] = line.split(/ bags? contain /);
        assert(parentColor && childrenString,'split did not work');
        const parentBag = this.createBagIfMissing(parentColor);
        const childRegex = /(\d+) (([^ ]+) ([^ ]+)) bag/;
        (childrenString.match(new RegExp(childRegex,'g')) || [])
          .forEach(colorString=>{
            const [,count,color] = colorString.match(childRegex) as [null,string,string];
            assert(count && color, "child regex did not work");
            parentBag.addBag(this.createBagIfMissing(color),Number(count));
          });
      });
  }

  createBagIfMissing(color:string): Bag{
    if(!this.bags.get(color)){
      this.bags.set(color, new Bag(color));
    }
    return this.bags.get(color) as Bag;
  }

  bagsContainingColor(color:string){
    const bags = [...this.bags.values()]
      .filter(bag=>bag.containsBagColor(color));
    return bags;
  }
}

/** Tally the number of VALID passwords */
function puzzle1(dataset:string){
  const bags = new Bags(dataset);
  return bags.bagsContainingColor('shiny gold').length;
}

function puzzle2(dataset:string){
  const bags = new Bags(dataset);
  return bags.bags.get('shiny gold')?.innerBagCount() || 0;
}

const day: Day = {
  day: 7,
  sample:{
    input: undent`
      light red bags contain 1 bright white bag, 2 muted yellow bags.
      dark orange bags contain 3 bright white bags, 4 muted yellow bags.
      bright white bags contain 1 shiny gold bag.
      muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
      shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
      dark olive bags contain 3 faded blue bags, 4 dotted black bags.
      vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
      faded blue bags contain no other bags.
      dotted black bags contain no other bags.
    `,
    puzzle1: 4,
    puzzle2: 32
  },
  puzzle1,
  puzzle2,
};

export default day;
