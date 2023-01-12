# 환경 설정 및 구성파일

1. 환경설정 구성

- 개발 : .env.development
- 운영 : .env.production

2. eslint + prettier 적용

3. lib package

# Node 실행

## run dev

```
npm run dev
```

## run production

```
npm run start
```

# lib

## express

express

```
npm install express --save
```

## dev tools

nodemon

```
npm install nodemon --save
```

## eslint

```
npm install eslint --save-dev
```

## prettier

```
npm install prettier --save-dev --save-exact
```

##

```
npm install eslint-config-prettier --save-dev
```

```
npm install eslint-plugin-prettier --save-dev
```

## env

```
npm i dotenv --save
```

## logger

winston : 로그 파일 및 로그 레벨 관리 모듈
winston-datily-rotate-file : 매일 날짜 별로 로그 파일 생성 및 관리 모듈 ( 시간이 지나면 자동으로 삭제 & 압축 관리 )
morgan : request 요청 로깅 미들웨어

```
npm install winston --save
```

```
npm install winston-daily-rotate-file --save
```

```
npm install morgan --save
```

## swagger

swagger-jsdoc : jsdoc주석으로 Swagger API 문서를 표현하기 위해 사용

swagger-ui-express: swagger-ui와 express를 연결하기 위해 사용

```
npm install swagger-jsdoc swagger-ui-express --save-dev
```

## cors

## robots

https://www.npmjs.com/package/express-robots-txt

```
npm i express-robots-txt
```

## multer

file upload

```
npm install
```

##

```
npm install crypto-js
```

```
npm install bcrypt
```

- 통신 인터페이스 사양서
  AES, CBC, pKCS_PADDING
  : 노드의 cryptojs에서의 aes는 cbc와pkcs7 기본값
  : https://github.com/brix/crypto-js/blob/develop/docs/QuickStartGuide.wiki#AES

## 공유메모리 정리 중

공유메모리

    https://www.makarenalabs.com/shared-memory-nodejs/
    https://github.com/MakarenaLabs/Shared-Memory-NodeJS-Demo-Server

    https://dasima.xyz/%EC%9C%88%EB%8F%84%EC%9A%B0-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%84%A4%EC%B9%98-%EA%B2%BD%EB%A1%9C-%EC%A7%80%EC%A0%95-%EC%8B%A4%ED%96%89/
    https://m.blog.naver.com/remocon33/221580633458


    파이썬311
    node-gyp

node-gyp는 python과 visual studio build tools에 의존
npm install -g yarn
yarn global add windows-build-tools
npm config set msvs_version 2017
npm config set python /path/to/executable/python
npm install --global node-gyp

## 확인

암호화 형식

- 통신 인터페이스 사양서
  AES, CBC, pKCS_PADDING
  : 노드의 cryptojs에서의 aes는 cbc와pkcs7 기본값
  : https://github.com/brix/crypto-js/blob/develop/docs/QuickStartGuide.wiki#AES

로그 기록
 로그는 폴더로 관리하며 동일한 규칙을 갖도록 한다.
 운영 폴더 하단에 Log 폴더를 가진다.
 Log폴더 하단에 드라이버 명칭의 폴더를 갖는다.
 드라이버 명칭 폴더 하단에 년월일.Log의 파일을 생성하여 관리하도록 한다.

- 파일의 로그 기록 규칙
  INFO 각 펑션의 진입/진출 기록
  DEBUG 함수내의 데이터 변경 기록
  ERR 함수내의 에러 및 Catch 에러 기록

  - Unit 테스트

1. 통신허브, 빌더, 통신드라이버 Unit 테스트 검증 적용
   검증툴 : Mocha 툴 적용
   테스트 프레임워크 : Mocha
   테스트 결과와 조건을 정의 : Chai /
   부작용 관리을 관리하고, 외부 디펜던시나 복잡한 시나리오를 다룰 때에는 Sinon

- 확인사항 : 범위 지정해야함

- 테스트 시나리오 작성 필요

2. SI 매니저 - 웹 성능검사를 위한 툴 적용을 해야합니다
   웹 성능 평가 : Artillery(아틸러리) 적용

참고
duration 은 테스트 진행 시간을 가르키고 rate 는 초당 요청을 의미하며 n 은 동시 접속 수를 의미한다.
즉 60초 동안 초당 10초, 동시 접속은 20으로 하여 테스트를 진행한다는 것이다

https://blog.outsider.ne.kr/1238
https://blog.sonim1.com/234
https://blog.hax0r.info/2020-04-19/stress-test-in-node-with-artillery/

- 실행파일로 빌드
  Node.js가 설치되어 있지 않은 환경에서 Node.js로 작성된 App을 실행시키려면,
  Standalone(독립형) 형태의 실행 파일로 배포하는 것이 유용합니다.

pkg 모듈을 사용하여 Node.js 런타임을 바이너리 실행파일(.exe)로 패키징이 가능합니다.

패키징 된 exe 파일은 Node.js가 설치되어 있지 않은 환경에서 실행할 수 있습니다.

참고
https://www.npmjs.com/package/pkg

# pkg 모듈 글로벌 설치

npm install pkg -g

# 실행파일(.exe) 생성

# -t 옵션 설정을 통해 Node.js 버전, OS, Bit 수를 지정할 수 있습니다.

pkg [파일] -t node10-win-x64

## cross-env

- https://www.npmjs.com/package/cross-env

```
npm install --save cross-env
```

```
{
  "scripts": {
    "build": "cross-env FIRST_ENV=one SECOND_ENV=two node ./my-program"
  }
}
```

## 보안모듈 헬멧 적용

```
npm install helmet --save
```

```
const express = require("express");
const helmet = require("helmet"); // 모듈 선언
const app = express();
app.use(helmet()); // 보안 기능 설정 완료
```

