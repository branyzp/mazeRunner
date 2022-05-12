import moveDirection from './moveDirection.js';

export default class Player {
	constructor(x, y, tileSize, velocity, tileMap) {
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.velocity = velocity;
		this.tileMap = tileMap;

		this.currentMoveDirection = null;
		this.requestedMoveDirection = null;

		document.addEventListener('keydown', this.#keydown);

		this.#loadPlayerImages();
	}

	draw(ctx) {
		this.#move();
		ctx.drawImage(
			this.playerImages[this.playerImageIndex],
			this.x,
			this.y,
			this.tileSize,
			this.tileSize
		);
	}

	#loadPlayerImages() {
		const playerImage1 = new Image();
		playerImage1.src = './images/player1.jpg';

		const playerImage2 = new Image();
		playerImage2.src = './images/playerRight.jpg';

		const playerImage3 = new Image();
		playerImage3.src = './images/playerLeft.png';

		const playerImage4 = new Image();
		playerImage4.src = './images/playerUp.jpg';

		this.playerImages = [
			playerImage1,
			playerImage2,
			playerImage3,
			playerImage4,
		];

		this.playerImageIndex = 0;
	}

	#keydown = (event) => {
		//up
		if (event.keyCode == 38) {
			if (this.currentMoveDirection == moveDirection.down) {
				console.log('Up');
				this.currentMoveDirection == moveDirection.up;
			} else {
				console.log('Up');
				this.requestedMoveDirection == moveDirection.up;
			}
		}
		//down
		if (event.keyCode == 40) {
			if (this.currentMoveDirection == moveDirection.up) {
				console.log('Down');
				this.currentMoveDirection == moveDirection.down;
			} else {
				console.log('Down');
				this.requestedMoveDirection == moveDirection.down;
			}
		}
		//left
		if (event.keyCode == 37) {
			if (this.currentMoveDirection == moveDirection.right) {
				console.log('Left');
				this.currentMoveDirection == moveDirection.left;
			} else {
				console.log('Left');
				this.requestedMoveDirection == moveDirection.left;
			}
		}
		//right

		if (event.keycode == 39) {
			if (this.currentMoveDirection == moveDirection.left) {
				console.log('Right');
				this.currentMoveDirection == moveDirection.right;
			} else {
				console.log('Right');
				this.requestedMoveDirection == moveDirection.right;
			}
		}
	};

	#move() {
		if (this.currentMoveDirection !== this.requestedMoveDirection) {
			if (
				Number.isInteger(this.x / this.tileSize) &&
				Number.isInteger(this.y / this.tileSize)
			) {
				this.currentMoveDirection = this.requestedMoveDirection;
			}
		}
		switch (this.currentMoveDirection) {
			case moveDirection.up:
				this.y -= this.velocity;
				break;
			case moveDirection.down:
				this.y += this.velocity;
				break;
		}
	}
}
