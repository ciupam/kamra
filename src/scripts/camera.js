import { sin, cos, getWindowSize, getWidth, getHeight } from "./util";

export const mtrans = (x, y, z) => [
  [1, 0, 0, x],
  [0, 1, 0, y],
  [0, 0, 1, z],
  [0, 0, 0, 1],
];

export const mrotateX = (x) => [
  [1, 0, 0, 0],
  [0, cos(x), sin(x), 0],
  [0, -sin(x), cos(x), 0],
  [0, 0, 0, 1],
];

export const mrotateY = (x) => [
  [cos(x), 0, -sin(x), 0],
  [0, 1, 0, 0],
  [sin(x), 0, cos(x), 0],
  [0, 0, 0, 1],
];

export const mrotateZ = (x) => [
  [cos(x), sin(x), 0, 0],
  [-sin(x), cos(x), 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

export const mzoom = (s) => [
  [s, 0, 0, 0],
  [0, s, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

// viewport transformation matrix
export const mvp = () => {
  const [nx, ny] = getWindowSize();
  return [
    [nx / 2, 0, 0, (nx - 1) / 2],
    [0, ny / 2, 0, (ny - 1) / 2],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};

// perspective to cannonical view volume (matrix)
export const mper = ({ l, r, b, t, n, f }) => [
  [(2 * n) / (r - l), 0, (l + r) / (l - r), 0],
  [0, (2 * n) / (t - b), (b + t) / (b - t), 0],
  [0, 0, (f + n) / (n - f), (2 * f * n) / (f - n)],
  [0, 0, 1, 0],
];

// orthocraphic view volume based on camera coord system
export const orthViewVolume = {
  l: -getWidth() / 2, // left
  r: getWidth() / 2, // right
  b: -getHeight() / 2, // bottom
  t: getHeight() / 2, // top
  n: -900, // near,
  f: -1000, // far
};

// orthographic to canonical view volume (matrix)
export const morth = ({ l, r, b, t, n, f }) => [
  [2 / (r - l), 0, 0, (r + l) / (l - r)],
  [0, 2 / (t - b), 0, (t + b) / (b - t)],
  [0, 0, 2 / (n - f), (n + f) / (f - n)],
  [0, 0, 0, 1],
];
