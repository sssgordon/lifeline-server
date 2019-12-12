const { Router } = require("express");
const User = require("./model");

const router = new Router();

router.post("/users", async (request, response, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.get("/users/:email", async (request, response, next) => {
  try {
    const user = await User.findOne({ where: { email: request.params.email } });
    if (user) {
      response.send(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put("/users/:email/update-details", async (request, response, next) => {
  try {
    const user = await User.findOne({ where: { email: request.params.email } });
    if (user) {
      user.update(request.body);
      response.send("User details updated");
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put("/users/:email/alias", async (request, response, next) => {
  try {
    const user = await User.findOne({ where: { email: request.params.email } });
    if (user) {
      user.update(request.body);
      response.send("Alias created");
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
