#! /usr/bin/env node

const fs = require('fs');
const subYears = require('date-fns/sub_years');
const addDays = require('date-fns/add_days');
const logLine = require('single-line-log').stdout;
const { exec } = require('shelljs');

const character = require('./character').creeper;

/* ---------------- User Config ---------------------*/

// Reset point
const timeMachineTag = 'time-machine';
const githubUserName = 'liangzr';
const githubUserEmail = 'liangzr@outlook.com';


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

// The background color that besides the character
const BG_COLOR = COLOR.LIGHT;

// First day
const START_DATE = addDays(subYears(new Date(), 1), -1);

const slientAndSync = {
  async: false,
  silent: true,
};

/**
 * Intialize git repository
 */
const initRepository = () => {
  // Configure git user
  exec(`git config --global user.name ${githubUserName}`);
  exec(`git config --global user.email ${githubUserEmail}`);

  // Travel to the past
  exec(`git reset ${timeMachineTag} --hard`);

  // Initialize keep file
  exec('touch ./fun.keep && git add ./fun.keep');
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
        fs.writeFileSync('./fun.keep', `${col}-${row}-${i}`, { flag: 'w' });
        exec(
          `GIT_AUTHOR_DATE="${someday}" GIT_COMMITTER_DATE="${someday}" git commit ./fun.keep -m ${col}-${row}-${i}`,
          slientAndSync,
        );
        logLine(`Committed: ${col}-${row}-${i}`);
      }
    }
  }
};

// Prepare the pixel matrix
checkMatrix(character);
const matrix = completeMatrix(character);

// Init git repository, commit and push it
initRepository();
draw(matrix);

console.log('\nAll committed, wait to push...');

exec('git push -u origin HEAD:master --force');

console.log('\nAll done :P');
