import "./styles/index.css";
import { multiply } from "./scripts/matrix";
import { getHeight, getWidth } from "./scripts/util";
import {
  mrotateX,
  mrotateY,
  mrotateZ,
  mtrans,
  mzoom,
  mper,
  mvp,
  morth,
  orthViewVolume,
} from "./scripts/camera";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const setCanvasDimensions = () => {
  canvas.width = getWidth();
  canvas.height = getHeight();
};

window.addEventListener("resize", () => {
  setCanvasDimensions();
  render();
});
setCanvasDimensions();

const renderLine = ([xa, ya], [xb, yb]) => {
  ctx.beginPath();
  ctx.moveTo(xa, ya);
  ctx.lineTo(xb, yb);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.stroke();
};

// normalize
const cube = [
  [
    [-3, -1, -10, 1],
    [-1, -1, -10, 1],
  ],
  [
    [-3, -1, -10, 1],
    [-3, 1, -10, 1],
  ],
  [
    [-3, -1, -10, 1],
    [-3, -1, -12, 1],
  ],
  [
    [-1, -1, -10, 1],
    [-1, -1, -12, 1],
  ],
  [
    [-1, -1, -10, 1],
    [-1, 1, -10, 1],
  ], //
  [
    [-1, -1, -12, 1],
    [-3, -1, -12, 1],
  ],
  [
    [-1, -1, -12, 1],
    [-1, 1, -12, 1],
  ],
  [
    [-3, 1, -10, 1],
    [-1, 1, -10, 1],
  ], //
  [
    [-3, -1, -12, 1],
    [-3, 1, -12, 1],
  ],
  [
    [-3, 1, -10, 1],
    [-3, 1, -12, 1],
  ],
  [
    [-3, 1, -12, 1],
    [-1, 1, -12, 1],
  ],
  [
    [-1, 1, -12, 1],
    [-1, 1, -10, 1],
  ], //
  [
    [1, -1, -10, 1],
    [3, -1, -10, 1],
  ],
  [
    [1, -1, -10, 1],
    [1, 1, -10, 1],
  ],
  [
    [1, -1, -10, 1],
    [1, -1, -12, 1],
  ],
  [
    [3, -1, -10, 1],
    [3, -1, -12, 1],
  ],
  [
    [3, -1, -10, 1],
    [3, 1, -10, 1],
  ],
  [
    [3, -1, -12, 1],
    [1, -1, -12, 1],
  ],
  [
    [3, -1, -12, 1],
    [3, 1, -12, 1],
  ],
  [
    [1, 1, -10, 1],
    [3, 1, -10, 1],
  ],
  [
    [1, -1, -12, 1],
    [1, 1, -12, 1],
  ],
  [
    [1, 1, -10, 1],
    [1, 1, -12, 1],
  ],
  [
    [1, 1, -12, 1],
    [3, 1, -12, 1],
  ],
  [
    [3, 1, -12, 1],
    [3, 1, -10, 1],
  ], //
  [
    [-3, -1, -13, 1],
    [-1, -1, -13, 1],
  ],
  [
    [-3, -1, -13, 1],
    [-3, 1, -13, 1],
  ],
  [
    [-3, -1, -13, 1],
    [-3, -1, -15, 1],
  ],
  [
    [-1, -1, -13, 1],
    [-1, -1, -15, 1],
  ],
  [
    [-1, -1, -13, 1],
    [-1, 1, -13, 1],
  ],
  [
    [-1, -1, -15, 1],
    [-3, -1, -15, 1],
  ],
  [
    [-1, -1, -15, 1],
    [-1, 1, -15, 1],
  ],
  [
    [-3, 1, -13, 1],
    [-1, 1, -13, 1],
  ],
  [
    [-3, -1, -15, 1],
    [-3, 1, -15, 1],
  ],
  [
    [-3, 1, -13, 1],
    [-3, 1, -15, 1],
  ],
  [
    [-3, 1, -15, 1],
    [-1, 1, -15, 1],
  ],
  [
    [-1, 1, -15, 1],
    [-1, 1, -13, 1],
  ], //
  [
    [1, -1, -13, 1],
    [3, -1, -13, 1],
  ],
  [
    [1, -1, -13, 1],
    [1, 1, -13, 1],
  ],
  [
    [1, -1, -13, 1],
    [1, -1, -15, 1],
  ],
  [
    [3, -1, -13, 1],
    [3, -1, -15, 1],
  ],
  [
    [3, -1, -13, 1],
    [3, 1, -13, 1],
  ],
  [
    [3, -1, -15, 1],
    [1, -1, -15, 1],
  ],
  [
    [3, -1, -15, 1],
    [3, 1, -15, 1],
  ],
  [
    [1, 1, -13, 1],
    [3, 1, -13, 1],
  ],
  [
    [1, -1, -15, 1],
    [1, 1, -15, 1],
  ],
  [
    [1, 1, -13, 1],
    [1, 1, -15, 1],
  ],
  [
    [1, 1, -15, 1],
    [3, 1, -15, 1],
  ],
  [
    [3, 1, -15, 1],
    [3, 1, -13, 1],
  ], //
];

const Morth = morth(orthViewVolume);
const Mper = mper(orthViewVolume);

const render = () => {
  const Mvp = mvp();
  const M = multiply(Mvp, Mper);
  cube.forEach((v) => {
    const [xp, yp, zp, wp] = multiply(M, v[0]);
    const [xq, yq, zq, wq] = multiply(M, v[1]);
    renderLine([xp / wp, yp / wp], [xq / wq, yq / wq]);
  });
};

const transform = (M) => {
  ctx.clearRect(0, 0, getWidth(), getHeight());

  for (let i = 0; i < cube.length; i++) {
    cube[i][0] = multiply(M, cube[i][0]);
    cube[i][1] = multiply(M, cube[i][1]);
  }

  requestAnimationFrame(render);
};

window.addEventListener("keydown", (e) => {
  if (e.key.toUpperCase() === "A") transform(mtrans(1, 0, 0));
  else if (e.key.toUpperCase() === "D") transform(mtrans(-1, 0, 0));
  else if (e.key.toUpperCase() === "W") transform(mtrans(0, 1, 0));
  else if (e.key.toUpperCase() === "S") transform(mtrans(0, -1, 0));
  else if (e.key.toUpperCase() === "Q") transform(mzoom(2));
  else if (e.key.toUpperCase() === "E") transform(mzoom(0.5));
  else if (e.key.toUpperCase() === "X") transform(mrotateX(0.01));
  else if (e.key.toUpperCase() === "Y") transform(mrotateY(0.01));
  else if (e.key.toUpperCase() === "Z") transform(mrotateZ(0.01));
});

render();
