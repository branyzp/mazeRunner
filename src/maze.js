import TileMap from './tilemap.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileSize = 64;
const velocity = 4;

const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);

function gameLoop() {
	tileMap.draw(canvas, ctx);
	player.draw(ctx);

	enemies.forEach((enemy) => enemy.draw(ctx));
}

setInterval(gameLoop, 1000 / 75);
