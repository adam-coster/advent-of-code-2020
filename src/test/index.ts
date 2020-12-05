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

import day1Puzzle1 from "../day-01/puzzle-1";
import day1Puzzle2 from "../day-01/puzzle-2";

import day2 from "../days/day02";

const sandboxRoot = "./sandbox";
const samplesRoot = "./samples";

function loadSampleFile(day:number){
  const paddedDay = `${day}`.padStart(2,'0');
  return fs.readFileSync(path.join('src','test',`day-${paddedDay}-input.txt`),'utf8');
}

/**
 * Clone any files in a "./samples" folder into
 * a "./sandbox" folder, overwriting any files
 * currently in there. This is useful for allowing
 * your test suite to make changes to files without
 * changing the originals, so that you can easily
 * reset back to an original state prior to running a test.
 */
function resetSandbox() {
  if(!fs.existsSync(samplesRoot)){
    // Then no samples exist, and no sandbox needed
    return;
  }
  fs.ensureDirSync(sandboxRoot);
  fs.emptyDirSync(sandboxRoot);
  fs.copySync(samplesRoot, sandboxRoot);
}

describe("Advent Submissions", function () {

  before(function(){
    resetSandbox();
  });

  describe("Utilities", function(){
    it("can split strings on any whitespace", function(){
      expect(splitOnAllWhitespace("  \nhello  \n\n \t world\n"))
        .to.eql(['hello','world']);
    });
    it("can split a string on newlines", function(){
      expect(splitOnLinebreak("  \nhello  \n\n \t world\n"))
        .to.eql(['hello','world']);
  });

  describe("Day 1", function () {
    const sample = splitOnAllWhitespace(`
      1721
      979
      366
      299
      675
      1456
    `).map(x=>Number(x));
    const expected = {puzzle1: 514579, puzzle2: 241861950};
    const data = splitOnAllWhitespace(loadSampleFile(1,1)).map(x=>Number(x));

    it("Puzzle 1: can get sample result", function () {
      expect(day1Puzzle1(sample)).to.equal(expected.puzzle1);
    });
    it("Puzzle 1: can get puzzle result", function(){
      console.log(day1Puzzle1(data));
    });


    it("Puzzle 2: can get sample result", function () {
      expect(day1Puzzle2(sample)).to.equal(expected.puzzle2);
    });
    it("Puzzle 2: can get puzzle result", function(){
      console.log(day1Puzzle2(data));
    });
  });

  describe("Day 2", function(){
    const sample = `
      1-3 a: abcde
      1-3 b: cdefg
      2-9 c: ccccccccc
    `;
    const expected = {puzzle1: 2, puzzle2: null};
    const data = loadSampleFile(2);

    it("Puzzle 1: can get sample result",function(){
      expect(day2.puzzle1(sample)).to.equal(expected.puzzle1);
    });
    it("Puzzle 1: can get puzzle result",function(){
      console.log(day2.puzzle1(data));
    });
  });


  after(function(){
    resetSandbox();
  });

});
