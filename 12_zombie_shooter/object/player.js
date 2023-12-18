import clamp from "../helper/clamp.js";
import { Bullet } from "./bullet.js";
import Zombie from "./zombie.js";
import distance_to_point from "../helper/distance_to_point.js";
import { randomFloat } from "../helper/randomFloat.js";
import Item from "./item.js";
import { PRIMARY_WEAPONS, PRIMARY_WEAPONS_CONFIG, ammoTypeItemMap } from "../constants.js";
import { fireWeapon } from "../scripts/fireWeapon.js";
import { reloadWeapon } from "../scripts/reloadWeapon.js";
import { pickupItem } from "../scripts/pickupItem.js";



class Player extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y) {
        super(scene, x, y, "box");
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.player_acceleration = 20;
        this.input = scene.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D', interact: "E", reload: "R" });
        this.h_speed = 0;
        this.v_speed = 0;
        this.primaryWeapon = PRIMARY_WEAPONS.M4;
        this.canShoot = true;
        this.ammo = 16;
        this.loadedAmmo = 3;
        this.reloadInterval = null;
        this.ammoText = new Phaser.GameObjects.Text(scene, 32, 32, this.ammo);
        scene.add.existing(this.ammoText);

    }

    preUpdate(time, delta) {
        // Update UI
        this.ammoText.text = `${this.loadedAmmo} / ${this.ammo}`;

        let h_move = this.input.right.isDown - this.input.left.isDown;
        let v_move = this.input.down.isDown - this.input.up.isDown;

        this.h_speed += h_move * this.player_acceleration;
        this.h_speed = clamp(this.h_speed, -200, 200);
        this.v_speed += v_move * this.player_acceleration;
        this.v_speed = clamp(this.v_speed, -200, 200);



        if (h_move == 0) {
            if (Math.abs(this.h_speed) < 5) {
                this.h_speed = 0;
            }
            else {
                this.h_speed *= 0.95;
            }
        }

        if (v_move == 0) {
            if (Math.abs(this.v_speed) < 5) {
                this.v_speed = 0;
            }
            else {
                this.v_speed *= 0.95;
            }
        }


        this.setVelocityX(this.h_speed);
        this.setVelocityY(this.v_speed);




        // Reload logic
        reloadWeapon(this);


        // Pickup item logic
        pickupItem(this);


        // Primary Weapon shooting logic
        fireWeapon(this);

    }

}

export default Player;