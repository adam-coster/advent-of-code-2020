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

import day1 from "../days/day01";
import day2 from "../days/day02";


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
  });

  describe("Puzzles",function(){
    const days = [
      day1,
      day2
    ];

    for(const day of days){
      for(const puzzle of [1,2] as const){
        it(`Day ${day} Puzzle ${puzzle}`,function(){
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
