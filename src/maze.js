import TileMap from './tilemap.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileSize = 32;
const velocity = 2;

const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

const playerDeathSound = new Audio('../sounds/playerDeath.mp3');
const gameOverSound = new Audio('../sounds/gameOver.mp3');
const gameWinSound = new Audio('../sounds/gameWin.mp3');

function gameLoop() {
	tileMap.draw(canvas, ctx);
	player.draw(ctx, pause(), enemies);

	enemies.forEach((enemy) => enemy.draw(ctx, pause()));

	checkGameOver();
	checkGameWin();
}

function resetGame() {
	//sorry simon
	location.reload();

	gameLoop();
}

function playAgain() {
	let playAgainPrompt = document.getElementById('playAgain');
	playAgainPrompt.style.display = 'block';
	playAgainPrompt.addEventListener('click', resetGame);
}

function checkGameWin() {
	if (!gameWin) {
		gameWin = player.escapedMaze;
		if (gameWin) {
			gameWinSound.play();
			playAgain();
		}
	}
}

function checkGameOver() {
	if (!gameOver) {
		gameOver = isGameOver();
		if (gameOver) {
			playerDeathSound.play();
			document.getElementById('instructions').innerHTML = '';
			document.getElementById('display').innerHTML =
				'You were eaten by the Snakemen.';
			document.getElementById('display2').innerHTML =
				'You suffer massive damage, mostly emotional.';
			setTimeout(() => {
				gameOverSound.play();
				playAgain();
			}, 1000);
		}
	}
}

function isGameOver() {
	return enemies.some(
		(enemy) => !player.takeSwordActive && enemy.collideWith(player)
	);
}

function pause() {
	return !player.madeFirstMove || gameOver || gameWin;
}

function drawGameOver() {
	if (gameOver || gameWin) {
		let text = 'You Win';
	}
}

setInterval(gameLoop, 1000 / 75);
