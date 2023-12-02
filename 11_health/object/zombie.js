import clamp from "../helper/clamp.js";
import Player from "./player.js";
import distance_to_point from "../helper/distance_to_point.js";
import { lerp } from "../helper/lerp.js";
import { scaleValue } from "../helper/scaleValue.js";

class Zombie extends Phaser.Physics.Arcade.Image {
    

    constructor (scene, x, y) {
        super(scene, x, y, "zombie");
        scene.add.existing(this)
        scene.physics.add.existing(this);
    }


    preUpdate (time, delta) {
        const player = this.scene.children.list.find((child) => {
            if (child instanceof Player)  {
                return true;
            }
            
            return false;
        });
        
        const distanceToPlayer = distance_to_point(this.x, this.y, player.x, player.y);

        if (distanceToPlayer < 32) {
            console.log("dead");
        }


        // Move towards player
        const angleToPlayer =  Phaser.Math.Wrap((Math.atan2(this.y - player.y, this.x - player.x) * 180 / Math.PI + 180) * -1, 0, 360); 
        
        // Angle between rigth
        const angleToRight = (angleToPlayer < 180 ? angleToPlayer : ( 180 + ( 180 - angleToPlayer )));

        const angleToUp =  (angleToPlayer-90)%180;

        console.log({angleToRight, angleToUp});
        // console.log({
        //     x: scaleValue(0, 180, 1, -1, angleToRight),
        //     y: scaleValue(0, 180, 1, -1, angleToUp),
        // });

    }

}

export default Zombie;