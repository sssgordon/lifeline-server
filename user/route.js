const { Router } = require("express");
const User = require("./model");

const router = new Router();

router.post("/users", async (request, response, next) => {
  const user = {
    givenName: request.body.givenName,
    familyName: request.body.familyName,
    email: request.body.email
  };

  const existingUser = await User.findOne({ where: { email: user.email } });

  if (existingUser) {
    response.send("User already exists.");
  } else {
    const newUser = await User.create(user).catch(error => next(error));
    response.send(`New user ${newUser.givenName} created.`);
  }
});

module.exports = router;
