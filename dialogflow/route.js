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
  conv.close("Testing is a success!");
});

app.intent("declaration", async (conv, { name, location, police_station }) => {
  try {
    const user = await User.findOne({ where: { alias: name } });

    if (user) {
      const {
        email,
        emailPassword,
        givenName,
        familyName,
        lawyerEmail,
        otherEmail,
        hkIdNumber,
        gender,
        address,
        dateOfBirth,
        phoneNumber,
        emergencyContact,
        emergencyContactNumber
      } = user;
      const arrestedLocation = location ? location : "unkonwn";
      const policeStation = police_station ? police_station : "uknown";

      // send email
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          // in order for this to work, the user MUST allow "Less secure app" AND disable two-step verification on Google Account
          user: email, // gmail
          pass: emailPassword // gmail password
        }
      });

      let mailOptions = {
        from: email,
        to: lawyerEmail,
        cc: otherEmail,
        subject: `${givenName} is arrested`,
        text: `
        Dear lawyer,

        ${givenName} ${familyName} ${hkIdNumber} has been arrested and now needs your legal service.

        ---Information regarding the incident---
        Arrested location: ${arrestedLocation}
        Police station: ${policeStation}

        ---Litigant information---
        Gender: ${gender}
        Date of birth: ${dateOfBirth}
        Home address: ${address}
        Phone number: ${phoneNumber}
        Emergency contact: ${emergencyContact}
        Emergency contact number: ${emergencyContactNumber}

        *Information regarding the incident is not fact-checked.

        Yours faithfully,
        Outcry staff
        `
      };

      transporter.sendMail(mailOptions, function(error, data) {
        if (error) {
          console.log("Error occured", error);
        } else {
          console.log("Email sent!");
        }
      });

      conv.close(`Your lawyer is on the way, hang in there ${givenName}.`);
    } else {
      conv.ask("Try again?");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/fulfillment", app); // this connects the express server with dialogflow through the /fulfillment endpoint

module.exports = router;
