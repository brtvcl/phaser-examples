import clamp from "../helper/clamp.js";
import { Bullet } from "./bullet.js";
import Zombie from "./zombie.js";
import distance_to_point from "../helper/distance_to_point.js";
import { randomFloat } from "../helper/randomFloat.js";
import Item from "./item.js";

const PRIMARY_WEAPONS = {
    AR: "AR", // M4A1
    AK: "AK", // Kalashnikov
    M4: "M4" // Shotgun
};

class Player extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y) {
        super(scene, x, y, "box");
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.player_acceleration = 20;
        this.input = scene.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D', interact: "E" });
        this.h_speed = 0;
        this.v_speed = 0;
        this.primaryWeapon = PRIMARY_WEAPONS.M4,

            scene.input.on('pointerdown', (pointer) => {
                switch (this.primaryWeapon) {
                    case PRIMARY_WEAPONS.AR:
                        new Bullet(scene, {
                            x: this.x,
                            y: this.y,
                            targetX: pointer.x,
                            targetY: pointer.y,
                            spread: 5,
                            damage: 5
                        });
                        break;
                    case PRIMARY_WEAPONS.AK:
                        new Bullet(scene, {
                            x: this.x,
                            y: this.y,
                            targetX: pointer.x,
                            targetY: pointer.y,
                            spread: 7,
                            damage: 7
                        });
                        break;
                    case PRIMARY_WEAPONS.M4:
                        for (let i = 0; i < 9; i++) {
                            new Bullet(scene, {
                                x: this.x,
                                y: this.y,
                                targetX: pointer.x,
                                targetY: pointer.y,
                                spread: 12,
                                speed: randomFloat(12, 17)
                            });
                        }
                }

            });
    }

    preUpdate(time, delta) {
        let h_move = this.input.right.isDown - this.input.left.isDown;
        let v_move = this.input.down.isDown - this.input.up.isDown;

        this.h_speed += h_move * this.player_acceleration;
        this.h_speed = clamp(this.h_speed, -200, 200);
        this.v_speed += v_move * this.player_acceleration;
        this.v_speed = clamp(this.v_speed, -200, 200);



        if (h_move == 0) {
            if (Math.abs(this.h_speed) < 5) {
                this.h_speed = 0;
            }
            else {
                this.h_speed *= 0.95;
            }
        }

        if (v_move == 0) {
            if (Math.abs(this.v_speed) < 5) {
                this.v_speed = 0;
            }
            else {
                this.v_speed *= 0.95;
            }
        }


        this.setVelocityX(this.h_speed);
        this.setVelocityY(this.v_speed);


        this.scene.children.list.forEach((child) => {
            // Die from zombie touch
            if (child instanceof Zombie) {
                const distanceToZombie = distance_to_point(this.x, this.y, child.x, child.y);
                if (distanceToZombie < 32) {
                    alert("Game over");
                    window.location.reload();
                    this.destroy();
                }
            }

            // Pickup item on touch
            if (child instanceof Item) {
                const distanceToZombie = distance_to_point(this.x, this.y, child.x, child.y);
                if (distanceToZombie < 32 && Phaser.Input.Keyboard.JustDown(this.input.interact)) {
                    if (this.primaryWeapon) {
                        new Item({ x: this.x, y: this.y + 32, type: this.primaryWeapon }, this.scene);
                    }
                    this.primaryWeapon = child.type;
                    child.destroy();

                }
            }

        });



    }

}

export default Player;