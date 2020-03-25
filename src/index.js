const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const getHeight = () => window.innerHeight;
const getWidth = () => window.innerWidth;

const setCanvasDimensions = () => {
    canvas.width = getWidth();
    canvas.height = getHeight();
};

window.addEventListener("resize", setCanvasDimensions);
setCanvasDimensions();



const MODEL_MAX_X = 2, MODEL_MIN_X = -2;
const MODEL_MAX_Y = 2, MODEL_MIN_Y = -2;

const perspectiveProjection = ([x, y, z]) => [
    x / (z+4),
    y / (z+4)
];

const project = point => {
    const [x, y] = perspectiveProjection(point);
    return [
        getWidth() * (x - MODEL_MIN_X) / (MODEL_MAX_X - MODEL_MIN_X),
        getHeight() * (1 - (y - MODEL_MIN_Y) / (MODEL_MAX_Y - MODEL_MIN_Y))
    ];
}

const renderPoint = point => {
    const [x, y] = project(point);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+1, y+1);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.stroke();
};

let points = [];
for (let x=-1; x<=1; x+=0.5)
    for (let y=-1; y<=1; y+=0.5)
        for (let z=-1; z<=1; z+=0.5)
            points.push([x, y, z]);

const rotateY = ([x, y, z], theta) => [
    Math.cos(theta) * x - Math.sin(theta) * z,
    y,
    Math.sin(theta) * x + Math.cos(theta) * z
];

const rotateX = ([x, y, z], theta) => [
    x,
    
];

let theta = 0.1;
const dtheta = 0.02;

const render = () => {
    ctx.clearRect(0, 0, getWidth(), getHeight());
    theta += dtheta;
    points.forEach(point => {
        point = rotateY(point, theta);
        renderPoint(point);
    });
    requestAnimationFrame(render);
};

render();