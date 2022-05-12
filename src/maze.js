import TileMap from './tilemap.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileSize = 64;
const velocity = 1;

const tileMap = new TileMap(tileSize);
// const warrior = tileMap.getWarrior(velocity);

function gameLoop() {
	tileMap.draw(canvas, ctx);
}

setInterval(gameLoop, 1000 / 60);
