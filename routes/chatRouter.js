const express = require('express');
const chatRouter = express.Router();
const { validateToken } = require("./jwt");

chatRouter.use(express.static('public'))

chatRouter.get('/',  validateToken, (req, res) => {
    res.send('chat window ')
})

module.exports = chatRouter