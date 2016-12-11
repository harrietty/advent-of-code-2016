import _ from 'underscore'

export function splitCols (txt) {
  return _.chain(txt.trim().split('\n'))
    .map(chars => chars.split(''))
    .unzip()
    .value();
}

export function getMessage (text, mostCommon) {
  return splitCols(text).reduce((memo, col) => {
    return memo += getCharFromCol(col, mostCommon);
  }, '');
}

export function getCharFromCol (arr, mostCommon) {
  let res = _.chain(arr)
    .reduce((freq, char) => {
      if (freq[char]) freq[char]++;
      else freq[char] = 1;
      return freq;
    }, {})
    .map((freq, char) => {
      return {freq, char}
    })
    .sortBy('freq')
    .value();

  if (mostCommon) res = res.reverse();

  return _.first(res).char;
}
