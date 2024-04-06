"use strict";

import ContentManager from "./contentManager.js";
import Debug from "./debug.js";
import { clearContext } from "./graphics.js";
import Point from "./point.js";

const tilesetCanvas = document.getElementById("tileset-canvas");
const tilesetCtx = tilesetCanvas.getContext("2d");
const mapCanvas = document.getElementById("map-canvas");
const mapCtx = mapCanvas.getContext("2d");
const mapArrayTextarea = document.getElementById("map-array-textarea");
const content = new ContentManager();
let tileset = null;
let tileSize = 16;
let zoom = 4;
let selectedTile = null;

const setupCanvas = (canvas) => {
  canvas.oncontextmenu = (e) => {
    e.preventDefault();
  };

  const context = canvas.getContext("2d");

  context.imageSmoothingEnabled = false;

  clearContext(context, canvas);
};

const setTileset = () => {
  tileset = content.getAssetByName("town_tiles");
};

const drawTileset = () => {
  tilesetCtx.drawImage(
    tileset,
    0,
    0,
    tileset.width * zoom,
    tileset.height * zoom
  );
};

const pointerPosition = (e, canvas) => {
  const rect = canvas.getBoundingClientRect();
  return new Point(e.clientX - rect.left, e.clientY - rect.top);
};

const translatedPointerPosition = (pos) => {
  return new Point(pos.x / zoom, pos.y / zoom);
};

const tilesetWidthInTiles = () => {
  return Math.ceil(tileset.width / tileSize);
};

const tilesetHeightInTiles = () => {
  return Math.ceil(tileset.height / tileSize);
};

const selectTile = (pos) => {
  if (pos.x > tileset.width) {
    Debug.log(`pointer outside of tileset (tileset width is ${tileset.width})`);
    return;
  }
  if (pos.y > tileset.height) {
    Debug.log(
      `pointer outside of tileset (tileset height is ${tileset.height})`
    );
    return;
  }

  const col = Math.ceil(pos.x / tileSize) - 1;
  const row = Math.ceil(pos.y / tileSize) - 1;

  Debug.log(`selecting tile at ${col}, ${row}`);

  selectedTile = row * tilesetWidthInTiles() + col;

  Debug.log(`selected tile ${selectedTile}`);
};

const highlightSelectedTile = () => {
  clearContext(tilesetCtx, tilesetCanvas);
  drawTileset();

  const row = Math.floor(selectedTile / tilesetWidthInTiles());
  const col = selectedTile - row * tilesetWidthInTiles();

  Debug.log(`highlighting tile at ${row}, ${col}`);

  const highlightPosX = col * tileSize * zoom;
  const highlightPosY = row * tileSize * zoom;

  tilesetCtx.strokeStyle = "magenta";
  tilesetCtx.strokeRect(
    highlightPosX,
    highlightPosY,
    tileSize * zoom,
    tileSize * zoom
  );
};

const setTilesetPointerEvent = () => {
  tilesetCanvas.onpointerdown = (e) => {
    const pos = pointerPosition(e, tilesetCanvas);

    Debug.log(`pointer down on tileset canvas at pos ${pos.x}, ${pos.y}`);

    const translatedPos = translatedPointerPosition(pos);

    selectTile(translatedPos);
    highlightSelectedTile();
  };
};

function initialize() {
  setupCanvas(tilesetCanvas);
  setupCanvas(mapCanvas);
  setTileset();
  drawTileset();
  setTilesetPointerEvent();
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
