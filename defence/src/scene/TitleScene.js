import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';

class TitleScene extends Scene {
  constructor() {
    super('titleScene');
    //Phaser.Scene.call(this, { key: 'titleScene', active: false });
  }

  create() {
    console.log('%c Title ', 'background: blue; color: white; display: block;');
    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'Moris', 'Assignment Defence', 12).setOrigin(0.5);
    this.add
      .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'Moris', '계정생성', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('registerScene');
        },
        this
      );

    this.add
      .bitmapText(3 * PIXELPERUNIT, 6 * PIXELPERUNIT, 'Moris', '로그인', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('loginScene');
        },
        this
      );
    this.add
      .bitmapText(3 * PIXELPERUNIT, 7 * PIXELPERUNIT, 'Moris', '게스트', 12)
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
