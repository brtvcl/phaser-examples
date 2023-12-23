import { PRIMARY_WEAPONS, PRIMARY_WEAPONS_CONFIG } from "../constants";
import { randomFloat } from "../helper/randomFloat";
import { Bullet } from "../object/bullet";

const fireWeapon = {
    construct: (object) => {
        object.canShoot = true;
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
    }
}

export { fireWeapon };