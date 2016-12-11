import { expect } from 'chai';
import _ from 'underscore';
import fs from 'fs';
import path from 'path';

import { makeRect, rotateRow, rotateCol, processScreen, stringifyCode, countPixels } from './main';

const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8');

const testArr = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

// PUZZLE ANSWER PART 1
const display = _.range(6).map(() => _.range(50).map(() => 0));
let newDisplay = processScreen(display, data);
let result = countPixels(newDisplay);
console.log(result);
console.log(stringifyCode(newDisplay));

describe.only('day8', () => {
  describe('makeRect', () => {
    it('turns on all pixels (A across, B down) in top left', () => {
      expect(makeRect(testArr, 3, 3)).to.eql([
        [1, 1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });
    it('does not mutate the original array', () => {
      makeRect(testArr, 4, 4);
      expect(testArr).to.eql([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });
  });
  describe('rotateRow', () => {
    it('rotates the given row by B positions', () => {
      var arr = makeRect(testArr, 3, 3);
      expect(rotateRow(arr, 2, 2)).to.eql([
        [1, 1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
      var arr2 = makeRect(testArr, 4, 2);
      expect(rotateRow(arr2, 1, 4)).to.eql([
        [1, 1, 1, 1, 0, 0],
        [1, 1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });
  });
  describe('rotateCol', () => {
    it('rotates a given column down B positions', () => {
      var arr = makeRect(testArr, 3, 3);
      expect(rotateCol(arr, 1, 3)).to.eql([
        [1, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0]
      ]);
    });
  });
});
