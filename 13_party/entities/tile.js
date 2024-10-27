import { playerMovement } from '../scripts/playerMove';
import { scriptLoader } from '../utils/scriptLoader';

class Tile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'wall');
    scene.add.existing(this);
  }
}

export default Tile;
