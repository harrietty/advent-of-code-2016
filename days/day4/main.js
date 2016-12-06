import _ from 'underscore';

export function checkValidRoom (room) {
  let checksum = room.slice(room.length - 6, room.length - 1);

  let validChecksum = _.chain(room.split(''))
    .slice(0, room.length - 11)
    .filter(char => char !== '-')
    .reduce((freq, char) => {
      if (freq[char]) freq[char]++;
      else freq[char] = 1;
      return freq;
    }, {})
    .map((freq, char) => {
      return {char, freq};
    })
    .sort((a, b) => {
      if (a.freq > b.freq) return -1;
      else if (a.freq < b.freq) return 1;
      else if (a.freq === b.freq && a.char < b.char) return -1;
      else return 1;
    })
    .slice(0, 5)
    .reduce((str, obj) => str + obj.char, '')
    .value();

  return validChecksum === checksum;
}

export function countValidIds (list) {
  list = list.trim().split('\n');
  return list.reduce((total, room) => {
    if (checkValidRoom(room)) {
      total += +room.slice(room.length - 10, room.length - 7);
    }
    return total;
  }, 0);
}

export function shiftBy (char, num) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let i = letters.indexOf(char);
  let newi = ((i + num) % letters.length);
  return letters[newi];
}

export function shiftLetters (str, num) {
  return str.split('')
    .map(char => {
      if (char === '-') return ' ';
      else return shiftBy(char, num);
    })
    .join('');
}

export function getSecretId (rooms) {
  rooms = rooms.split('\n')
    .map(room => {
      let shiftBy = +room.slice(room.length - 10, room.length - 7);
      let str = room.slice(0, room.length - 11);
      return {
        secret: shiftLetters(str, shiftBy),
        ID: shiftBy
      };
    });
  return rooms.filter(room => {
    return room.secret.indexOf('pole') > -1 || room.secret.indexOf('north') > -1;
  })[0].ID;
}
