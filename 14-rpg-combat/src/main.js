import Phaser from 'phaser';
import Player from './entities/player'; // Import the Player class
import Enemy from './entities/enemy';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app', // Render the game in the HTML element with id 'app'
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  // No assets to load for now
}

function create() {
  // Create an instance of the Player class
  this.player = new Player(this, 400, 300, 50, 50, 0x00ff00);

  // Create the enemy and pass the player reference
  this.enemies = [];
  this.enemies.push(
    new Enemy(this, 600, 200, 50, 50, 0xff0000, this.player),
    new Enemy(this, 200, 200, 50, 50, 0xff0000, this.player),
  )
}

function update() {
  // Update the player and enemy
  this.player.update();
  this.enemies.forEach(e => {
    e.update();
  });
}