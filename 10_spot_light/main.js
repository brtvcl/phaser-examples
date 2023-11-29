import './style.css'
import phaser from "phaser";


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


let player;
let collision_group = [];
let cursors;
let h_speed = 0;
let v_speed = 0;
let logo;

let game = new Phaser.Game(config);

function preload() {
    this.load.image("phaser-logo", "./assets/phaser-logo.png");
    this.load.image("box", "./assets/box.png");
}
const PHASER_LOGO_KEY = 'phaser-logo';
function create() {

    // The player and its settings
    player = this.add.sprite(100, 450, "box");

    // logo 
    logo = this.add.sprite(200, 250, "phaser-logo");


    // Lighting
    const x = 200;
    const y = 250;
    const reveal = this.add.image(x, y, PHASER_LOGO_KEY)
    this.cover = this.add.image(x, y, PHASER_LOGO_KEY)
    this.cover.setTint(0x004c99)

    const width = this.cover.width
    const height = this.cover.height
    const rt = this.make.renderTexture({
        width,
        height,
        add: false
    })

    const maskImage = this.make.image({
        x,
        y,
        key: rt.texture.key,
        add: false
    })

    this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
    this.cover.mask.invertAlpha = true

    reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)

    this.light = this.add.circle(0, 0, 50, 0x000000, 1)
    this.light.visible = false

    this.renderTexture = rt

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

}

function update() {
    //Movement
    let h_move = cursors.right.isDown - cursors.left.isDown;
    let v_move = cursors.down.isDown - cursors.up.isDown;

    h_speed += h_move * 0.3;
    h_speed = clamp(h_speed, -4, 4);
    v_speed += v_move * 0.3;
    v_speed = clamp(v_speed, -4, 4);

    if (h_move == 0 && Math.abs(h_speed) < 0.3) {
        h_speed = 0;
    } else {
        h_speed *= 0.95;
    }

    if (v_move == 0 && Math.abs(v_speed) < 0.3) {
        v_speed = 0;
    } else {
        v_speed *= 0.95;
    }

    player.x += h_speed;
    player.y += v_speed;

    const lightX = player.x - this.cover.x + this.cover.width * 0.5
    const lightY = player.y - this.cover.y + this.cover.height * 0.5

    this.renderTexture.clear()
    this.renderTexture.draw(this.light, lightX, lightY)

}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}



