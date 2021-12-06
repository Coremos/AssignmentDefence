import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';
import { UNITTYPE } from '../UnitType';

function Regist(email, id, password) {
  var data = 'user_email=' + email + '&user_id=' + id + '&user_password=' + password;
  var request = new XMLHttpRequest();
  request.open('POST', '../register.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      // here you could go to the leaderboard or restart your game .
    } else {
      // We reached our target server, but it returned an error
    }
  };
  xhr.onreadystatechange = function () {
    text = xhr.responseText;
    scoreText.setText(text.replace(/\n/g, '<br />'));
    console.log(text);
  };
  request.send(data);
}

class RegisterScene extends Scene {
  constructor() {
    super('registerScene');
  }

  create() {
    console.log('%c Register ', 'background: blue; color: white; display: block;');
    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'Moris', '계정생성', 12).setOrigin(0.5);

    var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    var errorMessage = '';
    this.focusIndex = -1;
    this.isShift = false;

    // 키보드 입력 이벤트 함수 생성
    this.input.keyboard.on('keyup', this.anyKey, this);

    // 텍스트 생성
    this.add.bitmapText(0 * PIXELPERUNIT, 3.5 * PIXELPERUNIT, 'Moris', '이메일', 12);
    this.add.bitmapText(0 * PIXELPERUNIT, 2.5 * PIXELPERUNIT, 'Moris', '아이디', 12);
    this.add.bitmapText(0.5 * PIXELPERUNIT, 4.75 * PIXELPERUNIT, 'Moris', '암호', 12).setOrigin(0.5);

    this.add
      .bitmapText(3 * PIXELPERUNIT, 7.5 * PIXELPERUNIT, 'Moris', '생성', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerup', function () {}, this);

    // 입력 박스 3개 생성, 이메일, 아이디, 암호
    this.inputField = Array(3);
    for (let i = 0; i < this.inputField.length; i++) {
      this.inputField[i] = this.add.bitmapText(1.5 * PIXELPERUNIT, (2.5 + i) * PIXELPERUNIT, 'Moris', 'id', 12);

      this.add
        .rectangle(3 * PIXELPERUNIT, (2.75 + i) * PIXELPERUNIT, 3.5 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 0x222222, 0.8)
        .setInteractive()
        .setDepth(-1)
        .on(
          'pointerup',
          function () {
            this.focusIndex = i;
            console.log(this.focusIndex);
          },
          this
        );
    }

    // this.add
    //   .zone(152, 130, 320, 256)
    //   .setOrigin(0)
    //   .setInteractive()
    //   .on('pointermove', function (pointer) {
    //     if (pointer.isDown) {
    //       text.y += pointer.velocity.y / 10;
    //       text.y = Phaser.Math.Clamp(text.y, -400, 300);
    //     }
    //   });

    // this.add
    //   .bitmapText(5 * PIXELPERUNIT, 5.5 * PIXELPERUNIT, 'Moris', '인증', 12)
    //   .setOrigin(0)
    //   .setInteractive()
    //   .on(
    //     'pointerup',
    //     function () {
    //       if (regEmail.test(text) === true) {
    //         alert('입력된 값은 이메일입니다.');
    //       } else {
    //         alert('올바른 핸드폰/이메일을 입력해주세요.');
    //       }
    //     },
    //     this
    //   );
  }

  update() {}
  anyKey(event) {
    //  Only allow A-Z . and -

    let code = event.keyCode;

    if (code === Phaser.Input.Keyboard.KeyCodes.PERIOD) {
      this.pressKey();
    } else if (code === Phaser.Input.Keyboard.KeyCodes.MINUS) {
      this.pressKey();
    } else if (code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE || code === Phaser.Input.Keyboard.KeyCodes.DELETE) {
      this.pressKey();
    } else if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) {
      this.inputField[this.focusIndex].setText(this.inputField[this.focusIndex].text + String.fromCharCode(code));
      // code -= 65;
    } else if (code >= Phaser.Input.Keyboard.KeyCodes.ZERO && code <= Phaser.Input.Keyboard.KeyCodes.NINE) {
      this.inputField[this.focusIndex].setText(this.inputField[this.focusIndex].text + String.fromCharCode(code));
    }
  }
}

export default RegisterScene;
