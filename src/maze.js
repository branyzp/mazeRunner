import TileMap from './tilemap.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileSize = 64;
const velocity = 4;

const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio('../sounds/gameOver.mp3');
const gameWinSound = new Audio('../sounds/gameWin.mp3');

function gameLoop() {
	tileMap.draw(canvas, ctx);
	player.draw(ctx, pause(), enemies);

	enemies.forEach((enemy) => enemy.draw(ctx, pause()));

	checkGameOver();
	checkGameWin();
}

function checkGameWin() {
	if (!gameWin) {
		gameWin = player.escapedMaze;
		if (gameWin) {
			gameWinSound.play();
			console.log('Yay');
		}
	}
}

function checkGameOver() {
	if (!gameOver) {
		gameOver = isGameOver();
		if (gameOver) {
			gameOverSound.play();
		}
	}
}

function isGameOver() {
	return enemies.some(
		(enemy) => !player.takeSwordActive && enemy.collideWith(player)
	);
}

function pause() {
	return !player.madeFirstMove || gameOver;
}

setInterval(gameLoop, 1000 / 75);
