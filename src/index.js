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
  orthViewVolume,
} from "./scripts/camera";
import { getCubeFaces, getFaceCenterPoint } from "./scripts/cube";

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

const renderFace = (
  [xa, ya],
  [xb, yb],
  [xc, yc],
  [xd, yd],
  color = "white"
) => {
  ctx.beginPath();
  ctx.moveTo(xa, ya);
  ctx.lineTo(xb, yb);
  ctx.lineTo(xc, yc);
  ctx.lineTo(xd, yd);
  ctx.fillStyle = color;
  ctx.fill();
};

let faces = [
  ...getCubeFaces(2, [-2, 0, -11]),
  ...getCubeFaces(2, [-2, 0, -14]),
  ...getCubeFaces(2, [2, 0, -11]),
  ...getCubeFaces(2, [2, 0, -14]),
];

const Mper = mper(orthViewVolume);

const len = ([x, y, z]) => Math.sqrt(x * x + y * y + z * z);

const render = () => {
  const Mvp = mvp();
  const M = multiply(Mvp, Mper);
  faces = faces.sort((a, b) => {
    const ap = getFaceCenterPoint(a.face);
    const bp = getFaceCenterPoint(b.face);
    return len(ap) > len(bp) ? -1 : 1;
  });
  faces.forEach(({ face, color }) => {
    const [xa, ya, , wa] = multiply(M, face[0]);
    const [xb, yb, , wb] = multiply(M, face[1]);
    const [xc, yc, , wc] = multiply(M, face[2]);
    const [xd, yd, , wd] = multiply(M, face[3]);
    renderFace(
      [xa / wa, ya / wa],
      [xb / wb, yb / wb],
      [xc / wc, yc / wc],
      [xd / wd, yd / wd],
      color
    );
  });
};

const transform = (M) => {
  ctx.clearRect(0, 0, getWidth(), getHeight());

  for (let i = 0; i < faces.length; i++)
    faces[i].face = faces[i].face.map((x) => multiply(M, x));

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
