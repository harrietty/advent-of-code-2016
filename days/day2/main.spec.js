import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import {findCode, Position} from './main';

const data = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

describe('the Position object creator', () => {
  let position;
  beforeEach(() => {
    position = new Position(2, 0);
  });
  it('should be a function', () => {
    expect(Position).to.be.a('function');
  });
  it('returns an object with position array', () => {
    expect(position.pos).to.eql([2, 0]);
  });
  it('can update the position right', () => {
    position.R();
    expect(position.pos).to.eql([2, 1]);
  });
  it('can update the position down', () => {
    position.R();
    position.D();
    expect(position.pos).to.eql([3, 1]);
  });
  it('can update the position left', () => {
    position.R();
    position.L();
    expect(position.pos).to.eql([2, 0]);
  });
  it('can update the position right', () => {
    position.R();
    expect(position.pos).to.eql([2, 1]);
  });
  it('will not update the position if trying to move to null key', () => {
    position.L();
    expect(position.pos).to.eql([2, 0]);
    position.R();
    position.R();
    position.R();
    position.R();
    position.U();
    expect(position.pos).to.eql([2, 4]);
    position.L();
    position.D();
    position.D();
    expect(position.pos).to.eql([3, 3]);
    position.R();
    position.R();
    expect(position.pos).to.eql([3, 3]);
  });
  it('will not update position beyond max and min values', () => {
    position.L();
    position.L();
    expect(position.pos).to.eql([2, 0]);
    position.R();
    position.R();
    position.R();
    position.R();
    position.R();
    expect(position.pos).to.eql([2, 4]);
    position.L();
    position.L();
    position.D();
    position.D();
    position.R();
    expect(position.pos).to.eql([4, 2]);
    position.U();
    position.U();
    position.U();
    position.U();
    position.U();
    expect(position.pos).to.eql([0, 2]);
  });
});

describe('findCode', () => {
  it('is a function', () => {
    expect(findCode).to.be.a('function');
  });
  it('returns 5 for U', () => {
    expect(findCode('U')).to.equal('5');
  });
  it('returns 5 for ULDD', () => {
    expect(findCode('ULDD')).to.equal('5')
  });
  it('returns 2 for UURRDDRDULDUU', () => {
    expect(findCode('UURRDDRDULDUU')).to.equal('2')
  });
  it('should return 5B for UU\nLDRRD', () => {
    expect(findCode('UU\nLDRRD')).to.equal('5B');
  });
})
