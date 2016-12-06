import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { countPossibleTris } from './main';

let data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf8');

describe('countPossibleTris', () => {
  it('should be a function', () => {
    expect(countPossibleTris).to.be.a('function');
  });
  it('returns 1 for 10 10 14', () => {
    expect(countPossibleTris('10  10  14')).to.equal(1);
  });
  it('returns 1 for 10 10 14\n10 10 22', () => {
    expect(countPossibleTris('10 10 14\n10 10 22')).to.equal(1);
  });
  it('returns 2 for 10 10 14\n10 10 22\n12 6 15', () => {
    expect(countPossibleTris('10 10 14\n10 10 22\n12 6 15')).to.equal(2);
  });
  it('returns 4 for 85  516  744\n272  511  358\n801  791  693\n572  150   74\n644  534  138\n', () => {
    expect(countPossibleTris('785  516  744\n272  511  358\n801  791  693\n572  150   74\n644  534  138\n')).to.equal(4);
  });
  describe('if parseByCol param is true', () => {
    it('returns 3 for 10 10 14\n10 10 22\n12 6 15', () => {
      expect(countPossibleTris('10 10 14\n10 10 22\n12 6 15', true)).to.equal(3);
    });
    it('returns 4 for 33 56 134\n272  511  358\n801  791  693\n572  150   74\n644  534  138\n55 33 66\n', () => {
      console.log(countPossibleTris(data, true))
      expect(countPossibleTris('33 56 134\n272  511  358\n801  791  693\n572  150   74\n644  534  138\n55 33 66\n', true)).to.equal(1);
    });
  });
})
