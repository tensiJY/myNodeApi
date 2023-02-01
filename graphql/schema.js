//  schema.js 파일을 추가해 쿼리, 뮤테이션 등
//  GraphQL 서비스 유형을 정의
const { buildSchema } = require(`graphql`);

//  type 키워드를 추가해 RootQuery 등 원하는 이름을 붙임
//  여기에 만들 수 있는 모든 유형의 쿼리를 가지게 됨
//  RootQuery를 설정하고 반환 유형까지 설정하면, hello 쿼리를 보내서 텍스트를 받는 기본적인 스키마가 완성

//  스키마에 정의된 각 쿼리나 뮤테이션에 메서드가 필요하며,
//  정의한 이름과 일치하는 이름을 입력함ㄴ

// module.exports = buildSchema(`

//     type TestData {
//         text : String!
//         views : Int!
//     }

//     type RootQuery {
//         hello : TestData!
//     }

//     schema {
//         query : RootQuery
//     }
// `);
//cretateUser(eamil:String, password:String)

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }
    
    schema {
        mutation: RootMutation
    }
`);
