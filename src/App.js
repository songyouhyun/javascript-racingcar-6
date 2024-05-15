import {MissionUtils} from "@woowacourse/mission-utils";

class App {
  async play() {
    let playerNames = await MissionUtils.Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분\n');
    playerNames = playerNames.trim().split(',');

    // 이름은 5자 이하만 가능하다.
    playerNames.forEach((playerName) => {
      if (playerName.length >= 5) {
        throw new Error('[ERROR]')
      }
    })

    let attemptCount = await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    attemptCount = parseInt(attemptCount);

    if (attemptCount === NaN) {
      throw new Error('[ERROR] 숫자가 잘못된 형식입니다.')
    }

    let map = new Map();
    let advance;

    // 실행 결과 출력
    MissionUtils.Console.print('실행 결과');
    for (let i = 0; i < attemptCount; i++) {
      playerNames.forEach((playerName) => {

        advance = map.get(playerName);
        if (!advance) {
          advance = '';
        }

        const random = MissionUtils.Random.pickNumberInRange(1, 9);
        if (random >= 4) {
          advance += '-';
        }

        map.set(playerName, advance);
        MissionUtils.Console.print(`${playerName} : ${advance}`);
      })
      MissionUtils.Console.print('\n');
    }

    let champion = '';
    let max = 0;

    // 사용자별 전진 횟수를 비교해서 전진 횟수가 가장 큰 사용자 이름을 출력
    map.forEach((value, key) => {
      if (max < value.length) {
        max = value.length;
        champion = key;
      } else if (max === value.length) {
        champion += ', ' + key;
      }
    });

    MissionUtils.Console.print('최종 우승자 : ' + champion);
  }
}

export default App;
