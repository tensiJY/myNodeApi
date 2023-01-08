# 테스팅

1. mocha 및 chai 설치
2. package.json 수정

```
 "scripts": {
    "test": "mocha",
    "start": "nodemon app.js"
  },
```

3. npm test

- 설정한 테스트 등을 전체 실행
- mocha가 디폴트로 test라는 폴더를 찾음

4. test 폴더에 테스트 코드를 가질 파일을 정의

- js 파일을 생성
- 테스트 코드는 it()으로 시작
  - 첫 번째는 테스트를 설명하는 제목 -> 성공 여부를 구별하는데 도움을 줌
  - 두 번째는 함수를 넣어야 함
    const except = require(`chai`).expect;

```
/**
테스트 코드는 it()으로 시작
첫 번째는 테스트를 설명하는 제목 -> 성공 여부를 구별하는데 도움을 줌
두 번째는 함수를 넣어야 함
테스트가 성공했는지 확인하는 여부
  - 모카는 테스트를 실행하고, 테스트 코드를 정의하는 it 함수를 제공
  - 차이는 성공 조건을 정의하는 역할 : Should와 Except 테스트 조건을 작성하는 방법에 차이가 있음
expect()를 입력하고, function 안에 테스트하고자 하는 코드나 결과를 인수로 전달 해야함
*/
it(`should add numbers correctly`, function () {
  const num1 = 2;
  const num2 = 3;
  except(num1 + num2).to.equal(5);
});

it(`should not give a result to 6`, function () {
  const num1 = 2;
  const num2 = 3;
  except(num1 + num2).not.to.equal(6);
});
```

- 유닛테스트
  : 함수를 실행
  : 모든 유닛 테스트가 성공 했다면, 전체 애플리케이션이 제대로 작동할 가능성이 높음

- 통합테스트
  : 여러 모듈을 모아 의도대로 협력하는지 확인하는지 테스트
  : 외부 라이브러리 까지 검증할 때 사용

### mocha

```
npm install --save-dev mocha
```

### chai

```
npm install --save-dev chai
```

- Mocha기반 테스트 코드를 작성할 때 제가 자주 쓰는 Assertion 모듈인 chai에 대해서 알아보겠습니다.
  chai란 Node.js 기반의 Assertion 라이브러리로 BDD와 TDD 스타일을 지원하고 있으며, Should, Expect, Assert 와 같은 인터페이스를 제공합니다.

### sinon

- stub lib

```
npm install --save-dev sinon
```

- 참고

* 프레임워크 툴

```
https://mochajs.org/
```

- assertion lib

```
https://www.chaijs.com/
```

## 테스트 하지 말아야 할것

- 외부 디펜던시 라이브러리
- JWT token
- jwt.vertify() 의 정상작동 과 관련해서는 테스트를 하지 않는다. 우리가 만든 라이브러리가 아니기 때문에
- 다만 테스트 해야하는 것은, 우리의 코드가 올바르게 작동하는지 만을 테스트함
- 오류가 나는 값을 true인지 확인하는 정도. 즉 throw 로 확인

## sinon - stubs

```
npm install --save-dev sinon
```

흔히 단위테스트 과정에서 아래의 3가지 경우 스텁함수를 사용합니다.

1. 구현이 되지 않은 함수거나 라이브러리에서 제공하는 함수
2. 함수가 반환하는 값을 임의로 생성
3. 복잡한 논리 흐름을 가지는 경우 테스트를 단순화할 목적으로 사용

- 검증 메소드를 보다 단순한 메서드로 교체

링크
https://sinonjs.org/
https://tiffany.devpools.kr/2018/03/19/sinon/

## mocha 리포팅 툴

```
npm install --save-dev mochawesome
```

```
  "scripts": {
    "test": "mocha",
    "test:report": "mocha --reporter mochawesome --reporter-options reportDir=report,reportFilename=report",
    "start": "nodemon app.js"
  },
```

링크
https://github.com/adamgruber/mochawesome
