import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { checkValidRoom, countValidIds, shiftLetters, shiftBy, getSecretId } from './main';

const data = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8');

const testData = `aaaaa-f-ggg-z-b-x-123[agbfx]
totally-real-room-200[decoy]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]`;

describe('checkValidRoom', () => {
  it('is a function', () => {
    expect(checkValidRoom).to.be.a('function');
  });
  it('returns true if the room is valid', () => {
    expect(checkValidRoom('aaaaa-f-ggg-z-b-x-123[agbfx]')).to.equal(true);
  });
  it('returns false for an invalid room', () => {
    expect(checkValidRoom('totally-real-room-200[decoy]')).to.equal(false);
  });
  describe('countValidIds', () => {
    it('is a function', () => {
      expect(countValidIds).to.be.a('function');
    });
    it('returns the total IDs of valid rooms', () => {
      expect(countValidIds(testData)).to.equal(1514);
    });
  });
  describe('shiftBy', () => {
    it('is a function', () => {
      expect(shiftBy).to.be.a('function');
    });
    it('returns c for a, 2', () => {
      expect(shiftBy('a', 2)).to.equal('c');
    });
    it('returns e for e, 24', () => {
      expect(shiftBy('e', 26)).to.equal('e');
    });
    it('returns g for e, 28', () => {
      expect(shiftBy('e', 28)).to.equal('g');
    });
  });
  describe('shiftLetters', () => {
    it('is a function', () => {
      expect(shiftLetters).to.be.a('function');
    });
    it('correctly shifts the letters of a string the number of alphabet positions specified', () => {
      expect(shiftLetters('aaaaa-f-ggg-z-b-x', 1)).to.equal('bbbbb g hhh a c y');
    });
  });
  describe('getSecretId', () => {
    it('should be a function', () => {
      expect(getSecretId).to.be.a('function');
    });
    it('should return the secret ID number', () => {
      expect(getSecretId(data)).to.equal(324);
    });
  });
});
