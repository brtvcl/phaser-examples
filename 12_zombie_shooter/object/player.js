import clamp from "../helper/clamp.js";
import { Bullet } from "./bullet.js";
import Zombie from "./zombie.js";
import distance_to_point from "../helper/distance_to_point.js";
import { randomFloat } from "../helper/randomFloat.js";
import Item from "./item.js";

const PRIMARY_WEAPONS = {
    AR: "AR", // M4A1
    AK: "AK", // Kalashnikov
    M4: "M4" // Shotgun
};

const AMMO_TYPES = {
    HEAVY: "HEAVY",
    LIGHT: "LIGHT",
    SHOTGUN: "SHOTGUN",
}

const PRIMARY_WEAPONS_CONFIG = {
    AR: {
        fireRate: 15,
        magazineCapacity: 25,
        ammo: AMMO_TYPES.LIGHT,
    },
    AK: {
        fireRate: 12,
        magazineCapacity: 30,
        ammo: AMMO_TYPES.HEAVY,
    },
    M4: {
        fireRate: 1,
        magazineCapacity: 5,
        ammo: AMMO_TYPES.SHOTGUN
    }
};

const ammoTypeItemMap = {
    HEAVY: "HEAVY_AMMO",
    LIGHT: "LIGHT_AMMO",
    SHOTGUN: "SHOTGUN_AMMO"
};


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

        const currentWeapon = PRIMARY_WEAPONS_CONFIG[this.primaryWeapon];
        const pointer = this.scene.input.activePointer;

        // Reload logic
        const hasSpaceInMagazine = this.loadedAmmo < currentWeapon.magazineCapacity;
        const reloadClicked = Phaser.Input.Keyboard.JustDown(this.input.reload);
        if (hasSpaceInMagazine && reloadClicked) {
            // Reload logic by ammo type
            switch (currentWeapon.ammo) {
                case "SHOTGUN":
                    // In shothun ammo type we set interval for 500ms second to load 1 round at a time 
                    // When reloaded fully or round fired we stop interval
                    const reloadInterval = setInterval(() => {
                        const roundsToLoad = Math.min(1, this.ammo, currentWeapon.magazineCapacity - this.loadedAmmo);
                        if (roundsToLoad < 1) {
                            clearInterval(reloadInterval);
                        }
                        this.loadedAmmo += roundsToLoad;
                        this.ammo -= roundsToLoad;

                        const cannotReloadMore = Math.min(1, this.ammo, currentWeapon.magazineCapacity - this.loadedAmmo) < 1;

                        if (cannotReloadMore) {
                            clearInterval(reloadInterval);
                        }
                    }, 500);

                    if (pointer.isDown) {
                        clearInterval(reloadInterval);
                    }

                    break;
                case "HEAVY":
                    // In heavy ammo type we wait for 1.5 second to load the magazine and we fully reload 
                    this.canShoot = false;
                    setTimeout(() => {
                        this.canShoot = true;
                        const roundsToLoad = Math.min(currentWeapon.magazineCapacity, this.ammo, currentWeapon.magazineCapacity - this.loadedAmmo);
                        this.loadedAmmo += roundsToLoad;
                        this.ammo -= roundsToLoad;
                    }, 1500)
                    break;
                case "LIGHT":
                    // In light ammo type we wait for 1.2 second to load the magazine and we fully reload 
                    this.canShoot = false;
                    setTimeout(() => {
                        this.canShoot = true;
                        const roundsToLoad = Math.min(currentWeapon.magazineCapacity, this.ammo, currentWeapon.magazineCapacity - this.loadedAmmo);
                        this.loadedAmmo += roundsToLoad;
                        this.ammo -= roundsToLoad;
                    }, 1200)
                    break;
                default:
                    break;
            }
        }


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
        if (this.canShoot && pointer.isDown && this.primaryWeapon && this.loadedAmmo > 0) {
            this.canShoot = false;
            this.loadedAmmo--;

            const currentWeaponFireRate = PRIMARY_WEAPONS_CONFIG[this.primaryWeapon].fireRate;
            setTimeout(() => {
                this.canShoot = true;
            }, 1000 / currentWeaponFireRate);
            switch (this.primaryWeapon) {
                case PRIMARY_WEAPONS.AR:

                    new Bullet(this.scene, {
                        x: this.x,
                        y: this.y,
                        targetX: pointer.x,
                        targetY: pointer.y,
                        spread: 5,
                        damage: 5
                    });
                    break;
                case PRIMARY_WEAPONS.AK:
                    new Bullet(this.scene, {
                        x: this.x,
                        y: this.y,
                        targetX: pointer.x,
                        targetY: pointer.y,
                        spread: 7,
                        damage: 7
                    });
                    break;
                case PRIMARY_WEAPONS.M4:
                    for (let i = 0; i < 9; i++) {
                        new Bullet(this.scene, {
                            x: this.x,
                            y: this.y,
                            targetX: pointer.x,
                            targetY: pointer.y,
                            spread: 12,
                            speed: randomFloat(12, 17)
                        });
                    }
            }

        }



    }

}

export default Player;