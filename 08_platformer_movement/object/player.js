class Player extends Phaser.Physics.Arcade.Image {
    

    constructor (scene, x, y) {
        super(scene, x, y, "box");
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.jumping = false;
    }

    preUpdate (time, delta) {
        console.log(time);
        let cursors = this.cursors;
        if (cursors.left.isDown) {
            this.setVelocityX(-160);
        }
        else if (cursors.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }
    
        if (!cursors.up.isDown) {
            this.jumping = false;
        } 

        if (this.body.velocity.y < -400) {
            this.jumping = false;
        }
        if (cursors.up.isDown && this.body.touching.down) {
            this.jumping = true;
        }

        if (this.jumping) {
            this.setVelocityY(this.body.velocity.y-100);
        }
    }

}

export default Player;