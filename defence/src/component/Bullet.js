import { Physics } from 'phaser';

class Bullet extends Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, null);
    this.setDepth(2);
  }

  preload() {}

  spawn(data) {
    this.setOrigin(0.5);
    this.setActive(true);
    this.setVisible(true);
    this.setTexture(data.texture);
    this.setSize(this.width, this.height, true);
    this.setPosition(data.parent.x, data.parent.y);
    this.target = data.target;
    this.speed = data.speed; //0.2;
    this.strength = data.strength;
  }

  create() {}

  update(time, delta) {
    if (this.target === undefined) {
      // || this.target.active === false) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    } else {
      let vector = new Phaser.Math.Vector2(this.target.x - this.x, this.target.y - this.y);
      if (vector.x < 1 && vector.x > -1 && vector.y < 1 && vector.y > -1) {
        this.target = undefined;
        return;
      }
      vector.normalize();
      vector.scale(this.speed);
      this.x += vector.x;
      this.y += vector.y;
    }
  }
}

export default Bullet;
