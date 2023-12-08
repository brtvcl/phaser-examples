import clamp from "../helper/clamp.js";
import { Bullet } from "./bullet.js";
import Zombie from "./zombie.js";
import distance_to_point from "../helper/distance_to_point.js";
import { randomFloat } from "../helper/randomFloat.js";

class Item extends Phaser.GameObjects.Image {


	/**
	 * 
	 * @param {{
	 * x:number,
	 * y:number,
	 * type: "M4" | "AR" | "AK"
	 * }} param0 
	 * @param {*} scene 
	 */
	constructor(
		{
			x,
			y,
			type
		},
		scene
	) {
		const typeSpriteMap = {
			M4: "m4",
			AR: "ar",
			AK: "ak"
		};

		super(scene, x, y, typeSpriteMap[type]);
		scene.add.existing(this);

		this.type = type;

	}


}

export default Item;