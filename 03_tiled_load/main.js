import "./style.css"
import phaser from "phaser";

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
let player_acceleration = 20;
let cursors;
let h_speed = 0;
let v_speed = 0;

var game = new Phaser.Game(config);


function preload () {
	this.load.image("tileset", "asset/plains.png");
	this.load.tilemapTiledJSON("map", "asset/map.json");
	this.load.image("box", "asset/box.png");
}

function create () {
	//Tiles
	const map = this.make.tilemap({key: "map"});
	const tileset = map.addTilesetImage("plains","tileset");
	const plain = map.createStaticLayer("Plain",tileset,0, 0);
	const walls = map.createStaticLayer("Wall", tileset,0, 0);

	//Tile collisions
	walls.setCollisionByExclusion(-1, true);

	// The player and its settings
	player = this.physics.add.image(100, 450, "box").setOrigin(0);

	//  Input Events
	cursors = this.input.keyboard.createCursorKeys();

	//Set collision
	this.physics.add.collider(player, walls);

	
}

function update () {

	//Movement
    let h_move = cursors.right.isDown - cursors.left.isDown;
    let v_move = cursors.down.isDown - cursors.up.isDown;

    h_speed += h_move*player_acceleration;
    h_speed = clamp(h_speed, -200, 200);
    v_speed += v_move*player_acceleration;
    v_speed = clamp(v_speed, -200, 200);
    
	
    if (h_move==0) {
		if (Math.abs(h_speed)<5) {
			h_speed = 0;
		}
		else {
			h_speed *= 0.95;
		}
    } 

    if (v_move==0) {
		if (Math.abs(v_speed)<5) {
			v_speed = 0;
		}
		else {
			v_speed *= 0.95;
		}
    } 
	
	player.setVelocityX(h_speed);
	player.setVelocityY(v_speed);
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
