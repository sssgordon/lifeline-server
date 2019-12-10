const { Router } = require("express");
const nodemailer = require("nodemailer");

const router = new Router();

router.get("/sendMail", async (request, response, next) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // in order for this to work, the user MUST allow "Less secure app" AND disable two-step verification on Google Account
        user: "hoitinso@gmail.com", // gmail
        pass: "Sp20075111!" // password
      }
    });

    let mailOptions = {
      from: "hoitinso@gmail.com", // user gmail
      to: "gso7@uwo.ca", // destination
      // cc: "hoitinso@gmail.com", // other emails
      subject: "Testing",
      text: "It works."
    };

    transporter.sendMail(mailOptions, function(error, data) {
      if (error) {
        console.log("Error occured", error);
      } else {
        console.log("Email sent!");
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
