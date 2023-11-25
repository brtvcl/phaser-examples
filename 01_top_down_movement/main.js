import './style.css'
import phaser from "phaser";


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


var player;
let collision_group = [];
var cursors;
let h_speed = 0;
let v_speed = 0;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image("box", "./assets/box.png");
    this.load.image("wall", "./assets/wall.png");
}

function create ()
{

    // The player and its settings
    player = this.add.sprite(100, 450, "box").setOrigin(0);

    collision_group.push(this.add.sprite(400,300, "wall").setOrigin(0));
    collision_group.push(this.add.sprite(432,300, "wall").setOrigin(0));
    collision_group.push(this.add.sprite(400,332, "wall").setOrigin(0));
    collision_group.push(this.add.sprite(432,268, "wall").setOrigin(0));
    collision_group.push(this.add.sprite(464,268, "wall").setOrigin(0));
    collision_group.push(this.add.sprite(496,268, "wall").setOrigin(0));

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

}

function update ()
{
    //Movement
    let h_move = cursors.right.isDown - cursors.left.isDown;
    let v_move = cursors.down.isDown - cursors.up.isDown;

    h_speed += h_move*0.3;
    h_speed = clamp(h_speed, -4, 4);
    v_speed += v_move*0.3;
    v_speed = clamp(v_speed, -4, 4);
    
    if (h_move==0 && Math.abs(h_speed)<0.3) {
        h_speed = 0;
    } else {
        h_speed *= 0.95;
    }

    if (v_move==0 && Math.abs(v_speed)<0.3) {
        v_speed = 0;
    } else {
        v_speed *= 0.95;
    }

    //Collision
    let player_collision = {
        x:player.x+h_speed,
        y:player.y+v_speed,
        width:player.width,
        height:player.height,
        v_speed: v_speed,
        h_speed: h_speed,
    }


    collision_group.forEach(wall => {
        if (rectange_in_rectangle(player_collision, wall, "x")) {
            h_speed = 0;
        }    
        if (rectange_in_rectangle(player_collision, wall, "y")) {
            v_speed = 0;
        }
    });
    
    player.x += h_speed;
    player.y += v_speed;

}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function rectange_in_rectangle(r1, r2, axis = "both") {
    if (axis == "both") {
        if (r1.x + r1.width>= r2.x && r1.x <= r2.x + r2.width && r1.y + r1.height >= r2.y && r1.y <= r2.y + r2.height) {
            return true;
        }
    } else if (axis == "x") {
        //Collision
        if ( r1.y+r1.height > r2.y && r1.y < r2.y+r2.height && r1.x+r1.width/2+(Math.sign(r1.h_speed)*16)+r1.h_speed > r2.x && r1.x+r1.width/2+(Math.sign(r1.h_speed)*16)+r1.h_speed < r2.x+r2.width ) {
            return true;
        }
    } else if (axis == "y") {
        if ( r1.x+r1.width > r2.x && r1.x < r2.x+r2.width && r1.y+r1.height/2+(Math.sign(r1.v_speed)*16)+r1.v_speed > r2.y && r1.y+r1.height/2+(Math.sign(r1.v_speed)*16)+r1.v_speed < r2.y+r2.height ) {
            return true;
        }
    }
    
    return false;
}


