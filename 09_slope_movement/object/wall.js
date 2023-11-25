class Wall extends Phaser.Physics.Arcade.Image {
    

    constructor (scene, x, y) {
        let instance = super(scene, x, y, "wall");
        scene.add.existing(this);
		this.name = "wall";
    }

    preUpdate (time, delta) {

    }

}

export default Wall;