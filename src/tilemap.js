import Player from './player.js';
import Enemy from './enemy.js';
import moveDirection from './moveDirection.js';

export default class TileMap {
	constructor(tileSize) {
		this.tileSize = tileSize;
		this.wall = this.#image('wall.jpg');
		this.floor = this.#image('floor.jpg');
		this.door = this.#image('door.jpg');
		this.enemy = this.#image('enemy.jpg');
		this.key = this.#image('key.jpg');
		this.sword = this.#image('sword.jpg');
		// this.player = this.#image('player.jpg');
	}

	#image(fileName) {
		const img = new Image();
		img.src = `images/${fileName}`;
		return img;
	}

	// 0 = floor
	// 1 = wall
	// 2 = enemy
	// 3 = key
	// 4 = door
	// 5 = player
	// 6 = sword powerup
	map = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 3, 6, 1, 0, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
		[1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];

	draw(canvas, ctx) {
		this.#setCanvasSize(canvas);
		this.#clearCanvas(canvas, ctx);
		this.#drawMap(ctx);
	}

	#drawMap(ctx) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				const tile = this.map[row][column];
				let image = null;
				switch (tile) {
					case 1:
						image = this.wall;
						break;
					case 0:
						image = this.floor;
						break;
					case 2:
						image = this.enemy;
						break;
					case 3:
						image = this.key;
						break;
					case 4:
						image = this.door;
						break;
					// case 5:
					// 	image = this.player;
					// 	break;
					case 6:
						image = this.sword;
				}

				if (image != null)
					ctx.drawImage(
						image,
						column * this.tileSize,
						row * this.tileSize,
						this.tileSize,
						this.tileSize
					);
			}
		}
	}

	#clearCanvas(canvas, ctx) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	#setCanvasSize(canvas) {
		canvas.height = this.map.length * this.tileSize;
		canvas.width = this.map[0].length * this.tileSize;
	}

	getPlayer(velocity) {
		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				let tile = this.map[row][column];
				if (tile === 5) {
					this.map[row][column] = 0;
					return new Player(
						column * this.tileSize,
						row * this.tileSize,
						this.tileSize,
						velocity,
						this
					);
				}
			}
		}
	}

	getEnemies(velocity) {
		const enemies = [];

		for (let row = 0; row < this.map.length; row++) {
			for (let column = 0; column < this.map[row].length; column++) {
				const tile = this.map[row][column];
				if (tile == 2) {
					this.map[row][column] = 0;
					enemies.push(
						new Enemy(
							column * this.tileSize,
							row * this.tileSize,
							this.tileSize,
							velocity,
							this
						)
					);
				}
			}
		}
		return enemies;
	}

	// collidedWithEnvironment(x, y, direction) {
	// 	if (
	// 		Number.isInteger(x / this.tileSize) &&
	// 		Number.isInteger(y / this.tileSize)
	// 	) {
	// 		let column = 0;
	// 		let row = 0;
	// 		let nextColumn = 0;
	// 		let nextRow = 0;

	// 		switch (direction) {
	// 			case moveDirection.right:
	// 				nextColumn = x + this.tileSize;
	// 				column = nextColumn / this.tileSize;
	// 				row = y / this.tileSize;
	// 				break;
	// 			case moveDirection.left:
	// 				nextColumn = x - this.tileSize;
	// 				column = nextColumn / this.tileSize;
	// 				row = y / this.tileSize;
	// 			case moveDirection.up:
	// 				nextRow = y - this.tileSize;
	// 				column = x / this.tileSize;
	// 				row = nextRow / this.tileSize;
	// 				break;
	// 			case moveDirection.down:
	// 				nextRow = y + this.tileSize;
	// 				column = x / this.tileSize;
	// 				row = nextRow / this.tileSize;
	// 				break;
	// 		}
	// 		const tile = this.map[row][column];
	// 		if (tile === 1) {
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }

	collidedWithEnvironment(x, y, direction) {
		if (direction == null) {
			return;
		}

		if (
			Number.isInteger(x / this.tileSize) &&
			Number.isInteger(y / this.tileSize)
		) {
			let column = 0;
			let row = 0;
			let nextColumn = 0;
			let nextRow = 0;

			switch (direction) {
				case moveDirection.right:
					nextColumn = x + this.tileSize;
					column = nextColumn / this.tileSize;
					row = y / this.tileSize;
					break;
				case moveDirection.left:
					nextColumn = x - this.tileSize;
					column = nextColumn / this.tileSize;
					row = y / this.tileSize;
					break;
				case moveDirection.up:
					nextRow = y - this.tileSize;
					row = nextRow / this.tileSize;
					column = x / this.tileSize;
					break;
				case moveDirection.down:
					nextRow = y + this.tileSize;
					row = nextRow / this.tileSize;
					column = x / this.tileSize;
					break;
			}
			const tile = this.map[row][column];
			if (tile === 1) {
				return true;
			}
		}
		return false;
	}

	// takeSword(x, y) {
	// 	const row = y / this.tileSize;
	// 	const column = x / this.tileSize;
	// 	console.log(tile);
	// 	if (Number.isInteger(row) && Number.isInteger(column)) {
	// 		if (this.map[row][column] === 6) {
	// 			this.map[row][column] = 0;
	// 		}
	// 	}
	// }
}
