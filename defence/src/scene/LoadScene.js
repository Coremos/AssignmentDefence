import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';

class LoadScene extends Scene {
  constructor() {
    super('loadScene');
  }

  preload() {
    // Font
    this.load.bitmapFont('nokia', './font/nokia16.png');
    this.load.bitmapFont('nokiaBlack', './font/nokiaBlack.png');

    // Unit
    this.load.image('gold', './image/gold.png');
    this.load.image('plant', './image/plant.png');
    this.load.image('sugar', './image/sugar.png');
    this.load.image('egg', './image/egg.png');
    this.load.image('gem', './image/gem.png');
    this.load.image('orgol', './image/orgol.png');

    // Bullet
    this.load.image('sugarParticle', './image/sugarParticle.png');
    this.load.image('lightParticle', './image/lightParticle.png');
    this.load.image('littleGem', './image/littleGem.png');
    this.load.image('note', './image/note.png');

    // Monster
    this.load.image('monster', './image/book.png');

    // UI
    this.load.image('background', './image/gameBackground.png');
    this.load.image('pause', './image/pause.png');
    this.load.image('select', './image/select.png');
    this.load.spritesheet('fullScreen', './image/fullScreen.png', {
      frameWidth: PIXELPERUNIT,
      frameHeight: PIXELPERUNIT,
    });

    // Initialize
    this.add.bitmapText(3 * PIXELPERUNIT, 3.5 * PIXELPERUNIT, 'nokia', 'Defence', 10).setOrigin(0.5);

    let percentText = this.add
      .bitmapText(3 * PIXELPERUNIT, 4.25 * PIXELPERUNIT, 'nokia', 'NULL', 10)
      .setOrigin(0.5)
      .setDepth(1);
    let progressBar = this.add.graphics().setDepth(0);
    let progressBox = this.add
      .graphics()
      .fillStyle(0x222222, 0.8)
      .fillRect(2 * PIXELPERUNIT, 4 * PIXELPERUNIT, 2 * PIXELPERUNIT, 0.5 * PIXELPERUNIT)
      .setDepth(0);

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(2 * PIXELPERUNIT, 4 * PIXELPERUNIT, 2 * value * PIXELPERUNIT, 0.5 * PIXELPERUNIT);
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('fileprogress', function (file) {
      //console.log(file.src);
    });

    this.load.on('complete', function () {
      this.scene.add
        .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'nokia', 'Start', 10)
        .setOrigin(0.5)
        .setInteractive()
        .on(
          'pointerup',
          function () {
            this.scene.scene.start('titleScene');
          },
          this
        );
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
    });
  }

  create() {
    console.log('%c Load ', 'background: green; color: white; display: block;');
    //this.scene.start('titleScene');
  }
}

export default LoadScene;
