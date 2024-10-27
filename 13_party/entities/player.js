import { playerMovement } from '../scripts/playerMove';
import { scriptLoader } from '../utils/scriptLoader';

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'box');
    scene.add.existing(this);
    this.player_acceleration = 20;
    this.h_speed = 0;
    this.v_speed = 0;
    this.input = scene.input.keyboard.addKeys({
      up: 'W',
      left: 'A',
      down: 'S',
      right: 'D',
      interact: 'E',
      reload: 'R',
      primary: Phaser.Input.Keyboard.KeyCodes.ONE,
      secondary: Phaser.Input.Keyboard.KeyCodes.TWO,
      healing: Phaser.Input.Keyboard.KeyCodes.THREE,
      util: Phaser.Input.Keyboard.KeyCodes.FOUR,
    });
  }

  preUpdate(time, delta) {
    scriptLoader.load([playerMovement], this);
  }
}

export default Player;
