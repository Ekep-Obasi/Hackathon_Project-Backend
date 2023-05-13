const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../utils/constants");

/* GET users listing. */

router.get("/", async (req, res) => {
  const users = await User.findAll();
  if (!users) res.status(500).send("Internal Server Error");
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) res.status(403).send("User not Found");
  res.send(user);
});

router.post("/", (req, res) => {
  const { password } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then(async (hash) => {
      const user = await User.create({ ...req.body, ...{ password: hash } });
      res.status(200).send(user);
    })
    .catch(() => res.status(500).send("Internal Server Error"));
});

router.delete("/:id", async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).send("Succesful");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
