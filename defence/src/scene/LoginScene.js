import { Scene } from 'phaser';
import { PIXELPERUNIT } from '../setting';
import { UNITTYPE } from '../UnitType';

var Message = '';

function Login(id, password) {
  var data = 'id=' + id + '&password=' + password;
  var request = new XMLHttpRequest();
  request.open('POST', './login.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
  request.onreadystatechange = function () {
    Message = request.responseText;
  };
}

class LoginScene extends Scene {
  constructor() {
    super('loginScene');
  }

  create() {
    console.log('%c Login ', 'background: blue; color: white; display: block;');

    this.add.bitmapText(3 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 'Moris', '로그인', 12).setOrigin(0.5);

    this.focusIndex = -1;
    this.isShift = false;

    // 키보드 입력 이벤트 함수 생성
    this.input.keyboard.on('keyup', this.anyKey, this);

    var uiPosition = 4.5;
    // 텍스트 생성
    this.messageBox = this.add.bitmapText(3 * PIXELPERUNIT, 2.5 * PIXELPERUNIT, 'Moris', '', 12).setOrigin(0.5);
    this.add.bitmapText(0 * PIXELPERUNIT, uiPosition * PIXELPERUNIT, 'Moris', '아이디', 12);
    this.add.bitmapText(0.5 * PIXELPERUNIT, (uiPosition + 1.25) * PIXELPERUNIT, 'Moris', '암호', 12).setOrigin(0.5);

    // 입력 박스 2개 생성, 이메일x, 아이디, 암호
    this.inputField = Array(2);
    for (let i = 0; i < this.inputField.length; i++) {
      this.inputField[i] = this.add.bitmapText(1.5 * PIXELPERUNIT, (uiPosition + i) * PIXELPERUNIT, 'Moris', '', 12);

      this.add
        .rectangle(3 * PIXELPERUNIT, (uiPosition + 0.25 + i) * PIXELPERUNIT, 3.5 * PIXELPERUNIT, 0.5 * PIXELPERUNIT, 0x222222, 0.8)
        .setInteractive()
        .setDepth(-1)
        .on(
          'pointerup',
          function () {
            this.focusIndex = i;
          },
          this
        );
    }

    // 로그인 버튼
    this.add
      .bitmapText(3 * PIXELPERUNIT, 7.5 * PIXELPERUNIT, 'Moris', '로그인', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          Login(this.inputField[0].text, this.inputField[1].text);
        },
        this
      );
    this.add
      .graphics()
      .fillStyle(0x222222, 0.8)
      .fillRect(2.25 * PIXELPERUNIT, 7.25 * PIXELPERUNIT, 1.5 * PIXELPERUNIT, 0.5 * PIXELPERUNIT)
      .setDepth(-1);

    // 이전 버튼
    this.add
      .bitmapText(0.5 * PIXELPERUNIT, 7.5 * PIXELPERUNIT, 'Moris', '이전', 12)
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function () {
          this.scene.start('titleScene');
        },
        this
      );
    this.add
      .graphics()
      .fillStyle(0x222222, 0.8)
      .fillRect(0 * PIXELPERUNIT, 7.25 * PIXELPERUNIT, 1 * PIXELPERUNIT, 0.5 * PIXELPERUNIT)
      .setDepth(-1);
  }

  update() {
    if (Message === 'failed') {
      this.messageBox.setText('로그인에 실패했습니다.');
      // if (Message === 'no_id') {
      //   this.messageBox.setText('아이디가 없습니다.');
      // } else if (Message === 'wrong_password') {
      //   this.messageBox.setText('암호가 다릅니다.');
    } else if (Message !== '') {
      // 데이터 파싱
      const arr = Message.split(' ');
      this.game.ID = arr[0];
      console.log(arr);

      for (let i = 0; i < this.game.UnitTypeList.length; i++) {
        this.game.UnitTypeList[i] = Object.keys(UNITTYPE)[parseInt(arr[1].charAt(i))];
        console.log(i + '번째는 ' + this.game.UnitTypeList[i] + '로 변화함');
      }
      // 여긴 아직 미개발구역
      //   this.game.HaveUnit = arr[1];
      this.game.Diamond = parseInt(arr[3]);
      console.log('돈은 ' + this.game.Diamond);
      this.game.HighScore = parseInt(arr[4]);
      this.scene.start('mainScene');
    }
  }
  anyKey(event) {
    let code = event.keyCode;
    if (code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE || code === Phaser.Input.Keyboard.KeyCodes.DELETE) {
      this.inputField[this.focusIndex].setText(this.inputField[this.focusIndex].text.slice(0, -1));
    } else if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) {
      this.inputField[this.focusIndex].setText(this.inputField[this.focusIndex].text + String.fromCharCode(code));
      // code -= 65;
    } else if (code >= Phaser.Input.Keyboard.KeyCodes.ZERO && code <= Phaser.Input.Keyboard.KeyCodes.NINE) {
      this.inputField[this.focusIndex].setText(this.inputField[this.focusIndex].text + String.fromCharCode(code));
    }
  }
}

export default LoginScene;
