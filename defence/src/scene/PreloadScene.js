import { Scene } from 'phaser';

// 폰트를 로드하기 위한 씬
class PreloadScene extends Scene {
  constructor() {
    super('preloadScene');
  }

  preload() {
    // Font
    this.load.bitmapFont('nokia', './font/nokia16.png');
    this.load.bitmapFont('nokiaBlack', './font/nokiaBlack.png');
    this.load.bitmapFont('Moris', './font/Moris.png');
  }

  create() {
    console.log('%c Preload ', 'background: green; color: white; display: block;');
    this.scene.start('loadScene');
  }
}

export default PreloadScene;
