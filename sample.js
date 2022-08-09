const users = [
  {
    id: 1, //user 별로 다른 값
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1, // post 별로 다른 값
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1, // posts["userId"] === users["id"]
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

"userID"           : 1,
	  "userName"         : "Rebekah Johnson"
    "postingId"        : 1,
    "postingTitle"     : "간단한 HTTP API 개발 시작!",
		"postingContent"   : "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현."