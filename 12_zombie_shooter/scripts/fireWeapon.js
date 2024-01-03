import { PRIMARY_WEAPONS, PRIMARY_WEAPONS_CONFIG, SECONDARY_WEAPONS, SECONDARY_WEAPONS_CONFIG, SLOTS } from "../constants";
import { randomFloat } from "../helper/randomFloat";
import { Bullet } from "../object/bullet";


const fireWeapon = {
    construct: (object) => {
        object.canShoot = true;
        object.secondaryCanShoot = true;
        object.secondaryTriggerReleased = true;
    },
    update: (object) => {
        const pointer = object.scene.input.activePointer;
        // Primary Weapon shooting logic
        if (object.activeSlot == "PRIMARY" && object.canShoot && pointer.isDown && object.primaryWeapon && object.loadedAmmo > 0) {
            object.canShoot = false;
            object.loadedAmmo--;
            const currentWeaponFireRate = PRIMARY_WEAPONS_CONFIG[object.primaryWeapon].fireRate;
            setTimeout(() => {
                object.canShoot = true;
            }, 1000 / currentWeaponFireRate);
            switch (object.primaryWeapon) {
                case PRIMARY_WEAPONS.AR:
                    object.primaryWeaponSprayHeat += 8;
                    new Bullet(object.scene, {
                        x: object.x,
                        y: object.y,
                        targetX: pointer.x,
                        targetY: pointer.y,
                        spread: 5,
                        damage: 5
                    });
                    break;
                case PRIMARY_WEAPONS.AK:
                    object.primaryWeaponSprayHeat += 9;
                    new Bullet(object.scene, {
                        x: object.x,
                        y: object.y,
                        targetX: pointer.x,
                        targetY: pointer.y,
                        spread: 7,
                        damage: 7
                    });
                    break;
                case PRIMARY_WEAPONS.M4:
                    object.primaryWeaponSprayHeat += 80;
                    for (let i = 0; i < 9; i++) {
                        new Bullet(object.scene, {
                            x: object.x,
                            y: object.y,
                            targetX: pointer.x,
                            targetY: pointer.y,
                            spread: 12,
                            speed: randomFloat(12, 17)
                        });
                    }
            }

        } 

        // Secondary Weapon shooting logic
        if (!pointer.isDown) {
            object.secondaryTriggerReleased = true;
        }

        // Spray Cooldown
        if (object.primaryWeaponSprayHeat > 0) {
            object.primaryWeaponSprayHeat--;
        }

        if (object.activeSlot == SLOTS.SECONDARY && object.secondaryCanShoot && pointer.isDown && object.secondaryTriggerReleased && object.secondaryWeapon && object.loadedSecondaryAmmo > 0) {
            object.secondaryCanShoot = false;
            object.secondaryTriggerReleased = false;
            object.loadedSecondaryAmmo--;

            const currentWeaponFireRate = SECONDARY_WEAPONS_CONFIG[object.secondaryWeapon].fireRate;
            setTimeout(() => {
                object.secondaryCanShoot = true;
            }, 1000 / currentWeaponFireRate);
            switch (object.secondaryWeapon) {
                case SECONDARY_WEAPONS.GLOCK:
                    object.primaryWeaponSprayHeat += 6;
                    new Bullet(object.scene, {
                        x: object.x,
                        y: object.y,
                        targetX: pointer.x,
                        targetY: pointer.y,
                        spread: 5,
                        damage: 5
                    });
                    break;
            }

        }
    }
}

export { fireWeapon };