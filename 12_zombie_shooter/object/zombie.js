import Player from "./player.js";
import distance_to_point from "../helper/distance_to_point.js";
import { scaleValue } from "../helper/scaleValue.js";
import Phaser from "phaser";
import { Bullet } from "./bullet.js";
import { randomInt } from "../helper/randomInt.js";

class Zombie extends Phaser.Physics.Arcade.Image {
    

    constructor (scene, x, y) {
        super(scene, x, y, "zombie");
        scene.add.existing(this)
        scene.physics.add.existing(this);

        // Add hp
        this.hp = randomInt(5, 10);
        this.hpBar = new Phaser.GameObjects.Text(scene, x, y-40, this.hp);

        scene.add.existing(this.hpBar);
    }


    preUpdate (time, delta) {
        const player = this.scene.children.list.find((child) => {
            if (child instanceof Player)  {
                return true;
            }
            
            return false;
        });

        // Make hpbar follow zombie
        this.hpBar.x = this.x;
        this.hpBar.y = this.y - 40;
        this.hpBar.text = this.hp;
        

        // Move towards player
        const angleToPlayer =  Phaser.Math.Wrap((Math.atan2(this.y - player.y, this.x - player.x) * 180 / Math.PI + 180) * -1, 0, 360); 
        
        // Angle between rigth
        const angleToRight = (angleToPlayer < 180 ? angleToPlayer : ( 180 + ( 180 - angleToPlayer )));

        const angleToUp =  angleToPlayer === 270 ? 180 : (Math.abs((angleToPlayer + 90) % 360 - 180) % 180);


        const hMove =  scaleValue(0, 180, 1, -1, angleToRight);
        const vMove =  scaleValue(0, 180, -1, 1, angleToUp);

        const speed = 1;

        this.x += hMove * speed;
        this.y += vMove * speed;
        
        // Get damage from bullet
        this.scene.children.list.forEach((child) => {
            if (child instanceof Bullet)  {
                const distanceToBullet = distance_to_point(this.x, this.y, child.x, child.y);
                if (distanceToBullet < 32) {
                    child.destroy();
                    this.hp -= child.damage;
                }
            }
        });

        // Die from 0 hp
        if (this.hp <= 0) {
            this.hpBar.destroy();
            this.destroy();
        }
    }

}

export default Zombie;