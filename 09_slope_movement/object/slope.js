class Slope extends Phaser.Physics.Arcade.Image {


	constructor(scene, x, y) {
		let instance = super(scene, x, y, "slope");
		scene.add.existing(this);
		this.name = "slope";
	}

	preUpdate(time, delta) {
		let player = this.scene.children.list.find(o => o.name == "player");

	
	}
}

export default Slope;