#! /usr/bin/env node

const subYears = require('date-fns/sub_years');
const format = require('date-fns/format');
const exec = require('cross-spawn').sync;
const character = require('./character');

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

// The background color that beyond the character
const BG_COLOR = COLOR.LIGHT;

const START_DATE = subYears(new Date(), 1).toISOString();

const execute = (cmdString) => {
  const args = cmdString.split(' ');
  const cmd = args.shift();
  exec(cmd, args);
};


/**
 * Check that the matrix is validated
 * @param {Array<Array>} matrix pixel matrix
 */
const checkMatrix = (matrix) => {
  if (
    !Array.isArray(matrix) ||
    matrix.some(subarray => !Array.isArray(subarray))
  ) {
    throw new Error('character matrix need to be a two-dimensional array');
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

const draw = (matrix) => {
  for (let col = 0; col <= 52; col += 1) {
    for (let row = 0; row <= 6; row += 1) {
      const level = matrix[row][col];
      const commits = level2commits[level];
      for (let i = 0; i < commits; i += 1) {
        execute(`echo "${new Date()}" > fun.keep`);
        execute(`GIT_AUTHOR_DATE=${START_DATE} GIT_COMMITER_DATE=${START_DATE} git commit ./fun.keep -m "${col}:${row}:${i}"`);
      }
    }
  }
};

// checkMatrix(character);
// const matrix = completeMatrix(character);


execute(`echo "${new Date()}" > fun.keep`);
execute(`GIT_AUTHOR_DATE=${START_DATE} GIT_COMMITER_DATE=${START_DATE} git commit ./fun.keep -m "test"`);
