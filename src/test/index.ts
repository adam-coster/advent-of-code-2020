/**
 * @file Test suite, using Mocha and Chai.
 * Compiled files inside the 'test' folder are excluded from
 * published npm projects.
 * (Note that fs-extra is added as a dev dependency to make
 * sandbox setup much easier. If you aren't using a sandbox
 * you can remove this dependency. If you need fs-extra for
 * your main code, move it into the regular 'dependencies'
 * section of your package.json file)
 */

import {expect} from "chai";
import fs from "fs-extra";
import path from 'path';
import { splitOnAllWhitespace, splitOnLinebreak } from "../lib/utility";
import { undent } from "@bscotch/utility";

import day1 from "../days/day01";
import day2 from "../days/day02";
import day3, {TreeMap} from "../days/day03";
import day4 from "../days/day04";

const days = [
  day1,
  day2,
  day3,
  day4,
];

function loadSampleFile(day:number){
  return fs.readFileSync(path.join('src','test','inputs',`${day}.txt`),'utf8');
}

describe("Advent Submissions", function () {

  describe("Utilities", function(){
    it("can split strings on any whitespace", function(){
      expect(splitOnAllWhitespace("  \nhello  \n\n \t world\n"))
        .to.eql(['hello','world']);
    });
    it("can split a string on newlines", function(){
      expect(splitOnLinebreak("  \nhello  \n\n \t world\n"))
        .to.eql(['hello','world']);
    });
    it('can find trees on a Day3 map',function(){
      const tinyMap = undent`
        .#..
        ..##
        #.#.`;
      const map = new TreeMap(tinyMap);
      // Visible:
      expect(map.isTree(0,0)).to.be.false;
      expect(map.isTree(1,0)).to.be.true;
      expect(map.isTree(2,1)).to.be.true;
      expect(map.isTree(1,2)).to.be.false;
      // Wraparound:
      expect(map.isTree(5,0)).to.be.true;
      expect(map.isTree(6,0)).to.be.false;
      expect(map.isTree(4,2)).to.be.true;
      expect(map.isTree(4,1)).to.be.false;
    });
  });

  describe("Puzzles",function(){

    for(const day of days){
      for(const puzzle of [1,2] as const){
        it(`Day ${day.day} Puzzle ${puzzle}`,function(){
          const puzzleName = `puzzle${puzzle}` as const;
          expect(day[puzzleName](day.sample.input),'sample did not pass')
            .to.equal(day.sample[puzzleName]);
          const dataset = loadSampleFile(day.day);
          console.log(`Day ${day.day} Puzzle ${puzzle} result:`,
            day[puzzleName](dataset)
          );
        });
      }
    }
  });


});
