import Phaser from "phaser";
import clamp from "../util/clamp.js";

let player;
let player_acceleration = 20;
let cursors;
let h_speed = 0;
let v_speed = 0;
let door_collision;

let SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA () {
        Phaser.Scene.call(this, { key: 'sceneB' });
    },

    preload: function () {
        this.load.image("box", "../assets/box.png");
		this.load.image("wall","../assets/wall.png");
    },

    create: function () {
        // The player and its settings
        player = this.physics.add.image(64, 64, "box").setOrigin(0);

        let collision_group = this.physics.add.staticGroup();

        collision_group.create(400,300, "wall");
        collision_group.create(432,300, "wall");
        collision_group.create(464,332, "wall");
        collision_group.create(432,364, "wall");
        collision_group.create(400,396, "wall");
        collision_group.create(432,428, "wall");
        collision_group.create(400,428, "wall");
        collision_group.create(464,428, "wall");

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //Set collision
        this.physics.add.collider(player, collision_group);

        //Create door
        var r1 = this.add.rectangle(32, 32, 32, 32, 0x6666ff);
        door_collision = this.physics.add.staticGroup();
        door_collision.add(r1);
        this.physics.add.collider(player, door_collision);

        console.log(door_collision.getFirstAlive().body)
    },

    update: function (time, delta) {
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

    //Check door collision
    if ( door_collision.getFirstAlive().body.touching.none == false) {
        this.scene.start('sceneA');
    }
	
	player.setVelocityX(h_speed);
	player.setVelocityY(v_speed);
    }

});

export default SceneA;