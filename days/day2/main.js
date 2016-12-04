const keypad = [
  [null, null, '1', null, null],
  [null, '2', '3', '4', null],
  ['5', '6', '7', '8', '9'],
  [null, 'A', 'B', 'C', null],
  [null, null, 'D', null, null]
];

export function findCode (moves) {
  moves = moves.split('\n');
  moves = moves.map(move => {
    return move.split('');
  });

  let res = '';

  let pos = new Position(2, 0);

  moves.forEach(elem => {
    elem.forEach((move, i) => {
      pos[move]();
      if (i === elem.length - 1) {
        res += keypad[pos.pos[0]][pos.pos[1]];
      }
    });
  });

  return res;
}

export function Position (row, col) {
  this.max = 4;
  this.min = 0;

  this.pos = [row, col];

  this.U = function () {
    if (this.pos[0] > this.min && keypad[this.pos[0] - 1][this.pos[1]]) {
      this.pos[0] = this.pos[0] - 1;
    }
  }

  this.D = function () {
    if (this.pos[0] < this.max && keypad[this.pos[0] + 1][this.pos[1]]) {
      this.pos[0] = this.pos[0] + 1;
    }
  }

  this.L = function () {
    if (this.pos[1] > this.min && keypad[this.pos[0]][this.pos[1] - 1]) {
      this.pos[1] = this.pos[1] - 1;
    }
  }

  this.R = function () {
    if (this.pos[1] < this.max && keypad[this.pos[0]][this.pos[1] + 1]) {
      this.pos[1] = this.pos[1] + 1;
    }
  }
}

export default findCode;
