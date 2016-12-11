import _ from 'underscore';

export function containsABBA (str) {
  let arr = str.split('');
  let res = false;

  let isInArr, two, next;
  arr.forEach((char, i) => {
    if (char !== str[i + 1]) {
      two = char + str[i + 1];
      next = str[i + 3] + str[i + 2]
      isInArr = two === next;
      if (isInArr) res = true;
    }
  });

  return res;
}

export function containsABA (str) {
  let arr = str.split('');
  let res = false;

  arr.forEach((char, i) => {
    if (char === str[i + 2] && char !== str[i + 1]) res = true;
  });

  return res;
}

export function getBABStrings (str) {
  let arr = str.split('');
  let res = [];

  arr.forEach((char, i) => {
    if (char === str[i + 2] && char !== str[i + 1]) res.push(str[i + 1] + char + str[i + 1]);
  });
  return res;
}

export function extractStringSections (str) {
  str = str.split(/\[[\w]+\]/g);
  return str;
}

export function extractBracketSections (str) {
  var sections = str.match(/\[[\w]+\]/g)
    .map(br => br.slice(1, br.length - 1));
  return sections;
}

export function containsABab (str, babs) {
  var res = false;
  babs.forEach((BAB) => {
    if (str.indexOf(BAB) !== -1) res = true;
  });
  return res;
}

export function countIPs (list, part2) {
  return list.trim()
    .split('\n')
    .map(IP => {
      let strings = extractStringSections(IP);
      let brackets = extractBracketSections(IP);
      let BABstrings = [];
      // Find the BAB strings you're looking for
      strings.forEach(str => {
        BABstrings.push(getBABStrings(str));
      });
      BABstrings = _.flatten(BABstrings);

      // For each BAB string see if it exists in any of the bracketed sections
      var res = _.some(brackets, (str) => {
        if (containsABab(str, BABstrings)) return true;
      });

      return part2 ? res : {
        strings: _.some(extractStringSections(IP), containsABBA),
        brackets: !_.some(extractBracketSections(IP), containsABBA)
      };
    })
    .filter(IP => {
      return part2 ? IP : IP.strings && IP.brackets;
    });
}
