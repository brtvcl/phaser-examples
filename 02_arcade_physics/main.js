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


function preload ()
{
		this.load.image("box", "./assets/box.png");
		this.load.image("wall","./assets/wall.png");
}

function create ()
{

	// The player and its settings
	player = this.physics.add.image(100, 450, "box").setOrigin(0);

	let collision_group = this.physics.add.staticGroup();

	collision_group.create(400,300, "wall");
	collision_group.create(432,300, "wall");
	collision_group.create(400,332, "wall");
	collision_group.create(432,268, "wall");
	collision_group.create(464,268, "wall");
	collision_group.create(496,268, "wall");

	//  Input Events
	cursors = this.input.keyboard.createCursorKeys();

	//Set collision
	this.physics.add.collider(player, collision_group);

	var r1 = this.add.rectangle(32, 32, 32, 32, 0x6666ff);
	collision_group.add(r1);

}

function update ()
{
	
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