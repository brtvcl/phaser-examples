import clamp from "../helper/clamp.js";
import distance_to_point from "../helper/distance_to_point.js";
import Player from "./player.js";
class Coin extends Phaser.Physics.Arcade.Image {

    constructor (scene, x, y) {
        super(scene, x, y, "coin");
        scene.add.existing(this)
        scene.physics.add.existing(this);
    };

    preUpdate (time, delta) {
        

        for (let i = 0; i < this.scene.children.list.length; i++) {
            const obj = this.scene.children.list[i];
            if (obj instanceof Player) {
                let distance = distance_to_point(this.x, this.y, obj.x, obj.y);
                if (distance < 32) {
                    obj.set_point();
                    this.destroy();
                    return;
                }
            }
        }
    };

}

export default Coin;