import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';

class TitleScene extends Scene {
  constructor() {
    super('titleScene');
    //Phaser.Scene.call(this, { key: 'titleScene', active: false });
  }

  create() {
    console.log('%c Title ', 'background: blue; color: white; display: block;');
    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'nokia', 'Assignment Defence', 10).setOrigin(0.5);
    this.add
      .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'nokia', 'Start', 10)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('mainScene');
        },
        this
      );
  }
}

export default TitleScene;
