export const getCubeFaces = (edgeLen = 2, centrePoint = [1, 1, -12]) => {
  const [x, y, z] = centrePoint;
  const l = edgeLen / 2;
  return [
    {
      color: "white",
      face: [
        [x + l, y + l, z + l, 1],
        [x + l, y - l, z + l, 1],
        [x - l, y - l, z + l, 1],
        [x - l, y + l, z + l, 1],
      ],
    },
    {
      color: "blue",
      face: [
        [x + l, y + l, z + l, 1],
        [x + l, y - l, z + l, 1],
        [x + l, y - l, z - l, 1],
        [x + l, y + l, z - l, 1],
      ],
    },
    {
      color: "red",
      face: [
        [x + l, y + l, z + l, 1],
        [x + l, y + l, z - l, 1],
        [x - l, y + l, z - l, 1],
        [x - l, y + l, z + l, 1],
      ],
    },
    {
      color: "yellow",
      face: [
        [x + l, y - l, z + l, 1],
        [x + l, y - l, z - l, 1],
        [x - l, y - l, z - l, 1],
        [x - l, y - l, z + l, 1],
      ],
    },
    {
      color: "green",
      face: [
        [x + l, y + l, z - l, 1],
        [x + l, y - l, z - l, 1],
        [x - l, y - l, z - l, 1],
        [x - l, y + l, z - l, 1],
      ],
    },
    {
      color: "pink",
      face: [
        [x - l, y + l, z + l, 1],
        [x - l, y - l, z + l, 1],
        [x - l, y - l, z - l, 1],
        [x - l, y + l, z - l, 1],
      ],
    },
  ];
};

export const getFaceCenterPoint = ([a, , c]) => [
  (a[0] + c[0]) / 2,
  (a[1] + c[1]) / 2,
  (a[2] + c[2]) / 2,
];
