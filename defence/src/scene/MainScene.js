import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';
import { UNITTYPE } from '../UnitType';
import firebase from 'firebase/app';

//var database = firebase.database();
var SelectedUnit;

function Save(id, unitTypeList, diamond, highScore) {
  console.log(id + '로 저장됐다.');
  var list = '';
  for (let i = 0; i < unitTypeList.length; i++) {
    for (let j = 0; j < Object.keys(UNITTYPE).length; j++) {
      if (unitTypeList[i] == Object.keys(UNITTYPE)[j]) {
        list = list + '' + j;
        break;
      }
    }
  }
  console.log(list + '로 변환완료');

  var data = 'id=' + id + '&unitTypeList=' + list + '&diamond=' + diamond + '&highScore=' + highScore;
  var request = new XMLHttpRequest();
  request.open('POST', './save.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
}

class MainScene extends Scene {
  constructor() {
    super('mainScene');
  }

  create() {
    console.log('%c Main ', 'background: blue; color: white; display: block;');

    // 한번 세이브
    if (this.game.ID !== '') {
      Save(this.game.ID, this.game.UnitTypeList, this.game.Diamond, this.game.HighScore);
    }

    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'Moris', '유닛 선택', 12).setOrigin(0.5);
    this.add
      .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'Moris', '게임 시작', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('gameScene');
        },
        this
      );

    // 다이아 출력부분
    this.add.image(0 * PIXELPERUNIT, 1 * PIXELPERUNIT, 'diamond').setOrigin(0);
    this.diamondText = this.add.bitmapText(1 * PIXELPERUNIT, 1 * PIXELPERUNIT, 'Moris', '', 12);

    this.descript = this.add.bitmapText(1.5 * PIXELPERUNIT, 6 * PIXELPERUNIT, 'Moris', 'NULL', 12).setMaxWidth(3 * PIXELPERUNIT);

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
        })
        .on('pointerover', function () {
          this.setTint(0x7878ff);
        })
        .on('pointerout', function () {
          this.clearTint();
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

    this.add
      .zone(152, 130, 320, 256)
      .setOrigin(0)
      .setInteractive()
      .on('pointermove', function (pointer) {
        if (pointer.isDown) {
          text.y += pointer.velocity.y / 10;
          text.y = Phaser.Math.Clamp(text.y, -400, 300);
        }
      });
  }

  update() {
    if (this.overUnit) {
      //if (this.currentUnit !== this.overUnit) {
      this.currentUnit = this.overUnit;
      this.descript.setText(UNITTYPE[this.overUnit].descript);
      //}
    } else {
      this.descript.setText('');
    }
    this.diamondText.setText(this.game.Diamond);
  }
}

export default MainScene;
