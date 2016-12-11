import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { containsABBA, extractBracketSections, extractStringSections, countIPs, containsABA, getBABStrings } from './main';

const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8');
const testData = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8');

describe('containsABBA', () => {
  it('should return true for abba', () => {
    expect(containsABBA('abba')).to.equal(true);
  });
  it('returns false for abber', () => {
    expect(containsABBA('abber')).to.equal(false);
  });
  it('should return true for ioxxoj', () => {
    expect(containsABBA('ioxxoj')).to.equal(true);
  });
});

describe('containsABA', () => {
  it('returns true for fkjfekew', () => {
    expect(containsABA('fkjfekew')).to.equal(true);
  });
  it('returns false for hello', () => {
    expect(containsABA('hello')).to.equal(false);
  });
  it('returns false for helllo', () => {
    expect(containsABA('helllo')).to.equal(false);
  });
});

describe('getBABStrings', () => {
  it('extracts the corresponding BAB strings', () => {
    console.log(countIPs(data, true).length)
    expect(getBABStrings('fkjfekew')).to.eql(['kek']);
    expect(getBABStrings('fkjojfekew')).to.eql(['ojo', 'kek']);
  });
});

describe('extractBracketSections', () => {
  it('should extract bracketed sections from a string', () => {
    expect(extractBracketSections('foo[bar]foo[cat]bar')).to.eql(['[bar]', '[cat]']);
  });
});

describe('extractStringSections', () => {
  it('should extract string sections from a string', () => {
    expect(extractStringSections('foo[bar]foo[cat]bar')).to.eql(['foo', 'foo', 'bar']);
  });
});
