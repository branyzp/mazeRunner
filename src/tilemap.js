export default class TileMap {
	constructor(tileSize) {
		this.tileSize = tileSize;
		this.wall = this.#image('wall.jpg');
		this.floor = this.#image('floor.jpg');
		this.door = this.#image('door.jpg');
		this.enemy = this.#image('enemy.jpg');
		this.key = this.#image('key.jpg');
		this.player = this.#image('player.jpg');
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
	///6 = powerup
	map = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 1, 3, 1, 0, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
		[1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1],
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
					case 5:
						image = this.player;
						break;
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
}
