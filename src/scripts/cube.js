export const getCube = (edgeLen = 2, centrePoint = [1, 1, -12]) => {
  const [x, y, z] = centrePoint;
  const l = edgeLen / 2;
  const cube = [];
  cube.push([[], [], [], []]);
  return cube;
};
