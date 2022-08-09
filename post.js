const createPost = (req, res) => {
  const post = req.body.data;

  posts.push({
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
  });

  res.json({ message: "postCreated" });
};

module.exports = { createPost };
