import "./style.css"
import phaser from "phaser";

import Player from "./object/player.js";
import Coin from "./object/coin";

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

	let player = new Player(this, 0,0);

	let coin_list = [];

	//Randomly put coins
	for (let i = 0; i < 40; i++) {
		let random_x = 32*Math.floor(Math.random()*800/32);
		let random_y = 32*Math.floor(Math.random()*600/32);
		coin_list.push(new Coin(this, random_x, random_y));
	}

	let collision_group = this.physics.add.staticGroup();

	collision_group.create(400,300, "wall");
	collision_group.create(432,300, "wall");
	collision_group.create(400,332, "wall");
	collision_group.create(432,268, "wall");
	collision_group.create(464,268, "wall");
	collision_group.create(496,268, "wall");

	//Set collision
	this.physics.add.collider(player, collision_group);

}

function update () {
	//Logic in player.js
}

