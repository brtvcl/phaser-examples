import "./style.css"
import phaser from "phaser";

import Player from "./util/player.js";

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

let player;


let game = new Phaser.Game(config);


function preload () {
	
	this.load.image("box", "./asset/box.png");
	this.load.image("wall","./asset/wall.png");
}

function create () {

	player = new Player(this, 0,0);

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

