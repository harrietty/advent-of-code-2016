function copy (arr) {
  return arr.map(subarr => {
    return [].concat(subarr);
  });
}

export function makeRect (display, A, B) {
  display = copy(display);
  for (var i = 0; i < B; i++) {
    for (var j = 0; j < A; j++) {
      display[i][j] = 1;
    }
  }
  return display;
}

export function rotateRow (display, row, num) {
  display = copy(display);
  display[row] = rotate(display[row], num);
  return display;
}

export function rotateCol (display, col, num) {
  display = copy(display);
  var rotated = display.map(row => row[col]);
  rotated = rotate(rotated, num);
  display = display.map((row, i) => {
    row[col] = rotated[i];
    return row;
  });
  return display;
}

export function processScreen (display, instructions) {
  instructions = instructions.split('\n');
  instructions.forEach(line => {
    if (line.indexOf('rect') > -1) {
      let coords = line.slice(5).split('x');
      display = makeRect(display, +coords[0], +coords[1]);
    } else if (line.indexOf('row') > -1) {
      let coords = line.slice(13).split(' by ');
      display = rotateRow(display, +coords[0], +coords[1]);
    } else if (line.indexOf('column') > -1) {
      let coords = line.slice(16).split(' by ');
      display = rotateCol(display, +coords[0], +coords[1]);
    }
  });
  return display;
}

export function stringifyCode (display) {
  var str = '';
  display.forEach(line => {
    line = line.map(elem => {
      if (elem === 0) return elem;
      else return 'X';
    });
    str += line.join(' ') + '\n';
  });
  return str;
}

export function countPixels (arr) {
  let counter = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j]) counter++;
    }
  }
  return counter;
}

function rotate (arr, num) {
  var counter = 0;
  while (counter < num) {
    var end = arr[arr.length - 1];
    arr.pop();
    arr.unshift(end);
    counter++;
  }
  return arr;
}
