#! /usr/bin/env node

const {
  subYears,
  subWeeks,
  addDays,
  lastDayOfWeek,
  addHours,
} = require('date-fns');
const logLine = require('single-line-log').stdout;
const { exec } = require('shelljs');

const character = require('./character').creeper;

/* ---------------- User Config ---------------------*/

// Set up a default branch to commit
const graphBranch = 'graph';


const COLOR = {
  NONE: 0,
  LIGHT: 1,
  MEDIUM: 2,
  DEEP: 3,
  HEAVY: 4,
};

const level2commits = {
  0: 0,
  1: 1,
  2: 4,
  3: 7,
  4: 10,
};

// The background color that besides the character graph
const BG_COLOR = COLOR.LIGHT;

// Start date (first block) of the contributions graph
const oneYearAgo = subYears(new Date(), 1);
const prevWeek = subWeeks(oneYearAgo, 1);
const START_DATE = addHours(lastDayOfWeek(prevWeek, { weekStartsOn: 1 }), 12);

const globalConfig = {
  async: false,
  silent: true,
  env: process.env,
};

/**
 *  Prepare the repositoy before commit character graph
 */
const initRepository = () => {
  // Configure git user inside the node shell
  exec(`git config --global user.name ${process.env.GITHUB_USER}`);
  exec(`git config --global user.email ${process.env.GITHUB_EMAIL}`);

  // Clean up & reset the graph branch
  exec('git checkout master');
  exec(`git branch -D ${graphBranch}`);
  exec(`git checkout -b ${graphBranch}`);
};

/**
 * Check that the matrix is validated
 * @param {Array<Array>} matrix pixel matrix
 */
const checkMatrix = (matrix) => {
  console.log(matrix);
  if (
    !Array.isArray(matrix) ||
    matrix.some(subarray => !Array.isArray(subarray))
  ) {
    throw new Error('Character matrix need to be a two-dimensional array');
  }
};

/**
 * Complete the matrix with default color
 * @param {Array<Array>} matrix pixel matrix
 */
const completeMatrix = (matrix) => {
  const movableTimes = 52 - matrix[0].length;
  const pos = ~~(movableTimes * (new Date().getHours() / 24));
  const paddings = [new Array(pos), new Array(movableTimes - pos)].map(arr => arr.fill(BG_COLOR));
  return matrix.map(row => paddings[0].concat(row, paddings[1]));
};

/**
 * Drawing commits graph by git commit
 * @param {} matrix pixel matrix
 */
const draw = (matrix) => {
  for (let col = 0; col <= 52; col += 1) {
    for (let row = 0; row <= 6; row += 1) {
      const level = matrix[row][col];
      const commits = level2commits[level];
      for (let i = 0; i < commits; i += 1) {
        const someday = addDays(START_DATE, (col * 7) + row);
        exec(
          `GIT_AUTHOR_DATE="${someday}" GIT_COMMITTER_DATE="${someday}" git commit --allow-empty -m ${col}-${row}-${i}`,
          globalConfig,
        );
        logLine(`Committed: ${col}-${row}-${i}`);
      }
    }
  }
};

// Prepare the pixel matrix
checkMatrix(character);
const matrix = completeMatrix(character);

// Drawing graph
initRepository();
draw(matrix);

console.log('\nAll committed, wait to push...');

exec(`git push -u origin HEAD:${graphBranch} --force`);
exec('sh notify.sh', globalConfig);

console.log('\nAll done :P');
