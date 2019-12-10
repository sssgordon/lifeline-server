const { Router } = require("express");
const { dialogflow } = require("actions-on-google");
const nodemailer = require("nodemailer");
const User = require("../user/model");

const router = new Router();
const app = dialogflow({
  // debug: true,
  clientId:
    "41211512517-iftbunpblmiv7qn22cl3itkiqtuvrssp.apps.googleusercontent.com" // I need to setup OAUTH for sign-up to work
});

app.intent("test", async conv => {
  // send test email to himself
  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     // in order for this to work, the user MUST allow "Less secure app" AND disable two-step verification on Google Account
  //     user: "hoitinso@gmail.com", // gmail
  //     pass: "Sp20075111!" // password
  //   }
  // });

  // let mailOptions = {
  //   from: "hoitinso@gmail.com", // user gmail
  //   to: "gso7@uwo.ca", // destination
  //   // cc: "hoitinso@gmail.com", // other emails
  //   subject: "Testing",
  //   text: "It works."
  // };

  // transporter.sendMail(mailOptions, function(error, data) {
  //   if (error) {
  //     console.log("Error occured", error);
  //   } else {
  //     console.log("Email sent!");
  //   }
  // });

  conv.close("Testing is a success!");
});

app.intent("declaration", async (conv, { name }) => {
  try {
    // use name param to  match with user in db
    const user = await User.findOne({ where: { alias: name } });

    if (user) {
      const usergivenName = user.givenName;
      conv.close(`Your lawyer is on the way, hang in there ${usergivenName}.`);
    } else {
      conv.ask("Try again?");
    }

    // send email
  } catch (error) {
    next(error);
  }
});

//sign in intents
// Intent that starts the account linking flow.

// app.intent("ask_for_sign_in_detail", conv => {
//   conv.ask(new SignIn());
// });

// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.

// app.intent("ask_for_sign_in_confirmation", (conv, params, signin) => {
//   if (signin.status !== "OK") {
//     return conv.ask("You need to sign in before using the app.");
//   }
//   // const access = conv.user.access.token;
//   // possibly do something with access token
//   return conv.ask("Great! Thanks for signing in.");
// });

router.post("/fulfillment", app); // this connects the express server with dialogflow through the /fulfillment endpoint

module.exports = router;
