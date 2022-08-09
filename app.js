const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());

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

// 회원가입
app.post("/signup", (req, res) => {
  const user = req.body.data;

  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  res.json({ message: "userCreated" });
});

// 게시물 등록
app.post("/post", (req, res) => {
  const post = req.body.data;

  posts.push({
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
  });

  res.json({ message: "postCreated" });
});

// 게시물 검색
app.get("/search", (req, res) => {
  const searchPosts = [];

  // posts[i]["userId"] === users["id"]인 users의 name 받아오기
  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (posts[i]["userId"] === users[j]["id"]) {
        searchPosts.push({
          userID: posts[i].userId,
          userName: users[j].name,
          postingId: posts[i].id,
          postingTitle: posts[i].title,
          postingContent: posts[i].content,
        });
      }
    }
  }

  res.json({ data: searchPosts });
});

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("Server is listening on PORT 8000");
});
