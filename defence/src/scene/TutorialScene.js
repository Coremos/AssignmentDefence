import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';

class TutorialScene extends Scene {
  constructor() {
    super('tutorialScene');
  }
  create() {
    console.log('%c Tutorial ', 'background: red; color: white; display: block;');
    this.add.bitmapText(3 * PIXELPERUNIT, 1.5 * PIXELPERUNIT, 'nokia', 'Game Over', 10).setOrigin(0.5);

    this.input.once(
      'pointerup',
      function () {
        //this.scene.start('titleScene');
        this.input.stopPropagation();
        //this.scene.switch('titleScene');
        this.scene.resume('gameScene');
        this.scene.switch('gameScene');
      },
      this
    );
  }
}

export default TutorialScene;
