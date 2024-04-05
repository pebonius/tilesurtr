"use strict";

const tilesetCanvas = document.getElementById("tileset-canvas");
const tilesetCtx = tilesetCanvas.getContext("2d");
const mapCanvas = document.getElementById("map-canvas");
const mapCtx = mapCanvas.getContext("2d");
const mapArrayTextarea = document.getElementById("map-array-textarea");
const defaultFont = "Courier New";

const drawText = (context, text, fontSize, color, posX, posY) => {
  context.font = fontSize + "px " + defaultFont;
  context.fillStyle = color;
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText(text, posX, posY);
};

const clearContext = (canvas) => {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#000";
  context.fill();
};

const setupCanvas = (canvas) => {
  canvas.oncontextmenu = (e) => {
    e.preventDefault();
  };

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const aspectRatio = 3 / 4;

  if (windowWidth * aspectRatio < windowHeight) {
    canvas.width = window.innerWidth;
    canvas.height = canvas.width * aspectRatio;
  } else {
    canvas.height = windowHeight;
    canvas.width = canvas.height / aspectRatio;
  }

  canvas.getContext("2d").imageSmoothingEnabled = false;

  clearContext(canvas);
};

function main() {
  setupCanvas(tilesetCanvas);
  setupCanvas(mapCanvas);
}

window.onload = () => {
  main();
};
