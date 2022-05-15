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
		this.spartaSound = new Audio('../sounds/thisissparta.mp3');
		this.takeSwordActive = false;

		this.takeKeySound = new Audio('../sounds/keyPickup.mp3');
		this.keyTaken = false;

		this.unlockDoorSound = new Audio('../sounds/unlockDoor.mp3');

		this.killEnemySound = new Audio('../sounds/killEnemy.mp3');

		this.madeFirstMove = false;

		document.addEventListener('keydown', this.#keydown);

		this.#loadPlayerImages();
	}

	draw(ctx, pause, enemies) {
		if (!pause) {
			this.#move();
			this.#animate();
		}
		this.#openDoor();
		this.#takeSword();
		this.#takeKey();
		this.#killEnemy(enemies);
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

		const playerImage5 = new Image();
		playerImage5.src = './images/player1.jpg';

		const playerImage6 = new Image();
		playerImage6.src = './images/player2.jpg';

		const playerImage7 = new Image();
		playerImage7.src = './images/player3.jpg';

		const playerImage8 = new Image();
		playerImage8.src = './images/player1.jpg';

		if (this.takeSwordActive == true) {
			this.playerImages = [
				playerImage5,
				playerImage6,
				playerImage7,
				playerImage8,
			];
		} else {
			this.playerImages = [
				playerImage1,
				playerImage2,
				playerImage3,
				playerImage4,
			];
		}

		// this.playerImages = [
		// 	playerImage1,
		// 	playerImage2,
		// 	playerImage3,
		// 	playerImage4,
		// ];

		this.playerImageIndex = 0;
	}

	#keydown = (event) => {
		//up
		if (event.keyCode == 38) {
			if (this.currentMoveDirection == moveDirection.down)
				this.currentMoveDirection = moveDirection.up;
			this.requestedMoveDirection = moveDirection.up;
			this.madeFirstMove = true;
		}
		//down
		if (event.keyCode == 40) {
			if (this.currentMoveDirection == moveDirection.up)
				this.currentMoveDirection = moveDirection.down;
			this.requestedMoveDirection = moveDirection.down;
			this.madeFirstMove = true;
		}
		//left
		if (event.keyCode == 37) {
			if (this.currentMoveDirection == moveDirection.right)
				this.currentMoveDirection = moveDirection.left;
			this.requestedMoveDirection = moveDirection.left;
			this.madeFirstMove = true;
		}
		//right
		if (event.keyCode == 39) {
			if (this.currentMoveDirection == moveDirection.left)
				this.currentMoveDirection = moveDirection.right;
			this.requestedMoveDirection = moveDirection.right;
			this.madeFirstMove = true;
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

	//"character animation"

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

	//sword related

	#displaySwordExpireTime() {
		document.getElementById('instructions').innerHTML = '';
		document.getElementById('display').innerHTML =
			'The Gods have blessed you with a sword for 6 seconds. Use it well.';
		document.getElementById('display2').innerHTML =
			'You can now kill the snakemen.';
	}

	#displaySwordExpired() {
		document.getElementById('display').innerHTML =
			'The sword has broken under the pressure of the evil labyrinth.';
		document.getElementById('display2').innerHTML =
			'You have lost the ability to kill the snakemen. Run.';
		setTimeout(() => {
			document.getElementById('display').innerHTML = '';
			document.getElementById('display2').innerHTML = '';
		}, 1000 * 5);
	}

	#takeSword() {
		if (this.tileMap.takeSword(this.x, this.y)) {
			//character animation changes to with sword, able to kill snakemen
			this.takeSwordActive = true;
			this.#loadPlayerImages();
			this.#displaySwordExpireTime();

			//snakes become killable

			//play takeSword sound
			this.takeSwordSound.play();
			this.spartaSound.play();

			//sword timer = 6 seconds, after that player switches back to vulnerable
			let swordTimer = setTimeout(() => {
				this.takeSwordActive = false;
				this.#loadPlayerImages();
				this.#displaySwordExpired();
			}, 1000 * 6);
		}
	}

	//kill snake
	#killEnemy(enemies) {
		if (this.takeSwordActive) {
			const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
			collideEnemies.forEach((enemy) => {
				enemies.splice(enemies.indexOf(enemy), 1);
				this.killEnemySound.play();
			});
		}
	}

	//key related

	#keyText() {
		document.getElementById('instructions').innerHTML = '';
		document.getElementById('display').innerHTML = 'You have the Key!';
		document.getElementById('display2').innerHTML =
			'You can now exit the maze. Head towards the exit.';
		setTimeout(() => {
			document.getElementById('display').innerHTML = '';
			document.getElementById('display2').innerHTML = '';
		}, 1000 * 4);
	}

	#takeKey() {
		if (this.tileMap.takeKey(this.x, this.y)) {
			this.keyTaken = true;
			this.takeKeySound.play();
			this.#keyText();
		}
	}

	#displayGameWin() {
		document.getElementById('display').innerHTML =
			'Player has escaped the Maze.';
		document.getElementById('display2').innerHTML = 'Congratulations.';
	}

	#openDoor() {
		if (this.tileMap.openDoor(this.x, this.y) && this.keyTaken == true) {
			this.unlockDoorSound.play();
			setTimeout(() => {
				this.unlockDoorSound.pause();
			}, 1000 * 2);
			this.escapedMaze = true;
			this.#displayGameWin();
		}
	}
}
