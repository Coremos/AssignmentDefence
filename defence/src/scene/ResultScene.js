import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';

class ResultScene extends Scene {
  constructor() {
    super('resultScene');
  }

  create() {
    console.log('%c Result ', 'background: blue; color: white; display: block;');
    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'Moris', '게임 결과', 12).setOrigin(0.5);

    this.add.bitmapText(3 * PIXELPERUNIT, 2.5 * PIXELPERUNIT, 'Moris', '최고기록 = ' + this.game.HighScore, 12).setOrigin(0.5);

    this.add
      .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'Moris', '재시작', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('gameScene');
        },
        this
      );

    this.add
      .bitmapText(3 * PIXELPERUNIT, 6 * PIXELPERUNIT, 'Moris', '돌아가기', 12)
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

export default ResultScene;
