import { scaleValue } from "../helper/scaleValue";

const BULLET_DEFAULTS = {
    speed: 20,
    damage: 1,
};

class Bullet extends Phaser.GameObjects.Rectangle {
    
    // I don't know how these calculations work I just copied them from random places and pasted it here
    constructor (scene, {x, y, targetX, targetY, spread, damage, speed}) {
    
        super(scene, x, y, 10, 2, 0xffff00, 1);
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);

        // Bullet config
        this.damage = damage || BULLET_DEFAULTS.damage;
        this.speed = speed || BULLET_DEFAULTS.speed;

        // Move towards target
        let angleToTarget = Phaser.Math.Wrap((Math.atan2(this.y - targetY, this.x - targetX) * 180 / Math.PI + 180) * -1, 0, 360); 
        angleToTarget += spread;
        
        // Angle between right
        this.angleToRight = (angleToTarget < 180 ? angleToTarget : ( 180 + ( 180 - angleToTarget )));

        this.angleToUp =  angleToTarget === 270 ? 180 : (Math.abs((angleToTarget + 90) % 360 - 180) % 180);
        this.angle = -angleToTarget;

        // Destroy bullet after 3 seconds
        setTimeout(() => {
            this.destroy();
        }, 3000);
    }

    preUpdate (time, delta) {
        this.x += this.speed * Math.cos(this.angle * (Math.PI / 180));
        this.y += this.speed * Math.sin(this.angle * (Math.PI / 180));
    }

}

export { Bullet };