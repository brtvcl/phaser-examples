import clamp from "../helper/clamp.js";
import { Bullet } from "./bullet.js";
import Zombie from "./zombie.js";
import distance_to_point from "../helper/distance_to_point.js";
import { randomFloat } from "../helper/randomFloat.js";

class Item extends Phaser.GameObjects.Image {

	/**
	 * @typedef {"M4"|"AR"|"AK"|"HEAVY_AMMO"|"LIGHT_AMMO"|"SHOTGUN_AMMO"} type
	 */

	/**
	 * 
	 * @param {{
	 * x:number,
	 * y:number,
	 * type: type
	 * }} param0 
	 * @param {*} scene 
	 */
	constructor(
		{
			x,
			y,
			type,
			meta,
		},
		scene
	) {
		const typeSpriteMap = {
			M4: "m4",
			AR: "ar",
			AK: "ak",
			GLOCK: "glock",
			HEAVY_AMMO: "heavy_ammo",
			LIGHT_AMMO: "light_ammo",
			SHOTGUN_AMMO: "shotgun_ammo"
		};

		super(scene, x, y, typeSpriteMap[type]);
		scene.add.existing(this);

		this.type = type;
		this.meta = meta;

	}


}

export default Item;