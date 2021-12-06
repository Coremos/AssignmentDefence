import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';
import { UNITTYPE } from '../UnitType';

function submitScore(username, count) {
  var data = 'username=' + username + '&count=' + count;

  var request = new XMLHttpRequest();
  request.open('POST', '/setScore.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      // here you could go to the leaderboard or restart your game .
    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.send(data);
}

class RegisterScene extends Scene {
  constructor() {
    super('registerScene');
  }

  create() {
    console.log('%c Register ', 'background: blue; color: white; display: block;');

    this.add
      .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'Moris', '이메일', 12)
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
      .bitmapText(7 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'Moris', '인증', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('gameScene');
        },
        this
      );

    this.focusIndex = -1;
    this.idBox = this.add
      .graphics()
      .fillStyle(0x222222, 0.8)
      .fillRect(1.5 * PIXELPERUNIT, 4 * PIXELPERUNIT, 3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT)
      .setDepth(0);

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

  update() {}
}

export default RegisterScene;
