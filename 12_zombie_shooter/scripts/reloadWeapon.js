import { PRIMARY_WEAPONS, PRIMARY_WEAPONS_CONFIG, ammoTypeItemMap, SECONDARY_WEAPONS_CONFIG } from "../constants.js";

export function reloadWeapon(object) {
    const currentPrimaryWeapon = PRIMARY_WEAPONS_CONFIG[object.primaryWeapon];
    const pointer = object.scene.input.activePointer;

    if (pointer.isDown && object.reloadInterval) {
        clearInterval(object.reloadInterval);
        object.reloadInterval = null;
    }

    const hasSpaceInPrimaryMagazine = object.loadedAmmo < currentPrimaryWeapon.magazineCapacity;
    const reloadClicked = Phaser.Input.Keyboard.JustDown(object.input.reload);

    if (object.primaryWeapon && object.activeSlot == "PRIMARY" && hasSpaceInPrimaryMagazine && reloadClicked && object.canShoot) {
        // Reload logic by ammo type
        switch (currentPrimaryWeapon.ammo) {
            case "SHOTGUN":
                // In shothun ammo type we set interval for 500ms second to load 1 round at a time 
                // When reloaded fully or round fired we stop interval
                if (!object.reloadInterval) {
                    object.reloadInterval = setInterval(() => {
                        const roundsToLoad = Math.min(1, object.ammos[currentPrimaryWeapon.ammo], currentPrimaryWeapon.magazineCapacity - object.loadedAmmo);
                        if (roundsToLoad < 1) {
                            clearInterval(object.reloadInterval);
                            object.reloadInterval = null;
                        }
                        object.loadedAmmo += roundsToLoad;
                        object.ammos[currentPrimaryWeapon.ammo] -= roundsToLoad;

                        const cannotReloadMore = Math.min(1, object.ammos[currentPrimaryWeapon.ammo], currentPrimaryWeapon.magazineCapacity - object.loadedAmmo) < 1;

                        if (cannotReloadMore) {
                            clearInterval(object.reloadInterval);
                            object.reloadInterval = null;
                        }
                    }, 500);
                }



                break;
            case "HEAVY":
                // In heavy ammo type we wait for 1.5 second to load the magazine and we fully reload 
                object.canShoot = false;
                setTimeout(() => {
                    object.canShoot = true;
                    const roundsToLoad = Math.min(currentPrimaryWeapon.magazineCapacity, object.ammos[currentPrimaryWeapon.ammo], currentPrimaryWeapon.magazineCapacity - object.loadedAmmo);
                    object.loadedAmmo += roundsToLoad;
                    object.ammos[currentPrimaryWeapon.ammo] -= roundsToLoad;
                }, 1500)
                break;
            case "LIGHT":
                // In light ammo type we wait for 1.2 second to load the magazine and we fully reload 
                object.canShoot = false;
                setTimeout(() => {
                    object.canShoot = true;
                    const roundsToLoad = Math.min(currentPrimaryWeapon.magazineCapacity, object.ammos[currentPrimaryWeapon.ammo], currentPrimaryWeapon.magazineCapacity - object.loadedAmmo);
                    object.loadedAmmo += roundsToLoad;
                    object.ammos[currentPrimaryWeapon.ammo] -= roundsToLoad;
                }, 1200)
                break;
            default:
                break;
        }
    }


    const currentSecondaryWeapon = SECONDARY_WEAPONS_CONFIG[object.secondaryWeapon];
    const hasSpaceInSecondaryMagazine = object.loadedSecondaryAmmo < currentSecondaryWeapon?.magazineCapacity;
    if (object.secondaryWeapon && object.activeSlot == "SECONDARY" && hasSpaceInSecondaryMagazine && reloadClicked && object.canShoot) {
        const currentWeapon = SECONDARY_WEAPONS_CONFIG[object.secondaryWeapon];

        // Reload logic by ammo type
        switch (currentWeapon.ammo) {
            case "SHOTGUN":
                break;
            case "HEAVY":
                break;
            case "LIGHT":        
                // In light ammo type we wait for 1.2 second to load the magazine and we fully reload 
                object.canShoot = false;
                setTimeout(() => {
                    object.canShoot = true;
                    const roundsToLoad = Math.min(currentWeapon.magazineCapacity, object.ammos[currentWeapon.ammo], currentWeapon.magazineCapacity - object.loadedSecondaryAmmo);
                    object.loadedSecondaryAmmo += roundsToLoad;
                    object.ammos[currentWeapon.ammo] -= roundsToLoad;
                }, 1200)
                break;
            default:
                break;
        }
    }
}