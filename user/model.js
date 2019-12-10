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
    alias: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = User;
