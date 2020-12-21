import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';
import { UNITTYPE } from '../UnitType';
import firebase from 'firebase/app';

//var database = firebase.database();
var SelectedUnit;

class MainScene extends Scene {
  constructor() {
    super('mainScene');
  }

  create() {
    console.log('%c Main ', 'background: blue; color: white; display: block;');

    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'nokia', 'Select Units', 10).setOrigin(0.5);
    this.add
      .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'nokia', 'Start', 10)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('gameScene');
        },
        this
      );

    this.descript = this.add.bitmapText(3 * PIXELPERUNIT, 5.5 * PIXELPERUNIT, 'nokia', 'NULL', 10).setOrigin(0.5);

    this.typeList = Array(5);
    for (let i = 0; i < this.game.UnitTypeList.length; i++) {
      this.typeList[i] = this.add
        .image(i * PIXELPERUNIT, 2 * PIXELPERUNIT, this.game.UnitTypeList[i])
        .setOrigin(0)
        .setInteractive()
        .on('pointerup', function () {
          if (SelectedUnit !== undefined && SelectedUnit !== this.scene.game.UnitTypeList[i]) {
            // console.log(this.scene.game.UnitTypeList);
            // console.log(this.scene.game.UnitTypeList.hasOwnProperty(SelectedUnit));
            // console.log(SelectedUnit);
            // console.log(this.scene.game.UnitTypeList.includes(SelectedUnit));
            if (this.scene.game.UnitTypeList.includes(SelectedUnit)) {
              //let overlap = Object.keys(this.scene.game.UnitTypeList).indexOf(SelectedUnit);
              let overlap = this.scene.game.UnitTypeList.indexOf(SelectedUnit);
              console.log(overlap);
              let thisType = this.scene.game.UnitTypeList[i];
              console.log(thisType);
              console.log(this.scene.typeList);
              this.scene.typeList[overlap].setTexture(UNITTYPE[thisType].texture);
              this.scene.game.UnitTypeList[overlap] = thisType;
            }
            this.scene.game.UnitTypeList[i] = SelectedUnit;
            this.setTexture(UNITTYPE[SelectedUnit].texture);
            console.log(this.scene.game.UnitTypeList);
          }
        });
    }

    this.list = new Array(6);
    for (let i = 0; i < Object.keys(UNITTYPE).length; i++) {
      this.list[i] = this.add
        .image(i * PIXELPERUNIT, 3 * PIXELPERUNIT, UNITTYPE[Object.keys(UNITTYPE)[i]].texture)
        .setOrigin(0)
        .setInteractive();
      this.list[i].key = Object.keys(UNITTYPE)[i];
      this.list[i]
        .on('pointerup', function () {
          SelectedUnit = this.key;
          console.log(this.key);
        })
        .on('pointerover', function () {
          this.scene.overUnit = this.key;
          this.setTint(0x7878ff);
        })
        .on('pointerout', function () {
          this.scene.overUnit = undefined;
          this.clearTint();
        });
    }
  }

  update() {
    if (this.overUnit) {
      if (this.currentUnit !== this.overUnit) {
        this.currentUnit = this.overUnit;
        this.descript.setText(UNITTYPE[this.overUnit].descript);
      }
    } else {
      this.descript.setText('');
    }
  }
}

export default MainScene;
