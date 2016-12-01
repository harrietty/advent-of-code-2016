/* eslint-env mocha */

import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import findShortestRoute from './main';
const data = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8');

describe('findShortestRoute', () => {
  it('should be a function', () => {
    expect(findShortestRoute).to.be.a('function');
  });
  it('should return 3 for R3', () => {
    expect(findShortestRoute('R3')).to.equal(3);
  });
  it('should return 5 for R3, L2, R3, R2, R1', () => {
    expect(findShortestRoute('R3, L2, R3, R2, R1')).to.equal(5);
  });
  it('returns 300 for the given data', () => {
    expect(findShortestRoute(data)).to.equal(300);
  });
  it('finds the first repeated position if findRepeated is true', () => {
    console.log(findShortestRoute(data, true));
    expect(findShortestRoute('R3, L3, R3, R3, R3, R3', true)).to.equal(3);
  });
});
