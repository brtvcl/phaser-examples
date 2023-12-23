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
import { playerMovement } from "../scripts/playerMovement.js";
import { scriptLoader } from "../helper/scriptLoader.js";

const SLOTS = {
    PRIMARY: "PRIMARY",
    SECONDARY: "SECONDARY",
    HEALING: "HEALING",
    UTIL: "UTIL",
}

class Player extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y) {
        super(scene, x, y, "box");
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.player_acceleration = 20;
        this.input = scene.input.keyboard.addKeys({ 
            up: 'W', 
            left: 'A', 
            down: 'S', 
            right: 'D', 
            interact: "E", 
            reload: "R",
            primary: Phaser.Input.Keyboard.KeyCodes.ONE, 
            secondary: Phaser.Input.Keyboard.KeyCodes.TWO, 
            healing: Phaser.Input.Keyboard.KeyCodes.THREE, 
            util: Phaser.Input.Keyboard.KeyCodes.FOUR, 
        });
        this.h_speed = 0;
        this.v_speed = 0;
        this.activeSlot = SLOTS.PRIMARY;
        this.primaryWeapon = PRIMARY_WEAPONS.M4;
        this.ammo = 16;
        this.loadedAmmo = 3;
        this.reloadInterval = null;
        this.ammoText = new Phaser.GameObjects.Text(scene, 32, 32, this.ammo);
        scene.add.existing(this.ammoText);

        scriptLoader.load([
            fireWeapon.construct
        ], this);
    }

    preUpdate(time, delta) {
        // Update UI
        this.ammoText.text = `${this.loadedAmmo} / ${this.ammo}`;


        console.log(this.activeSlot);
        scriptLoader.load([
            playerMovement,
            reloadWeapon,
            pickupItem,
            fireWeapon.update,
        ], this);

        const primaryClicked = Phaser.Input.Keyboard.JustDown(this.input.primary);
        if (primaryClicked) {
            this.activeSlot = SLOTS.PRIMARY;
        }

        const secondaryClicked = Phaser.Input.Keyboard.JustDown(this.input.secondary);
        if (secondaryClicked) {
            this.activeSlot = SLOTS.SECONDARY;
        }
        // // Player movement
        // playerMovement(this);

        // // Reload logic
        // reloadWeapon(this);

        // // Pickup item logic
        // pickupItem(this);

        // // Primary Weapon shooting logic
        // fireWeapon(this);

    }

}

export default Player;