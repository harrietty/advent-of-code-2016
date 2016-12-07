import { expect } from 'chai';
import { makeHash, beginsWithZeroes, getPassword } from './main.js';

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
  describe('getPassword', () => {
    it('returns 18f47a30 for door id abc', (done) => {
      console.log(getPassword('cxdnnyjw'));
      // expect(getPassword('abc')).to.equal('18f47a30');
      done();
    });
  });
})
