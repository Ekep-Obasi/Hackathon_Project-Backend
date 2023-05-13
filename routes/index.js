const express = require("express");
const Url = require("../models/url");
const router = express.Router();
const takeScreenShot = require("../utils/takescreenshot");
const { SERVER_BASE_URL } = require("../utils/constants");
const getMetaData = require("metadata-scraper");

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/preview", async (req, res) => {
  const urlString = req.body;
  const url = await Url.findOne({ where: { url: urlString } });
  res.status(200).send(url);
});

router.post("/preview", async (req, res) => {
  const { urlString } = req.body;
  const path = await takeScreenShot(urlString);
  getMetaData(urlString)
    .then(async ({ title, description, icon }) => {
      const url = await Url.create({
        url: urlString,
        previewImgSrc: path,
        image: `${SERVER_BASE_URL}/${path}`,
        title: title,
        description: description,
        icon: icon,
      });
      res.status(200).send(url);
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});

module.exports = router;
