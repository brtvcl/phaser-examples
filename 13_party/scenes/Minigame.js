import Player from '../entities/player';

class SceneMinigame extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMinigame' });
    this.text;
    this.data = {
      timer: 30,
      score: 0,
    };
  }

  create() {
    // Create player at 350, 300
    new Player(this, 350, 300);
    // Write 30 second timer to screen
    this.text = this.add.text(10, 10, 'Time: 30', { font: '16px Courier', fill: '#00ff00' });

    setInterval(() => {
      // Decrement timer
      this.text.setText('Time: ' + this.data.timer);
      this.data.timer--;
      // If timer reaches 0, return to overworld

      if (this.data.timer === 0) {
        this.scene.stop('SceneMinigame');
        this.scene.start('SceneOverworld');
      }
    }, 1000);
  }
}

export default SceneMinigame;
