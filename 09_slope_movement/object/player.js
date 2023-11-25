import clamp from "../helper/clamp";
import { rectangle_to_rectangle } from "../helper/collision";

class Player extends Phaser.Physics.Arcade.Image {
    

    constructor (scene, x, y) {
        super(scene, x, y, "box");
        scene.add.existing(this)
        this.cursors = scene.input.keyboard.createCursorKeys();
		this.name = "player";
		this.data = {
			isTouchingGround: false,
			lastGroundTouchTime: Date.now(),
			isJumping: false,
			gravity: {
				x: 0,
				y: 0.8
			},
			velocity: {
				x: 0,
				y: 0
			},
			acceleration: {
				x: 0.5,
				y: 3,
			},
			friction: {
				x: 0.95,
				y: 0.95
			},
		}
    }

    preUpdate (time, delta) {
        let cursors = this.cursors;

		// Horizontal movement
        if (cursors.left.isDown) {
            this.data.velocity.x += -this.data.acceleration.x;
        } else if (cursors.right.isDown) {
            this.data.velocity.x += this.data.acceleration.x;
        }

		// Jumping
		if (cursors.up.isDown && this.data.isTouchingGround) {
			console.log("jump start", Date.now());
			this.data.isJumping = true;
		}

		if (cursors.up.isDown && this.data.isJumping) {
			this.data.velocity.y += -this.data.acceleration.y;
		}

		if (this.data.isJumping && this.data.lastGroundTouchTime + 110 < Date.now()) {
			console.log("jump end", Date.now());
			this.data.isJumping = false;
		} 



		// Apply friction
		this.data.velocity.x = this.data.velocity.x * this.data.friction.x;
		this.data.velocity.y = this.data.velocity.y * this.data.friction.y;

		// Apply gravity
		this.data.velocity.y += this.data.gravity.y;

		// Check collision
		this.data.isTouchingGround = false;
		this.scene.children.each((obj) => {
			if (obj.name == "wall") {
				let r1h = {
					x: this.x + this.data.velocity.x,
					y: this.y,
					w: this.width,
					h: this.height,
				};
				let r1v = {
					x: this.x,
					y: this.y + this.data.velocity.y,
					w: this.width,
					h: this.height,
				};

				let r1Ground = {
					x: this.x,
					y: this.y + 1,
					w: this.width,
					h: this.height,
				};
				
				let r2 = {
					x: obj.x,
					y: obj.y,
					w: obj.width,
					h: obj.height
				};

				// Horizontal collision
				if (rectangle_to_rectangle(r1h, r2)) {
					this.data.velocity.x = 0;
				}

				// Vertical collision
				if (rectangle_to_rectangle(r1v, r2)) {
					this.data.velocity.y = 0;
				}

				// Ground collision
				if (rectangle_to_rectangle(r1Ground, r2)) {
					this.data.isTouchingGround = true;
					this.data.lastGroundTouchTime = Date.now();
				}
			};
		});

		// Limit speed
		this.data.velocity.x = clamp(this.data.velocity.x, -5, 5);
		this.data.velocity.y = clamp(this.data.velocity.y, -20, 20);

		// 	Apply movement
		this.x += this.data.velocity.x;
		this.y += this.data.velocity.y;

    }

}

export default Player;