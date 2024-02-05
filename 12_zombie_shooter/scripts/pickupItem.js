import Zombie from "../object/zombie";
import Item from "../object/item";
import distance_to_point from "../helper/distance_to_point";
import { SECONDARY_WEAPONS_CONFIG, ammoTypeItemMap, PRIMARY_WEAPONS_CONFIG, SECONDARY_WEAPONS } from "../constants";

function pickupItem(object) {
	const currentPrimaryWeapon = PRIMARY_WEAPONS_CONFIG[object.primaryWeapon];
	const currentSecondaryWeapon = SECONDARY_WEAPONS_CONFIG[object.secondaryWeapon];
	object.scene.children.list.forEach((child) => {
		// Die from zombie touch
		if (child instanceof Zombie) {
			const distanceToZombie = distance_to_point(object.x, object.y, child.x, child.y);
			if (distanceToZombie < 32) {
				alert("Game over");
				window.location.reload();
				object.destroy();
			}
		}



		// Pickup item on touch
		if (child instanceof Item) {
			const distanceToItem = distance_to_point(object.x, object.y, child.x, child.y);

			const currentPrimaryAmmoType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[object.primaryWeapon]?.ammo];
			const currentSecondaryAmmoType = ammoTypeItemMap[SECONDARY_WEAPONS_CONFIG[object.secondaryWeapon]?.ammo];

			// Pickup primary weapons
			if (["M4", "AR", "AK"].includes(child.type) && distanceToItem < 32 && Phaser.Input.Keyboard.JustDown(object.input.interact)) {
				if (object.primaryWeapon) {
					// Drop weapon
					new Item({ x: object.x, y: object.y + 32, type: object.primaryWeapon, meta: object.loadedAmmo }, object.scene);

					// Drop ammo
					const pickedUpAmmoType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[child.type]?.ammo];
					const ammoCannotBeUsed = currentPrimaryAmmoType !== currentSecondaryAmmoType && currentSecondaryAmmoType !== pickedUpAmmoType && currentPrimaryAmmoType !== pickedUpAmmoType;
					const hasAmmo = object.ammos[currentPrimaryWeapon?.ammo] > 0;
					if (ammoCannotBeUsed && hasAmmo) {
						const ammoType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[object.primaryWeapon].ammo];
						new Item({ x: object.x, y: object.y + 48, type: ammoType, meta: object.ammos[currentPrimaryWeapon.ammo] }, object.scene);
						object.ammos[currentPrimaryWeapon.ammo] = 0;
					}

				}

				object.loadedAmmo = child.meta || 0;
				object.primaryWeapon = child.type;
				child.destroy();

			}

			// Pickup secondary weapons
			if (Object.keys(SECONDARY_WEAPONS).includes(child.type) && distanceToItem < 32 && Phaser.Input.Keyboard.JustDown(object.input.interact)) {
				if (object.secondaryWeapon) {
					// Drop weapon
					new Item({ x: object.x, y: object.y + 32, type: object.secondaryWeapon, meta: object.loadedSecondaryAmmo }, object.scene);

					// Drop ammo
					const pickedUpAmmoType = ammoTypeItemMap[SECONDARY_WEAPONS_CONFIG[child.type]?.ammo];
					const ammoCannotBeUsed = currentPrimaryAmmoType !== currentSecondaryAmmoType && currentSecondaryAmmoType !== pickedUpAmmoType && currentPrimaryAmmoType !== pickedUpAmmoType;
					const hasAmmo = object.ammos[currentSecondaryWeapon?.ammo] > 0;
					if (ammoCannotBeUsed && hasAmmo) {
						const ammoType = ammoTypeItemMap[SECONDARY_WEAPONS_CONFIG[object.secondaryWeapon].ammo];
						new Item({ x: object.x, y: object.y + 48, type: ammoType, meta: object.ammos[currentSecondaryWeapon.ammo] }, object.scene);
						object.ammos[currentSecondaryWeapon.ammo] = 0;
					}

				}

				object.loadedSecondaryAmmo = child.meta || 0; 
				object.secondaryWeapon = child.type;
				child.destroy();
			}

			// Pickup Primary ammo
			if (currentPrimaryAmmoType == child.type && distanceToItem < 32) {
				const primaryWeaponAmmo = PRIMARY_WEAPONS_CONFIG[object.primaryWeapon]?.ammo;
				object.ammos[primaryWeaponAmmo] += child.meta;
				child.destroy();
			}

			// Pickup Secondary ammo
			if (currentSecondaryAmmoType == child.type && distanceToItem < 32) {
				const secondaryWeaponAmmo = SECONDARY_WEAPONS_CONFIG[object.secondaryWeapon]?.ammo;
				object.ammos[secondaryWeaponAmmo] += child.meta;
				child.destroy();
			}
		}

	});
}

export { pickupItem }