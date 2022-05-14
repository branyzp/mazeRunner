import moveDirection from './moveDirection.js';

export default class Enemy {
	constructor(x, y, tileSize, velocity, tileMap) {
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.velocity = velocity;
		this.tileMap = tileMap;

		this.#loadImages();
		this.moveDirection = Math.floor(
			Math.random() * Object.keys(moveDirection).length
		);

		this.directionTimerDefault = this.#random(10, 50);
	}

	draw(ctx) {
		this.#move();
		ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
	}

	#move() {
		if (
			!this.tileMap.collidedWithEnvironment(this.x, this.y, this.moveDirection)
		) {
			switch (this.moveDirection) {
				case moveDirection.up:
					this.y -= this.velocity;
					break;
				case moveDirection.down:
					this.y += this.velocity;
					break;
				case moveDirection.left:
					this.x -= this.velocity;
					break;
				case moveDirection.right:
					this.x += this.velocity;
					break;
			}
		}
	}

	#random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	#loadImages() {
		this.snakeEnemy = new Image();
		this.snakeEnemy.src = 'images/enemy.jpg';

		this.image = this.snakeEnemy;
	}
}
