import "./style.css"
import phaser from "phaser";

import Player from "./object/player.js";
import Zombie from "./object/zombie";
import Item from "./object/item";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#223344',
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


function preload() {
	this.load.image("box", "./asset/box.png");
	this.load.image("zombie", "./asset/zombie.png");
	this.load.image("m4", "./asset/m4.png");
	this.load.image("ar", "./asset/ar.png");
	this.load.image("ak", "./asset/ak.png");
}

function create() {

	let player = new Player(this, 350, 300);


	this.triggerTimer = this.time.addEvent({
		callback: () => {
			const centerX = this.cameras.main.centerX;
			const centerY = this.cameras.main.centerY;
			const spawnRangeFromCenter = 300;

			const randomBetween = (min, max) => {
				return (Math.random() * (max - min + 1) + min)
			}

			const spawnX = centerX + spawnRangeFromCenter * Math.cos(randomBetween(-3, 3));
			const spawnY = centerY + spawnRangeFromCenter * Math.sin(randomBetween(-3, 3));

			// new Zombie(this, spawnX, spawnY);
		},
		callbackScope: this,
		delay: 1000, // 1000 = 1 second
		loop: true
	});

	new Item({
		type: "AK",
		x: 150,
		y: 150,
	}, this);
	new Item({
		type: "AR",
		x: 450,
		y: 150,
	}, this);
	new Item({
		type: "M4",
		x: 450,
		y: 450,
	}, this);

}

function update() {

}