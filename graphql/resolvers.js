//  들어오는 쿼리를 위해 실행되는 논리를 정의

//  쿼리 이름을 hello라고 지었기 때문에 메서드 이름도 hello

module.exports = {
  hello() {
    return {
      text: `Hello World!`,
      views: 1245,
    };
  },
};
