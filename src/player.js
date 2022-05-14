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

		this.playerAnimationTimerDefault = 10;
		this.playerAnimationTimer = null;

		this.takeSwordSound = new Audio('../sounds/takeSword.mp3');

		document.addEventListener('keydown', this.#keydown);

		this.#loadPlayerImages();
	}

	draw(ctx) {
		this.#move();
		this.#animate();
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
		playerImage1.src = './images/player1unarmed.jpg';

		const playerImage2 = new Image();
		playerImage2.src = './images/player2unarmed.jpg';

		const playerImage3 = new Image();
		playerImage3.src = './images/player3unarmed.jpg';

		const playerImage4 = new Image();
		playerImage4.src = './images/player1unarmed.jpg';

		this.playerImages = [
			playerImage1,
			playerImage2,
			playerImage3,
			playerImage4,
		];

		this.playerImageIndex = 0;
	}

	// #keydown = (event) => {
	// 	//up
	// 	if (event.keyCode == 38) {
	// 		if (this.currentMoveDirection == moveDirection.down) {
	// 			console.log('Up1');
	// 			this.currentMoveDirection = moveDirection.up;
	// 		} else {
	// 			console.log('Up2');
	// 			this.requestedMoveDirection = moveDirection.up;
	// 		}
	// 	}
	// 	//down
	// 	if (event.keyCode == 40) {
	// 		if (this.currentMoveDirection == moveDirection.up) {
	// 			console.log('Down1');
	// 			this.currentMoveDirection = moveDirection.down;
	// 		} else {
	// 			console.log('Down2');
	// 			this.requestedMoveDirection == moveDirection.down;
	// 		}
	// 	}
	// 	//left
	// 	if (event.keyCode == 37) {
	// 		if (this.currentMoveDirection == moveDirection.right) {
	// 			console.log('Left1');
	// 			this.currentMoveDirection = moveDirection.left;
	// 		} else {
	// 			console.log('Left2');
	// 			this.requestedMoveDirection = moveDirection.left;
	// 		}
	// 	}
	// 	//right

	// 	if (event.keyCode == 39) {
	// 		if (this.currentMoveDirection == moveDirection.left) {
	// 			console.log('Right1');
	// 			this.currentMoveDirection = moveDirection.right;
	// 		} else {
	// 			console.log('Right2');
	// 			this.requestedMoveDirection = moveDirection.right;
	// 		}
	// 	}
	// };

	#keydown = (event) => {
		//up
		if (event.keyCode == 38) {
			if (this.currentMoveDirection == moveDirection.down)
				this.currentMoveDirection = moveDirection.up;
			this.requestedMoveDirection = moveDirection.up;
		}
		//down
		if (event.keyCode == 40) {
			if (this.currentMoveDirection == moveDirection.up)
				this.currentMoveDirection = moveDirection.down;
			this.requestedMoveDirection = moveDirection.down;
		}
		//left
		if (event.keyCode == 37) {
			if (this.currentMoveDirection == moveDirection.right)
				this.currentMoveDirection = moveDirection.left;
			this.requestedMoveDirection = moveDirection.left;
		}
		//right
		if (event.keyCode == 39) {
			if (this.currentMoveDirection == moveDirection.left)
				this.currentMoveDirection = moveDirection.right;
			this.requestedMoveDirection = moveDirection.right;
		}
	};

	#move() {
		if (this.currentMoveDirection !== this.requestedMoveDirection) {
			if (
				Number.isInteger(this.x / this.tileSize) &&
				Number.isInteger(this.y / this.tileSize)
			) {
				if (
					!this.tileMap.collidedWithEnvironment(
						this.x,
						this.y,
						this.requestedMoveDirection
					)
				)
					this.currentMoveDirection = this.requestedMoveDirection;
			}
		}
		if (
			this.tileMap.collidedWithEnvironment(
				this.x,
				this.y,
				this.currentMoveDirection
			)
		) {
			this.playerAnimationTimer = null;
			this.playerImageIndex = 1;
			return;
		} else if (
			this.currentMoveDirection !== null &&
			this.playerAnimationTimer == null
		) {
			this.playerAnimationTimer = this.playerAnimationTimerDefault;
		}
		switch (this.currentMoveDirection) {
			case moveDirection.up:
				console.log('move is working up');
				this.y -= this.velocity;
				break;
			case moveDirection.down:
				console.log('move is working down');
				this.y += this.velocity;
				break;
			case moveDirection.left:
				console.log('move is working left');
				this.x -= this.velocity;
				break;
			case moveDirection.right:
				console.log('move is working right');
				this.x += this.velocity;
				break;
		}
	}

	#animate() {
		if (this.playerAnimationTimer == null) {
			return;
		}
		this.playerAnimationTimer--;
		if (this.playerAnimationTimer == 0) {
			this.playerAnimationTimer = this.playerAnimationTimerDefault;
			this.playerImageIndex++;
			if (this.playerImageIndex == this.playerImages.length) {
				this.playerImageIndex = 0;
			}
		}
	}

	// #takeSword() {
	// 	if (this.tileMap.takeSword(this.x, this.y)) {
	// 		this.takeSwordSound.play();
	// 	}
	// }
}
