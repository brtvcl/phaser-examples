import Zombie from "../object/zombie";
import Item from "../object/item";
import distance_to_point from "../helper/distance_to_point";
import { ammoTypeItemMap } from "../constants";
import { PRIMARY_WEAPONS_CONFIG } from "../constants";

function pickupItem(object) {
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

			const currentAmmoItemType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[object.primaryWeapon]?.ammo];
			// Pickup weapons
			if (["M4", "AR", "AK"].includes(child.type) && distanceToItem < 32 && Phaser.Input.Keyboard.JustDown(object.input.interact)) {
				if (object.primaryWeapon) {
					// Drop weapon
					new Item({ x: object.x, y: object.y + 32, type: object.primaryWeapon }, object.scene);

					// Drop ammo
					const pickedUpAmmoType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[child.type]?.ammo];
					if (currentAmmoItemType !== pickedUpAmmoType && object.ammo > 0) {
						const ammoType = ammoTypeItemMap[PRIMARY_WEAPONS_CONFIG[object.primaryWeapon].ammo];
						new Item({ x: object.x, y: object.y + 48, type: ammoType, meta: object.ammo }, object.scene);
						object.ammo = 0;
					}

				}

				object.primaryWeapon = child.type;
				child.destroy();

			}

			// Pickup ammo
			if (currentAmmoItemType == child.type && distanceToItem < 32) {
				object.ammo += child.meta;
				child.destroy();
			}
		}

	});
}

export { pickupItem }