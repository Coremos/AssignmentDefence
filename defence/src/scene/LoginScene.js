import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';
import { UNITTYPE } from '../UnitType';

function submitScore(username, count) {
  var data = 'username=' + username + '&count=' + count;

  var request = new XMLHttpRequest();
  request.open('POST', '/login.php', true);
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

class LoginScene extends Scene {
  constructor() {
    super('loginScene');
  }

  create() {
    console.log('%c Login ', 'background: blue; color: white; display: block;');

    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'Moris', '유닛을 선택하세요.', 12).setOrigin(0.5);
    this.add
      .bitmapText(3 * PIXELPERUNIT, 5 * PIXELPERUNIT, 'Moris', '시작', 12)
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
    this.idText = this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'Moris', '', 12).setOrigin(0);

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

export default LoginScene;
