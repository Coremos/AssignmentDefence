import { Physics } from 'phaser';

class Monster extends Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, null);
    this.vector = new Phaser.Math.Vector2();
    this.position;
    this.speed;
    this.hp;
    this.maxHP;
    this.parent = scene;
  }

  spawn(data) {
    this.position = 0;
    this.speed = data.speed; //0.05;
    this.hp = this.maxHP = data.hp; //10;
    this.setOrigin(0.5);
    this.parent.game.Path.getPoint(0, this.vector);
    this.setPosition(this.vector.x, this.vector.y);
    this.setTexture('monster');
    this.setActive(true);
    this.setVisible(true);
    this.setSize(this.width * 0.5, this.height * 0.5, true);
  }

  update(time, delta) {
    if (this.hp <= 0) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
      this.parent.game.Gold += 1 + parseInt(0.1 * this.maxHP);
      return;
    }
    this.position += delta * this.parent.game.MILLISECOND * this.speed;
    if (this.position >= 1) {
      this.arrive();
      return;
    }
    this.parent.game.Path.getPoint(this.position, this.vector);
    this.setPosition(this.vector.x, this.vector.y);
    this.setDepth(this.position);
  }

  arrive() {
    this.parent.game.HP--;
    this.setActive(false);
    this.setVisible(false);
    this.destroy();
  }
}

export default Monster;
