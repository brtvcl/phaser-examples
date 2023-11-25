import "./style.css"
import phaser from "phaser";

import scene_a from "./scene/scene_a.js";
import scene_b from "./scene/scene_b.js";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [scene_b, scene_a],
	physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },

};



var game = new Phaser.Game(config);


