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
