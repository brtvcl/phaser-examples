import { PRIMARY_WEAPONS, PRIMARY_WEAPONS_CONFIG, ammoTypeItemMap } from "../constants.js";

export function reloadWeapon(object) {
    const currentWeapon = PRIMARY_WEAPONS_CONFIG[object.primaryWeapon];
    const pointer = object.scene.input.activePointer;

    if (pointer.isDown && object.reloadInterval) {
        clearInterval(object.reloadInterval);
        object.reloadInterval = null;
    }

    const hasSpaceInMagazine = object.loadedAmmo < currentWeapon.magazineCapacity;
        const reloadClicked = Phaser.Input.Keyboard.JustDown(object.input.reload);
        if (hasSpaceInMagazine && reloadClicked && object.canShoot) {
            // Reload logic by ammo type
            switch (currentWeapon.ammo) {
                case "SHOTGUN":
                    // In shothun ammo type we set interval for 500ms second to load 1 round at a time 
                    // When reloaded fully or round fired we stop interval
                    if (!object.reloadInterval) {
                        object.reloadInterval = setInterval(() => {
                            const roundsToLoad = Math.min(1, object.ammo, currentWeapon.magazineCapacity - object.loadedAmmo);
                            if (roundsToLoad < 1) {
                                clearInterval(object.reloadInterval);
                                object.reloadInterval = null;
                            }
                            object.loadedAmmo += roundsToLoad;
                            object.ammo -= roundsToLoad;

                            const cannotReloadMore = Math.min(1, object.ammo, currentWeapon.magazineCapacity - object.loadedAmmo) < 1;

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
                        const roundsToLoad = Math.min(currentWeapon.magazineCapacity, object.ammo, currentWeapon.magazineCapacity - object.loadedAmmo);
                        object.loadedAmmo += roundsToLoad;
                        object.ammo -= roundsToLoad;
                    }, 1500)
                    break;
                case "LIGHT":
                    // In light ammo type we wait for 1.2 second to load the magazine and we fully reload 
                    object.canShoot = false;
                    setTimeout(() => {
                        object.canShoot = true;
                        const roundsToLoad = Math.min(currentWeapon.magazineCapacity, object.ammo, currentWeapon.magazineCapacity - object.loadedAmmo);
                        object.loadedAmmo += roundsToLoad;
                        object.ammo -= roundsToLoad;
                    }, 1200)
                    break;
                default:
                    break;
            }
        }
}