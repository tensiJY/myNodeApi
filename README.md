# 환경 설정 및 구성파일

1. 환경설정 구성

#### windows

set process.env.NODE_ENV = production

#### linux

export NODE_ENV=production

2. eslint + prettier 적용

3. lib package

- "body-parser": "^1.20.1",
- "dotenv": "^16.0.3",
- "express": "^4.18.2",
- "morgan": "^1.10.0",
- "nodemon": "^2.0.20",
- "winston": "^3.8.2",
- "winston-daily-rotate-file": "^4.7.1"

# Node 실행

## run dev

linux

```
export NODE_ENV=production
```

windows

```
set NODE_ENV=production
```

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

## body-parser

```
npm install body-parser --save
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
