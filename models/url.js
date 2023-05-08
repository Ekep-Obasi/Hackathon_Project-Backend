const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");

const Url = sequelize.define(
  "url",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    urlString: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    previewImgSrc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

module.exports = Url;
