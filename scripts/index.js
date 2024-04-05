"use strict";

import ContentManager from "./contentManager.js";
import { clearContext } from "./graphics.js";

const tilesetCanvas = document.getElementById("tileset-canvas");
const tilesetCtx = tilesetCanvas.getContext("2d");
const mapCanvas = document.getElementById("map-canvas");
const mapCtx = mapCanvas.getContext("2d");
const mapArrayTextarea = document.getElementById("map-array-textarea");
const content = new ContentManager();
let tileset = null;
let tilesize = 16;

const setupCanvas = (canvas) => {
  canvas.oncontextmenu = (e) => {
    e.preventDefault();
  };

  const context = canvas.getContext("2d");
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

  context.imageSmoothingEnabled = false;

  clearContext(context, canvas);
};

const setTileset = () => {
  tileset = content.getAssetByName("town_tiles");
};

const drawTileset = () => {
  tilesetCtx.drawImage(tileset, 0, 0, tileset.width * 2, tileset.height * 2);
};

function initialize() {
  setupCanvas(tilesetCanvas);
  setupCanvas(mapCanvas);
  setTileset();
  drawTileset();
}

const loadContent = () => {
  content.onFinishedLoading = () => {
    initialize();
  };
  content.loadContent();
};

window.onload = () => {
  loadContent();
};
