const { Router } = require("express");
const { dialogflow, SignIn } = require("actions-on-google");

const router = new Router();
const app = dialogflow({
  // debug: true,
  clientId:
    "41211512517-iftbunpblmiv7qn22cl3itkiqtuvrssp.apps.googleusercontent.com" // I need to setup OAUTH for sign-up to work
});

app.intent("test", async (conv, params) => {
  // console.log("CONV TEST", conv);
  // console.log("PARAMS TEST", params);
  // send test email to himself
  // conv.ask(new SignIn("Please sign in"));
  conv.close("Testing is a success!");
});

// app.intent("declaration", async conv => {
//   // find user in db with google account stuff
//   // send email
//   // get user name
//   conv.close(`Your lawyer is on the way, hang in there.`);
// });

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
