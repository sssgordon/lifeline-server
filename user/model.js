const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    givenName: {
      type: Sequelize.STRING,
      field: "given_name",
      allowNull: false
    },
    familyName: {
      type: Sequelize.STRING,
      field: "family_name",
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    emailPassword: {
      // this must be gmail password for nodemailer to work
      type: Sequelize.STRING,
      field: "email_password",
      allowNull: true
    },
    alias: {
      type: Sequelize.STRING,
      unique: true
    },
    hkIdNumber: {
      type: Sequelize.STRING,
      field: "hk_id_number"
    },
    gender: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
      field: "date_of_birth"
    },
    phoneNumber: {
      type: Sequelize.INTEGER,
      field: "phone_number"
    },
    emergencyContact: {
      type: Sequelize.STRING,
      field: "emergency contact"
    },
    emergencyContactNumber: {
      type: Sequelize.INTEGER,
      field: "emergency_contact_number"
    },
    lawyerEmail: {
      type: Sequelize.STRING,
      field: "lawyer_email"
    },
    otherEmail: {
      type: Sequelize.STRING,
      field: "other_email"
    }
  },
  {
    timestamps: false
  }
);

module.exports = User;
