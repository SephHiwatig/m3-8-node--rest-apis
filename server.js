"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { clients } = require("./data/clients");
const { words } = require("./data/words");
let selectedWord = undefined;

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/", (req, res) => {
    const client = clients.find((x) => x.id === req.query.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).send("Not Found");
    }
  })
  .get("/hangman", (req, res) => {
    res.render("./public/hangman/index.html");
  })
  .get("/hangman/words", (req, res) => {
    const randomIndex = Math.floor(Math.random() * 20);
    selectedWord = words[randomIndex];
    const wordToGuess = { id: selectedWord.id, count: selectedWord.count };
    res.json(wordToGuess);
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
