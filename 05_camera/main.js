import './style.css'
import phaser from "phaser";


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 608,
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
    this.load.image("box", "./asset/box.png");
    this.load.image("wall", "./asset/wall.png");
}

function create () {
  	// The player and its settings
	player = this.physics.add.image(0, 0, "box").setOrigin(0);

	let collision_group = this.physics.add.staticGroup();

	//Randomly put walls
	for (let i = 0; i < 40; i++) {
		let random_x = 32*Math.floor(Math.random()*800/32);
		let random_y = 32*Math.floor(Math.random()*600/32);
		console.log(random_x, random_y);
		collision_group.create(random_x, random_y, "wall").setOrigin(0).refreshBody();
	}


	//  Input Events
	cursors = this.input.keyboard.createCursorKeys();

	//Set collision
	this.physics.add.collider(player, collision_group);

	this.cameras.main.startFollow(player, true, 0.05, 0.05);

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

	console.log(h_speed);
	
	player.setVelocityX(h_speed);
	player.setVelocityY(v_speed);

}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}



