import './style.css';
import Phaser from 'phaser';
import SceneOverworld from './scenes/Overworld.js';
import SceneMinigame from './scenes/Minigame.js';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#223344',
  scene: [SceneOverworld, SceneMinigame],
};

let game = new Phaser.Game(config);
