const express = require('express');
const chatRouter = express.Router();

chatRouter.use(express.static('public'))

chatRouter.get('/', (req, res) => {
    res.render('chat')
})

module.exports = chatRouter