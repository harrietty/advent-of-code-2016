import { expect } from 'chai';
import { makeHash, beginsWithZeroes } from './main.js';

const input = 'cxdnnyjw';

describe('crypto challenge', () => {
  describe('makeHash', () => {
    it('returns a hash', () => {
      expect(makeHash(input)).to.be.a('string');
    });
  });
  describe('beginsWithZeroes', () => {
    it('returns true if hash begins with 5 0s', (done) => {
      expect(beginsWithZeroes(makeHash('abc3231929'))).to.equal(true);
      done();
    });
  });
});
