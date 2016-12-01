function findShortestRoute (data, giveRepeated) {
  data = data.split(', ');

  const cache = {};

  function inCache (obj) {
    obj = JSON.stringify(obj);
    return cache[obj];
  }

  function putInCache (obj) {
    var str = JSON.stringify(obj);
    cache[str] = Math.abs(coords.x) + Math.abs(coords.y);
  }

  function updateCoords (coord, sign, dist) {
    dist = +dist;
    for (var i = 0; i < dist; i++) {
      if (sign === '+') coords[coord] += 1;
      if (sign === '-') coords[coord] -= 1;
      if (giveRepeated) {
        if (inCache(coords)) {
          return cache[JSON.stringify(coords)];
        }
        else putInCache(coords);
      }
    }
  }

  let orientation = 'N';
  const movements = {
    NR: 'E',
    NL: 'W',
    ER: 'S',
    EL: 'N',
    SR: 'W',
    SL: 'E',
    WR: 'N',
    WL: 'S'
  };

  let coords = {
    x: 0,
    y: 0
  };

  let move, res;
  for (var i = 0; i < data.length; i++) {
    move = data[i];
    const dir = move[0];
    const dist = move.slice(1);

    orientation = movements[orientation + dir];

    if (orientation === 'N') {
      res = updateCoords('y', '+', dist);
      if (res) return res;
    }

    else if (orientation === 'S') {
      res = updateCoords('y', '-', dist);
      if (res) return res;
    }

    else if (orientation === 'E') {
      res = updateCoords('x', '+', dist);
      if (res) return res;
    }

    else if (orientation === 'W') {
      res = updateCoords('x', '-', dist);
      if (res) return res;
    }
  }

  const result = Math.abs(coords.x) + Math.abs(coords.y);
  return result;
}

export default findShortestRoute;
