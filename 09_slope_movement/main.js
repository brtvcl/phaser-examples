import "./style.css"
import Player from "./object/player.js";
import Wall from "./object/wall.js";
import Slope from "./object/slope";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);


function preload () {
	this.load.image("box",  "./asset/box.png");
	this.load.image("wall", "./asset/wall.png");
	this.load.image("coin", "./asset/coin.png");
	this.load.image("slope", "./asset/slope.png");
}

function create () {
	
	let wall_list = this.add.group();
	let player = new Player(this, 32,0);
	

	wall_list.add(new Wall(this, 16, 584));
	wall_list.add(new Wall(this, 48, 584));
	wall_list.add(new Wall(this, 80, 584));
	wall_list.add(new Wall(this, 112, 584));
	wall_list.add(new Wall(this, 144, 584));
	wall_list.add(new Wall(this, 176, 584));
	wall_list.add(new Wall(this, 208, 584));
	wall_list.add(new Wall(this, 240, 584));
	wall_list.add(new Slope(this, 240, 552));
	wall_list.add(new Slope(this, 272, 520));
	wall_list.add(new Slope(this, 304, 488));
	wall_list.add(new Wall(this, 336, 488));
	

}

function update () {
	
}

