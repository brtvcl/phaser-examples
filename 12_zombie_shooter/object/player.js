import clamp from "../helper/clamp.js";
import { Bullet } from "./bullet.js";
import Zombie from "./zombie.js";
import distance_to_point from "../helper/distance_to_point.js";
import { randomFloat } from "../helper/randomFloat.js";
import Item from "./item.js";
import { PRIMARY_WEAPONS, PRIMARY_WEAPONS_CONFIG, ammoTypeItemMap } from "../constants.js";
import { fireWeapon } from "../scripts/fireWeapon.js";
import { reloadWeapon } from "../scripts/reloadWeapon.js";



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


        this.scene.children.list.forEach((child) => {
            // Die from zombie touch
            if (child instanceof Zombie) {
                const distanceToZombie = distance_to_point(this.x, this.y, child.x, child.y);
                if (distanceToZombie < 32) {
                    alert("Game over");
                    window.location.reload();
                    this.destroy();
                }
            }

            

            // Pickup item on touch
            if (child instanceof Item) {
                const distanceToItem = distance_to_point(this.x, this.y, child.x, child.y);

                const currentAmmoItemType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[this.primaryWeapon]?.ammo];
                // Pickup weapons
                if (["M4", "AR", "AK"].includes(child.type) && distanceToItem < 32 && Phaser.Input.Keyboard.JustDown(this.input.interact)) {
                    if (this.primaryWeapon) {
                        // Drop weapon
                        new Item({ x: this.x, y: this.y + 32, type: this.primaryWeapon }, this.scene);

                        // Drop ammo
                        const pickedUpAmmoType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[child.type]?.ammo];
                        if (currentAmmoItemType !== pickedUpAmmoType && this.ammo > 0) {
                            const ammoType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[this.primaryWeapon].ammo];
                            new Item({ x: this.x, y: this.y + 48, type: ammoType, meta: this.ammo }, this.scene);
                            this.ammo = 0;
                        }

                    }

                    this.primaryWeapon = child.type;
                    child.destroy();

                }

                // Pickup ammo
                if (currentAmmoItemType == child.type && distanceToItem < 32) {
                    this.ammo += child.meta;
                    child.destroy();
                }
            }

        });


        // Primary Weapon shooting logic
        fireWeapon(this);

    }

}

export default Player;