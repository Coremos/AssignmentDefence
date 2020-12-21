import Phaser, { Game } from 'phaser';

import { config } from './config';

const PIXELPERUNIT = 24;

const SECOND = 1000;
const MILLISECOND = 1 / SECOND;

const PIXEL = 1 / PIXELPERUNIT;

const MAXUNITCOUNT = 5;

var game = new Game(config);
game.PIXELPERUNIT = PIXELPERUNIT;
game.SECOND = SECOND;
game.MILLISECOND = MILLISECOND;
game.PIXEL = PIXEL;
game.MAXUNITCOUNT = MAXUNITCOUNT;
game.Cash = 0;
game.UnitTypeList = ['plant', 'gem', 'egg', 'orgol', 'sugar'];
