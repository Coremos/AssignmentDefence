import { Scene } from 'phaser';

class PreloadScene extends Scene {
  constructor() {
    super('preloadScene');
  }

  preload() {
    // Font
    this.load.bitmapFont('nokia', './font/nokia16.png');
    this.load.bitmapFont('nokiaBlack', './font/nokiaBlack.png');
  }

  create() {
    console.log('%c Preload ', 'background: green; color: white; display: block;');
    this.scene.start('loadScene');
  }
}

export default PreloadScene;
