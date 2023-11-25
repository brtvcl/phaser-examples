import clamp from "./clamp.js";
class Player extends Phaser.Physics.Arcade.Image {
    

    constructor (scene, x, y) {
        super(scene, x, y, "box").setOrigin(0);
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.player_acceleration = 20;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.h_speed = 0;
        this.v_speed = 0;
    }

    preUpdate (time, delta) {
        let h_move = this.cursors.right.isDown - this.cursors.left.isDown;
        let v_move = this.cursors.down.isDown - this.cursors.up.isDown;

        this.h_speed += h_move*this.player_acceleration;
        this.h_speed = clamp(this.h_speed, -200, 200);
        this.v_speed += v_move*this.player_acceleration;
        this.v_speed = clamp(this.v_speed, -200, 200);
        
        
        if (h_move==0) {
            if (Math.abs(this.h_speed)<5) {
                this.h_speed = 0;
            }
            else {
                this.h_speed *= 0.95;
            }
        } 

        if (v_move==0) {
            if (Math.abs(this.v_speed)<5) {
                this.v_speed = 0;
            }
            else {
                this.v_speed *= 0.95;
            }
        } 

        
        this.setVelocityX(this.h_speed);
        this.setVelocityY(this.v_speed);
    }

}

export default Player;