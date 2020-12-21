import Phaser from 'phaser';
import PreloadScene from './scene/PreloadScene';
import LoadScene from './scene/LoadScene';
import GameScene from './scene/GameScene';
import TitleScene from './scene/TitleScene';
import TutorialScene from './scene/TutorialScene';
import MainScene from './scene/MainScene';

import { PIXELPERUNIT } from './setting';

const SCALE = {
  scope: { min: 1, max: 8 },
  default: { width: 6 * PIXELPERUNIT, height: 8 * PIXELPERUNIT },
};

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SCALE.default.width, //96,
    height: SCALE.default.height, //,112
    min: {
      width: SCALE.default.width * SCALE.scope.min,
      height: SCALE.default.height * SCALE.scope.min,
    },
    max: {
      width: SCALE.default.width * SCALE.scope.max,
      height: SCALE.default.height * SCALE.scope.max,
    },
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false,
      //debugShowBody: true, //true,
    },
  },
  backgroundColor: '#000000',
  scene: [PreloadScene, LoadScene, TitleScene, MainScene, TutorialScene, GameScene],
};

export { config };
