import crypto from 'crypto';

export function makeHash (data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

export function beginsWithZeroes (hash) {
  return hash.slice(0, 5) === '00000';
}

export function getPassword (doorId) {
  let password = [null, null, null, null, null, null, null, null];

  let counter = 0;
  let str, hash;
  while (password.indexOf(null) > -1) {
    str = doorId + counter;
    hash = makeHash(str);
    if (beginsWithZeroes(hash)) {
      if (Number.isInteger(+hash[5]) && password[+hash[5]] === null) {
        console.log(password)
        password[+hash[5]] = hash[6];
      }
    }
    counter++;
  }

  return password.join('');
}
