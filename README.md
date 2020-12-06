# Advent of Code (2020)

Monorepo for my [Advent of Code 2020](https://adventofcode.com/2020) submissions.

## Tech

+ [Node.js](https://nodejs.org/en/) v14.x
+ [Typescript](https://www.typescriptlang.org/) v4.1.2
+ [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) (tests)
+ [Visual Studio Code](https://code.visualstudio.com/) (editor)

## Organization

Solutions are organized by day inside `src/day/`, all exporting
a common object typed by `src/types/Day.ts` and templated by
`src/day/template.ts`. The sample cases
and expected results are included with the exports. Collectively,
this allows for an easy-to-test and easy-to-run solution format.

The datasets provided to me by Advent of Code are in `src/test/inputs/`,
named by day.

Finally, unit and solution tests are all in `src/test/index.ts`.
The test suite also computes and echos solutions based on the
datasets.

## Setup

To set up this project locally for develop or inspection:

+ Make sure your tech versions are sufficient.
+ Clone this repo.
+ Navigate to the root of this project.
+ Run `npm i`.
+ Run `npm test` to run tests and see the solution output.

## Adding a New Test

+ Copy `src/days/template.ts` to `src/days/dayXX.ts`.
+ Change the `day` field to the test day wherever appropriate.
+ Populate the exported object with the day-specific sample input/output.
+ Import the solution into the test suite in `src/test/index.ts`.
+ Add the imported solution to the `days` array.
+ For each puzzle:
  + Write the solution as the appropriate `puzzle1`/`puzzle2` function
    in the exported object. Test with `npm test` until tests pass.
  + Get your personal dataset from Advent of Code, save to `src/inputs/XX.txt`
  + Run `npm test` and look at the logged solution.