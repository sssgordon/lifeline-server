const express = require("express");
const cors = require("cors");
const corsMiddleware = cors({
  credentials: true,
  origin: "http://localhost:3000" // this allows frontend to access backend
});
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const passport = require("passport");
const auth = require("./auth");
const cookieParser = require("cookie-parser");
const cookieParserMiddleware = cookieParser();
const cookieSession = require("cookie-session");
const cookieSessionObj = cookieSession({
  name: "session",
  keys: ["123"]
});
const dialogflowRouter = require("./dialogflow/route");
const userRouter = require("./user/route");
const emailRouter = require("./email/route");

const app = express();
const port = process.env.PORT || 4000;

app.use(corsMiddleware);
app.use(jsonParser);
app.use(cookieSessionObj);
app.use(cookieParserMiddleware);
auth(passport);
app.use(passport.initialize());
app.use(dialogflowRouter);
app.use(userRouter);
app.use(emailRouter);

//authorization endpoint
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/dialogflow"
    ]
  })
);

//token endpoint
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("user test", req.user);
    req.session.token = req.user.token;
    res.redirect("/");
  }
);

//redirect to this page after login, with token in frontend
app.get("/", (req, res) => {
  console.log("token test", req.session.token);
  if (req.session.token) {
    res.cookie("token", req.session.token);
    res.json({
      // token: req.session.token
      status: "session cookie set"
    });
  } else {
    res.cookie("token", "");
    res.json({
      status: "session cookie not set"
    });
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// heroku link: https://rocky-beyond-35781.herokuapp.com/
