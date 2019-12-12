const express = require("express");
const cors = require("cors");
const corsMiddleware = cors({
  credentials: true,
  origin: "http://localhost:3000" // this allows frontend to access backend
});
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const dialogflowRouter = require("./dialogflow/route");
const userRouter = require("./user/route");
const emailRouter = require("./email/route");

const app = express();
const port = process.env.PORT || 4000;

app.use(corsMiddleware);
app.use(jsonParser);
app.use(dialogflowRouter);
app.use(userRouter);
app.use(emailRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));

// heroku link: https://rocky-beyond-35781.herokuapp.com/
