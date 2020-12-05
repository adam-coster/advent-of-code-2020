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

import day1Puzzle1 from "../day-01/puzzle-1";
import { splitOnAllWhitespace } from "../lib/utility";

const sandboxRoot = "./sandbox";
const samplesRoot = "./samples";

function loadSampleFile(day:number,puzzle:number){
  const paddedDay = `${day}`.padStart(2,'0');
  return fs.readFileSync(path.join('src','test',`day-${paddedDay}-puzzle-${puzzle}-input.txt`),'utf8');
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
      expect(splitOnAllWhitespace("  \nhello  \n\n \t world\n")).to.eql(['hello','world']);
    });
  });

  describe("Day 1: Puzzle 1", function () {
    const day    = 1;
    const puzzle = 1;
    it("can get sample result", function () {
      const sample = splitOnAllWhitespace(`
        1721
        979
        366
        299
        675
        1456
      `).map(x=>Number(x));
      expect(day1Puzzle1(sample)).to.equal(514579);
    });
    it("can get puzzle result", function(){
      const sample = splitOnAllWhitespace(loadSampleFile(1,1)).map(x=>Number(x));
      const result = day1Puzzle1(sample);
      expect(result).to.be.a('number');
      console.log({day,puzzle,result});
    });
  });

  after(function(){
    resetSandbox();
  });

});
