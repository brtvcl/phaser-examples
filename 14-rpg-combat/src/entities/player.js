import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color) {
    super(scene, x, y, width, height, color);
    scene.add.existing(this); // Add the player to the scene

    this.speed = 200; // Player movement speed
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys('W,A,S,D');

    // Joystick properties
    this.joystickBase = scene.add.circle(100, 500, 100, 0x888888).setVisible(false);
    this.joystickThumb = scene.add.circle(100, 500, 50, 0xcccccc).setVisible(false);
    this.isDragging = false;
    this.initialDragPoint = { x: 0, y: 0 };

    // Set up pointer events for the joystick
    scene.input.on('pointerdown', this.handlePointerDown, this);
    scene.input.on('pointerup', this.handlePointerUp, this);
    scene.input.on('pointermove', this.handlePointerMove, this);

    // Circle to highlight the closest enemy
    this.closestEnemyCircle = scene.add.circle(0, 0, 50, 0xff0000, 0.3).setVisible(false);
  }

  handlePointerDown(pointer) {
    if (pointer.x < this.scene.scale.width / 2) {
      this.isDragging = true;
      this.initialDragPoint.x = pointer.x;
      this.initialDragPoint.y = pointer.y;
      this.joystickBase.setPosition(pointer.x, pointer.y).setVisible(true);
      this.joystickThumb.setPosition(pointer.x, pointer.y).setVisible(true);
    }
  }

  handlePointerUp() {
    this.isDragging = false;
    this.joystickBase.setVisible(false);
    this.joystickThumb.setVisible(false);
  }

  handlePointerMove(pointer) {
    if (this.isDragging) {
      this.joystickThumb.setPosition(pointer.x, pointer.y);
    }
  }

  update() {
    const enemies = this.scene.enemies;
    let velocityX = 0;
    let velocityY = 0;

    // Keyboard movement
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      velocityX = -1;
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      velocityX = 1;
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      velocityY = -1;
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      velocityY = 1;
    }

    // Normalize velocity
    const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    if (magnitude > 0) {
      velocityX = (velocityX / magnitude) * this.speed;
      velocityY = (velocityY / magnitude) * this.speed;
    }

    // Update player position based on keyboard input
    this.x += (velocityX * this.scene.game.loop.delta) / 1000;
    this.y += (velocityY * this.scene.game.loop.delta) / 1000;

    // Update player position based on joystick input
    if (this.isDragging) {
      const dx = this.joystickThumb.x - this.initialDragPoint.x;
      const dy = this.joystickThumb.y - this.initialDragPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      const force = Math.min(distance / 100, 1);
      this.x += (Math.cos(angle) * force * this.speed * this.scene.game.loop.delta) / 1000;
      this.y += (Math.sin(angle) * force * this.speed * this.scene.game.loop.delta) / 1000;
    }

    // Find the closest enemy and draw a circle around it if within 100px
    this.highlightClosestEnemy(enemies);
  }

  highlightClosestEnemy(enemies) {
    let closestEnemy = null;
    let closestDistance = Infinity;

    // Find the closest enemy
    for (const enemy of enemies) {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEnemy = enemy;
      }
    }

    // If a closest enemy is found and it's within 100px, draw a circle around it
    if (closestEnemy && closestDistance <= 200) {
      this.closestEnemyCircle.setPosition(closestEnemy.x, closestEnemy.y).setVisible(true);
    } else {
      this.closestEnemyCircle.setVisible(false);
    }
  }
}