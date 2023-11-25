import "./style.css"
import phaser from "phaser";
import Player from "./object/player.js";
import Wall from "./object/wall.js";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
		preload: preload,
		create: create,
		update: update
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 1500 },
			debug: false
		}
	},
};



let game = new Phaser.Game(config);


function preload () {
	this.load.image("box",  "./asset/box.png");
	this.load.image("wall", "./asset/wall.png");
	this.load.image("coin", "./asset/coin.png");
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
	wall_list.add(new Wall(this, 272, 584));
	this.physics.add.collider(player, wall_list);
	

}

function update () {
	
}