참고
https://www.npmjs.com/package/helmet
https://velog.io/@devjooj/NodeJS-EP-1.-%EB%B3%B4%EC%95%88-%EB%AA%A8%EB%93%88-helmet

## 에셋 압축

- css, js 압축

```
npm install --save compression
```

```
var compression = require('compression')
var express = require('express')

var app = express()

// compress all responses
app.use(compression())

// add all routes

```

참고

- https://github.com/expressjs/compression

## 모건

```
npm install --save morgan
```

## vue 빌드 후 node source

```
// 리소스
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/', function (req, res, next) {
res.sendFile(path.join(__dirname, `../public`, 'index.html'));
});
```

## mongo

```
npm install --save mongoose
```

```
[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
```

```

mongoose.set('strictQuery', false);
```

## PKG 빌드

```
npm install -g pkg
```

@ 순서

1. zip 파일 다운로드
2. /pkg/examples/express/
3. npm i -g pkg
4. pkg .

@ 링크

> https://github.com/vercel/pkg > https://segmentfault.com/a/1190000041958374/en

@ 수동 설치
pkg모듈 빌드 방법 공유드립니다.

1.  모듈 수동 다운로드
    https://github.com/vercel/pkg-fetch/releases
    node-version-win-x64, node-version-win-x64.sha256sum 파일 다운로드

2.  pkg 디렉토리에 모듈 파일 배포
    C:\Users\사용자명\.pkg-cache\v3.4
    (pkg 기본 디렉토리는 C:\Users\사용자명\.pkg-cache 입니다.)
    해당 디렉토리에 pkg version 디렉토리(ex : v3.4) 생성 후, 파일 배포

3.  파일명 변경
    node-v16.16.0-win-x64 -> fetched-v16.16.0-win-x64 로 변경

4.  pkg 실행
    pkg -t node16-win-x64 index.js
    성공 시 결과 로그 : > pkg@5.8.0

[참고 URL]
https://segmentfault.com/a/1190000041958374/en

1. SI통합매니저 실행파일 빌드
   node.js에서 mssql과 연동하기 위해서는 다음과 같은 라이브러리를 사용합니다.

db연동은 tedious를 사용하고, orm은 Sequelize를 사용합니다 ( Sequelize는 tedious라이브러리를 의존성을 갖는다)
tedious를 설치시 의존 라이브러리로 open라이브러리가 설치됩니다.

pkg 빌드시(즉 바이너리 실행파일로 빌드 시) 아래와 같은 내용이 발생합니다.(\*에러내용 참고)

빌드 에러가 발생하였지만, mssql 테스트해본결과 실행상 오류가 나오지 않았으며

추후 개발을 진행하면서 패키징 작업 및 테스트를 병행 해봐야할 것 같습니다

- 버전 테스트

pkg : 5.8.0

node : v16.16.0

vue 포함

pkg : 5.8.0

node : v18.5.0

vue 포함

- 에러내용

> pkg@5.8.0

> Warning Cannot include file %1 into executable.

The file must be distributed with executable as %2.

%1: node_modules\open\xdg-open

%2: path-to-executable/xdg-open

> Warning Cannot include file %1 into executable.

The file must be distributed with executable as %2.

%1: node_modules\open\xdg-open

%2: path-to-executable/xdg-open

- 처리내용

위에 에러 내용처럼 패키징 할때 xdg-open 파일을 복사한다.

"scripts": {

"start": "cross-env NODE_ENV=production node ./src/app.js",

"dev": " cross-env NODE_ENV=development nodemon ./src/app.js",

"build:test": "pkg . ",

"build:win": "pkg . && xcopy \"C:\\dev\\web\\node_modules\\open\\xdg-open\" \"C:\\dev\\web\\dist\\xdg-open\" /E/H/C/Y/F"

},

@ 에러내용

https://github.com/vercel/pkg/issues/487

"scripts": {

"package": "sudo pkg package.json -t node10-linux-x64 --out-path dist && cp ./node_modules/opn/xdg-open ./dist/xdg-open && cp <add here all others file you need to import>",

},

## sequelize

```
npm install --save sequelize
```

```

```

npm install --save tedious

```
npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server

```

@ mssql - 연동

```
npm install --save tedious
```

- 시퀄라이즈
  https://sequelize.org/v5/manual/getting-started.html
  https://sequelize.org/docs/v6/other-topics/connection-pool/

@ oracle - 연동

```
npm i --save oracledb
```

- https://www.npmjs.com/package/oracledb

- https://m.blog.naver.com/scw0531/221169287236

\*\* MSSQL
https://jasonwatmore.com/post/2022/07/01/nodejs-ms-sql-server-simple-api-for-authentication-registration-and-user-management
https://jasonwatmore.com/post/2022/06/20/nodejs-mssql-connect-to-sql-server-with-sequelize-tedious

\*\* ORACLE

\*\* ETC..
https://velog.io/@kimkevin90/%EC%8B%9C%ED%80%84%EB%9D%BC%EC%9D%B4%EC%A6%88Sequelize-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9%EB%B2%95

## oracle 설치

- JDBC
  https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html

- 설치
  https://www.appletong.com/entry/oracle-21c-XE-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EC%84%A4%EC%B9%98

## mssql

jdbc driver
https://learn.microsoft.com/en-us/sql/connect/jdbc/download-microsoft-jdbc-driver-for-sql-server?view=sql-server-ver16

## 솔루션 구성 사양서

### WebManager

1. 파일명
   WebMananger
2. 로그
   /Log/WebManager/info
   /Log/WebManager/error

### CommHub

1. 파일명
   CommHub

2. 로그

## npm dev uninstall

```
npm uninstall --save-dev pkg
```
