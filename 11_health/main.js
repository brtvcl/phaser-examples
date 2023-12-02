import "./style.css"
import phaser from "phaser";

import Player from "./object/player.js";
import Zombie from "./object/zombie";

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
	this.load.image("zombie", "./asset/zombie.png");
}

function create () {

	let player = new Player(this, 350, 300);
	new Zombie(this, 150, 300);

}

function update () {
	//Logic in player.js
}

