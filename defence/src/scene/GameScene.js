import { Scene } from 'phaser';
import Monster from '../component/Monster';
import Unit from '../component/Unit';
import Bullet from '../component/Bullet';

var Units;
var Monsters;
var Level;
var SpawnCount;

function GetDamage() {
  return parseInt(9 + 1.2 * (Level * Level * 0.2 + 0.5 * Level));
}

function GetMonsterSpawnTime() {
  return 0.03 + (Level - 1) * 0.0005;
}

function GetEmpty(board) {
  let empty = new Array(); // 빈 자리
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (board[x][y] === undefined) {
        empty.push({ x, y });
      }
    }
  }
  return empty;
}

function SpawnUnit(board) {
  let empty = GetEmpty(board);
  if (empty.length > 0) {
    let coordinate = empty[Phaser.Math.Between(0, empty.length - 1)];
    let unit = Units.get();
    if (unit) {
      board[coordinate.x][coordinate.y] = unit;

      unit.spawn({ coordinate: coordinate }); //, type: GetRandomUnitType() });
    }
  }
}

class GameScene extends Scene {
  constructor() {
    super('gameScene');
  }

  create() {
    console.log('%c Game ', 'background: green; color: white; display: block;');
    SpawnCount = 0;
    Level = 1;
    this.game.GameOver = false;
    this.game.HP = 3;
    this.game.Gold = 10;
    this.game.UnitPrice = 1;
    this.game.UnitSpawnOrder = 0;
    this.game.SelectedUnit = undefined;
    this.game.Board = new Array(4);
    this.rankText = new Array(4);
    for (let i = 0; i < 4; i++) {
      this.game.Board[i] = new Array(4);
      this.rankText[i] = new Array(4);
    }
    this.game.UnitLevel = new Array(this.game.UnitTypeList.length);
    this.game.UnitLevelPrice = new Array(this.game.UnitTypeList.length);
    this.goldCurrent = 0;

    this.add.image(0.5 * this.game.PIXELPERUNIT, 5 * this.game.PIXELPERUNIT, 'gold');
    this.add.image(0, 0, 'background').setOrigin(0);
    this.add.image(0, 0, 'gold').setOrigin(0);
    //this.add.image(0, 0, 'select').setOrigin(0);

    this.selected = this.add.image(0, 0, 'select').setOrigin(0).setVisible(true);

    this.hpText = this.add
      .bitmapText(5.5 * this.game.PIXELPERUNIT, 5.5 * this.game.PIXELPERUNIT, 'nokia', 'NULL', 10)
      .setOrigin(0.5)
      .setDepth(1);
    this.goldText = this.add
      .bitmapText(1.25 * this.game.PIXELPERUNIT, 0.2 * this.game.PIXELPERUNIT, 'nokia', 'NULL', 10)
      .setOrigin(0)
      .setDepth(1);
    this.priceText = this.add
      .bitmapText(5.5 * this.game.PIXELPERUNIT, 6.5 * this.game.PIXELPERUNIT, 'nokiaBlack', 'NULL', 10)
      .setOrigin(0.5)
      .setDepth(1);
    this.levelText = this.add
      .bitmapText(3 * this.game.PIXELPERUNIT, 0.5 * this.game.PIXELPERUNIT, 'nokia', 'NULL', 10)
      .setOrigin(0.5)
      .setDepth(1);
    this.spawnEvent = this.time.addEvent({ delay: 2 * this.game.SECOND, callback: this.spawnMonster, callbackScope: this, loop: true });
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        this.rankText[x][y] = this.add
          .bitmapText((x + 1.5) * this.game.PIXELPERUNIT, (y + 2.5) * this.game.PIXELPERUNIT, 'nokiaBlack', '', 10)
          .setOrigin(0.5);
        this.rankText[x][y].setDepth(1);
      }
    }
    this.game.Path = new Phaser.Curves.Path(0.5 * this.game.PIXELPERUNIT, 5.5 * this.game.PIXELPERUNIT)
      .lineTo(0.5 * this.game.PIXELPERUNIT, 1.5 * this.game.PIXELPERUNIT)
      .lineTo(5.5 * this.game.PIXELPERUNIT, 1.5 * this.game.PIXELPERUNIT)
      .lineTo(5.5 * this.game.PIXELPERUNIT, 5.5 * this.game.PIXELPERUNIT);
    this.cursors = this.input.keyboard.createCursorKeys();
    //
    Monsters = this.physics.add.group({
      // Phaser.GameObjects.Group -> PhysicsGroup
      classType: Monster,
      maxSize: 20,
      runChildUpdate: true,
    });
    Units = this.physics.add.group({
      classType: Unit,
      maxSize: 16,
      runChildUpdate: true,
    });
    this.bullets = this.physics.add.group({
      classType: Bullet,
      immovable: true,
      maxSize: 500,
      runChildUpdate: true,
    });

    this.physics.add.overlap(this.bullets, Monsters, this.hitBullet, null, this);

    this.add
      .image(5 * this.game.PIXELPERUNIT, 6 * this.game.PIXELPERUNIT, 'gold')
      .setOrigin(0)
      .setInteractive()
      .on('pointerup', this.newUnit, this);

    this.unitLevelText = new Array(this.game.UnitTypeList.length);
    for (let i = 0; i < this.game.UnitTypeList.length; i++) {
      this.unitLevelText[i] = this.add
        .bitmapText((i + 0.5) * this.game.PIXELPERUNIT, 6.5 * this.game.PIXELPERUNIT, 'nokiaBlack', 'NULL', 10)
        .setOrigin(0.5)
        .setDepth(1);
      this.game.UnitLevel[i] = 1;
      this.game.UnitLevelPrice[i] = 10;
      this.add
        .image(i * this.game.PIXELPERUNIT, 6 * this.game.PIXELPERUNIT, this.game.UnitTypeList[i])
        .setOrigin(0)
        .setInteractive()
        .on('pointerup', function () {
          console.log(Units);
          if (this.scene.game.Gold >= this.scene.game.UnitLevelPrice[i]) {
            this.scene.game.Gold -= this.scene.game.UnitLevelPrice[i];
            this.scene.game.UnitLevelPrice[i] *= 2;
            let unitList = Units.getChildren();
            if (unitList) {
              for (let i = 0; i < unitList.length; i++) {
                unitList[i].updateUnit(); // 유닛의 목표를 가까운 몬스터로
              }
            }
          }
        });
    }

    // Mouse Over Event
    this.input.on('gameobjectover', function (pointer, gameObject) {
      gameObject.setTint(0x7878ff);
    });

    this.input.on('gameobjectout', function (pointer, gameObject) {
      gameObject.clearTint();
    });

    // UI
    this.fullscreen = this.add
      .image(5 * this.game.PIXELPERUNIT, 0, 'fullScreen')
      .setOrigin(0)
      .setInteractive();

    // Restart
    this.input.keyboard.addKey('R').on(
      'down',
      function () {
        this.game.HP = 0;
      },
      this
    );

    // FullScreen
    this.input.keyboard.addKey('F').on(
      'down',
      function () {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
          this.fullscreen.setFrame(0);
        } else {
          this.scale.startFullscreen();
          this.fullscreen.setFrame(1);
        }
      },
      this
    );

    this.fullscreen.on(
      'pointerup',
      function () {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
          this.fullscreen.setFrame(0);
        } else {
          this.scale.startFullscreen();
          this.fullscreen.setFrame(1);
        }
      },
      this
    );
  }

  update(time, delta) {
    // Update Target
    let monster = this.getNearestMonster(); // 가장 가까운 몬스터를 탐색
    let unitList = Units.getChildren(); // 유닛 리스트를 전부 가져옴
    if (unitList) {
      for (let i = 0; i < unitList.length; i++) {
        unitList[i].target = monster; // 유닛의 목표를 가까운 몬스터로
      }
    }

    // Selected Unit Effect
    if (this.game.SelectedUnit === undefined) {
      this.selected.setVisible(false);
    } else {
      this.selected.setVisible(true);
      this.selected.setPosition(
        (this.game.SelectedUnit.coordinate.x + 1) * this.game.PIXELPERUNIT,
        (this.game.SelectedUnit.coordinate.y + 2) * this.game.PIXELPERUNIT
      );
    }

    if (this.game.UnitSpawnOrder > 0) {
      this.game.UnitSpawnOrder--;
      SpawnUnit(this.game.Board);
    }

    //Game Over Check
    if (this.game.HP <= 0 && !this.game.GameOver) {
      this.gameOver();
    }

    // Display Gold
    if (this.goldCurrent < this.game.Gold) {
      this.goldCurrent++;
    } else if (this.goldCurrent > this.game.Gold) {
      this.goldCurrent--;
    }
    this.goldCurrent = parseInt(this.goldCurrent);

    // UI
    this.hpText.setText(this.game.HP);
    this.goldText.setText(this.goldCurrent);
    this.priceText.setText(this.game.UnitPrice);
    this.levelText.setText(this.game.Level);
    for (let i = 0; i < this.game.UnitTypeList.length; i++) {
      this.unitLevelText[i].setText(this.game.UnitLevelPrice[i]);
    }

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.game.Board[x][y] === undefined || this.game.Board[x][y].active === false) {
          this.rankText[x][y].setText('');
          continue;
        } else {
          this.rankText[x][y].setText(this.game.Board[x][y].rank);
        }
      }
    }
  }

  gameOver() {
    this.game.HP = 0;
    this.game.GameOver = true;
    this.game.Cash += parseInt(Level * 1.5);
    this.physics.pause();
    console.log('%c GameOver ', 'background: red; color: white; display: block;');
    this.add
      .bitmapText(3 * this.game.PIXELPERUNIT, 1.5 * this.game.PIXELPERUNIT, 'nokia', 'Game Over', 10)
      .setOrigin(0.5)
      .setDepth(1);

    this.input.once(
      'pointerup',
      function () {
        this.scene.restart();
      },
      this
    );
  }

  //
  spawnMonster() {
    SpawnCount++;
    if (SpawnCount * 0.1 > Level - 1) {
      Level = parseInt(SpawnCount * 0.1) + 1;
    }
    let monster = Monsters.get();
    if (monster) {
      let data = { speed: GetMonsterSpawnTime(), hp: GetDamage() };
      monster.spawn(data);
    }
  }

  getNearestMonster() {
    let mobs = Monsters.getChildren();
    let monster = mobs[0];
    for (let i = 0; i < mobs.length; i++) {
      if (mobs[i].getData('position') > monster.getData('position')) {
        nearestMob = mobs[i];
      }
    }
    return monster;
  }

  hitBullet(bullet, monster) {
    monster.hp -= bullet.strength;
    bullet.destroy();
  }

  newUnit() {
    if (this.game.Gold >= this.game.UnitPrice) {
      let empty = GetEmpty(this.game.Board); // 빈 자리
      if (empty.length > 0) {
        this.game.Gold -= this.game.UnitPrice; // 돈을 감산
        this.game.UnitPrice++;
        SpawnUnit(this.game.Board);
      }
    }
  }
}

export default GameScene;
