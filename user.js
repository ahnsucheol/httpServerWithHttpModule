const createUser = (req, res) => {
  const user = req.body.data;

  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  res.json({ message: "userCreated" });
};

module.exports = { createUser };
