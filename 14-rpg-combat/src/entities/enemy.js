import Phaser from 'phaser';

export default class Enemy extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color, player) {
    super(scene, x, y, width, height, color);
    scene.add.existing(this); // Add the enemy to the scene

    this.speed = 100; // Enemy movement speed
    this.player = player; // Reference to the player entity
    this.followDistance = 300; // Distance within which the enemy will follow the player
  }

  update() {
    // Calculate the distance between the enemy and the player
    const dx = this.player.x - this.x;
    const dy = this.player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the player is within the follow distance, move towards them
    if (distance <= this.followDistance && distance > 0) {
      // Normalize the direction vector
      const directionX = dx / distance;
      const directionY = dy / distance;

      // Move the enemy towards the player
      this.x += directionX * this.speed * (this.scene.game.loop.delta / 1000);
      this.y += directionY * this.speed * (this.scene.game.loop.delta / 1000);
    }
  }
}