import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { splitCols, getMessage, getCharFromCol } from './main';

const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8');

const testData = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8');

describe('splitCols', () => {
  it('splits the rows into columns', () => {
    let txt = 'abcde\nabcde\nabcde\n';
    expect(splitCols(txt)).to.eql([['a', 'a', 'a'], ['b', 'b', 'b'], ['c', 'c', 'c'], ['d', 'd', 'd'], ['e', 'e', 'e']]);
  });
});

describe('getCharFromCol', () => {
  it('returns the most common char in the array', () => {
    expect(getCharFromCol(['a', 'b', 'c', 'a', 'b', 'r', 'f', 'i', 'g', 'a', 'b', 'a'])).to.equal('a');
  });
});

describe('getMessage', () => {
  it('returns easter for the test data if second param is true', () => {
    console.log(getMessage(data))
    expect(getMessage(testData, true)).to.equal('easter');
  });
  it('returns advent for the test data is second param is falsey', () => {
    expect(getMessage(testData)).to.equal('advent');
  });
});
