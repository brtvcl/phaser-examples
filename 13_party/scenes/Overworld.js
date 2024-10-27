import Player from '../entities/player';
import Tile from '../entities/tile';

class SceneOverworld extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneOverworld', active: true });
  }

  init() {
    this.data.values = {
      dice: 0,
      diceRolling: true,
      playerScores: {
        red: 0,
        blue: 0,
        green: 0,
        yellow: 0,
      },
    };
  }

  create() {
    // Create tiles as O path
    const padding = 80;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 15; j++) {
        if (i === 0 || i === 19 || j === 0 || j === 14) {
          new Tile(this, padding + i * 32, padding + j * 32);
        }
      }
    }

    const dice = this.data.values.dice;
    // Write dice roll to screen
    this.text = this.add.text(320, 240, 'Dice: ' + dice, { font: '16px Courier', fill: '#00ff00' });
  }

  update() {
    if (this.data.values.diceRolling) {
      // Randomly generate dice roll
      this.data.values.dice = Math.floor(Math.random() * 6) + 1;
      // Update dice roll
      this.text.setText('Dice: ' + this.data.values.dice);
    }

    // On click space bar, stop dice roll and move player
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 500)) {
      this.data.values.diceRolling = false;
    }
  }
}

export default SceneOverworld;
