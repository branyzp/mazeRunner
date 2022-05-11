// Build levels using arrays
let levels = [];

// maps will be 2d arrays (arrays in array)
// walls with be value = 1 and spaces will be value = 0
// player is parsed in as well with position bottom left corner coordinate (x:0 y:4)
// player goal (door) is coordinate (x:4 y:4 )
// need to add randomly generated key to open the door to enter next level

let level_1 = {
	map: [
		[1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0],
		[0, 0, 1, 1, 0],
		[0, 0, 0, 1, 0],
		[0, 1, 0, 1, 0],
	],
	player: {
		x: 0,
		y: 4,
	},
	goal: {
		x: 4,
		y: 4,
	},
};

window.onload = console.log(level_1);
// const generateMap = (level_1.map) => {
// 	for (let y = 0;y<level_1.map.)
// }
