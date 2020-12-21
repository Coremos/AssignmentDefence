import { Physics } from 'phaser';
import { UNITTYPE } from '../UnitType';

class Unit extends Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, null);
    this.type;
    this.attack;
    this.attackSpeed;
    this.attackTimer;
    this.speed;
    this.strength;
    this.target;
    this.coordinate;
    this.childrens;
    this.rank;
    this.bulletTexture;
    this.parent = scene;
  }

  spawn(data) {
    this.setOrigin(0.5);
    this.setActive(true);
    this.setVisible(true);
    this.type = this.getRandomUnitType(); //data.type;
    this.rank = 1;
    this.attackSpeed = 1;
    this.attackTimer = 0;
    this.strength = 1;
    this.speed = 0.2;
    this.updateUnit();
    this.setSize(this.parent.game.PIXELPERUNIT, this.parent.game.PIXELPERUNIT, true);
    //this.setSize(this.width, this.height, true);
    //this.removeInteractive();
    this.setInteractive(); // 이게 setSize보다 먼저 호출되면 크기가 이상하게 된다
    this.on('pointerup', this.clickUnit);
    this.coordinate = data.coordinate;
    this.setPosition((data.coordinate.x + 1.5) * this.parent.game.PIXELPERUNIT, (data.coordinate.y + 2.5) * this.parent.game.PIXELPERUNIT);
    this.target = data.target;
    this.rank = 1;
    this.alpha = 0;
  }

  update(time, delta) {
    for (let i = 0; i < this.childrens.length; i++) {
      if (!this.childrens[i].active) {
      }
      if (this.target !== undefined) {
        this.childrens[i].target = this.target;
      }
    }
    if (this.alpha < 1) {
      this.alpha += delta * this.parent.game.MILLISECOND * 2;
      //   setAlpha(this.alpha + delta * MILLISECOND);
    }
    if (this.target === undefined && this.type !== 'plant') {
      this.attackTimer = 0;
    } else {
      this.attackTimer += delta * this.parent.game.MILLISECOND;
      if (this.attackTimer >= this.attackSpeed) {
        this.attackTimer -= this.attackSpeed;
        if (!this.attack) {
          if (this.type === 'plant') {
            console.log('Got Money! ' + this.strength);
            this.parent.game.Gold += parseInt(Math.round(this.strength));
          }
          return;
        }

        let bullet = this.parent.bullets.get();
        if (bullet) {
          bullet.spawn({ parent: this, target: this.target, speed: this.speed, strength: this.strength, texture: this.bulletTexture });
          this.childrens.push(bullet);
        }
      }
    }
  }

  getUnitLevel(name) {
    for (let i = 0; i < this.parent.game.UnitTypeList.length; i++) {
      if (this.parent.game.UnitTypeList[i] === name) {
        return this.parent.game.UnitLevel[i];
      }
    }
    return undefined;
  }

  getRandomUnitType() {
    return this.parent.game.UnitTypeList[Phaser.Math.Between(0, this.parent.game.UnitTypeList.length - 1)];
  }

  updateUnit() {
    this.childrens = new Array();
    let data = UNITTYPE[this.type];
    this.attack = data.attack;
    //this.attackSpeed = data.attackSpeed - data.attackSpeedIncrease * (this.rank - 1);
    let level = this.getUnitLevel(this.type);
    this.attackSpeed = 1 / (data.attackSpeed + data.attackSpeedIncrease * this.rank * level);
    //console.log('before ' + this.strength);
    this.strength = data.strength + data.strengthIncrease * this.rank * level;
    //console.log('after ' + this.strength);
    if (this.attack) {
      this.speed = data.speed + data.speedIncrease * this.rank * level;
      this.bulletTexture = data.bulletTexture;
    }

    // this.setAlpha(0);
    this.setTexture(data.texture);
  }

  removeUnit() {
    this.setActive(false);
    this.setVisible(false);
    this.destroy();
    this.parent.game.Board[this.coordinate.x][this.coordinate.y] = undefined; // 보드에서 삭제
  }

  clickUnit() {
    if (this.parent.game.SelectedUnit === undefined) {
      this.parent.game.SelectedUnit = this;
      //console.log('Unit Selected');
    } else if (this.parent.game.SelectedUnit === this) {
      this.parent.game.SelectedUnit = undefined;
      //console.log('Cancled Select');
    } else {
      //console.log('evolutionCheck');
      if (this.parent.game.SelectedUnit.type === this.type || this.parent.game.SelectedUnit.type === 'gem') {
        if (this.parent.game.SelectedUnit.rank === this.rank) {
          switch (this.type) {
            case 'egg':
              this.parent.game.UnitSpawnOrder += this.rank;
              break;
            case 'gold':
              this.parent.game.Gold += parseInt(Math.round(this.strength * 2));
              break;
          }
          this.strength += this.parent.game.SelectedUnit.strength;
          this.rank++;
          this.type = this.getRandomUnitType();
          this.alpha = 0;
          this.updateUnit();
          this.attackTimer = 0;
          this.parent.game.SelectedUnit.removeUnit();
        }
      }
      this.parent.game.SelectedUnit = undefined;
    }
    //console.log(SelectedUnit);
  }
}

export default Unit;
