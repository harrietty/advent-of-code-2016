import _ from 'underscore';

export function countPossibleTris (triangles, cols) {
  triangles = cols ? parseByCol(triangles) : parseByRow(triangles);

  return triangles.reduce((counter, triangle) => {
    triangle = triangle.sort((a, b) => a - b);
    if (triangle[0] + triangle[1] > triangle[2]) {
      counter++;
    }
    return counter;
  }, 0);
}

function parseByRow (tris) {
  return tris.trim()
    .split('\n')
    .map(tri => tri.trim().split(/\s+/g).map(side => +side));
}

function parseByCol (tris) {
  tris = _.chain(parseByRow(tris))
    .flatten()
    .value();

  let grouped = [];
  while (tris.length > 0) {
    grouped.push(tris.splice(0, 9));
  }

  return _.chain(grouped)
    .reduce((memo, group) => {
    var tris = [0, 1, 2].map(i => {
      return [group[i], group[i + 3], group[i + 6]];
    });
    memo.push(tris);
    return memo;
  }, [])
    .flatten(true)
    .value();
}
