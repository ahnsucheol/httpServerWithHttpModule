const http = require("http");
const express = require("express");
const { application } = require("express");

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
    id: 1, // post 별로 다른 값   posts[0]["id"]
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
app.get("/search/posts", (req, res) => {
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

// 게시물 정보 수정

/*
{
  "data": {
    "id": 1,
    "title": "바뀐 title",
    "content": "바뀐 content",
  }
}
*/

app.patch("/modify", (req, res) => {
  const modify = req.body.data;
  const modifiedpost = {};

  for (let i = 0; i < posts.length; i++) {
    if (modify["id"] === posts[i]["id"]) {
      for (value in modify) {
        posts[i][value] = modify[value];
      }
      // posts[i]["userId"]와 users[j][id]가 같은 요소의 ["name"] 가져오기
      for (let j = 0; j < users.length; j++) {
        if (posts[i]["userId"] === users[j]["id"]) {
          modifiedpost["userId"] = users[j]["id"];
          modifiedpost["userName"] = users[j]["name"];
          modifiedpost["postingId"] = posts[i]["id"];
          modifiedpost["postingTitle"] = posts[i]["title"];
          modifiedpost["postingContent"] = posts[i]["content"];
        }
      }
    }
  }
  res.json({ data: modifiedpost });
});

// 게시물 삭제

/*
{
  "data": {
    "id": 1
  }
}
*/
app.delete("/delete", (req, res) => {
  const del = req.body.data;
  const delPostId = del["id"];

  for (let i = 0; i < posts.length; i++) {
    if (posts[i]["id"] == delPostId) {
      posts.splice(i, 1);
    }
  }
  res.json({ message: "postingDeleted" });
});

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("Server is listening on PORT 8000");
});
