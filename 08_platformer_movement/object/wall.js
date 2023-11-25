class Wall extends Phaser.Physics.Arcade.Image {
    

    constructor (scene, x, y) {
        let instance = super(scene, x, y, "wall");
        scene.add.existing(this)
        let body = scene.physics.add.existing(this);
        body.setImmovable(true);
        body.body.allowGravity = false;
    }

    preUpdate (time, delta) {

    }

}

export default Wall;