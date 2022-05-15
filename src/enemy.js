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
		this.directionTimer = this.directionTimerDefault;
	}

	draw(ctx, pause) {
		if (!pause) {
			this.#move();
			this.#changeDirection();
		}
		ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
	}

	collideWith(player) {
		const size = this.tileSize / 2;
		if (
			this.x < player.x + size &&
			this.x + size > player.x &&
			this.y < player.y + size &&
			this.y + size > player.y
		) {
			return true;
		} else {
			return false;
		}
	}

	#changeDirection() {
		this.directionTimer--;
		let newMoveDirection = null;
		if (this.directionTimer == 0) {
			this.directionTimer = this.directionTimerDefault;
			newMoveDirection = Math.floor(
				Math.random() * Object.keys(moveDirection).length
			);
		}
		if (newMoveDirection != null && this.moveDirection != newMoveDirection) {
			if (
				Number.isInteger(this.x / this.tileSize) &&
				Number.isInteger(this.y / this.tileSize)
			) {
				if (
					!this.tileMap.collidedWithEnvironment(
						this.x,
						this.y,
						newMoveDirection
					)
				) {
					this.moveDirection = newMoveDirection;
				}
			}
		}
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
