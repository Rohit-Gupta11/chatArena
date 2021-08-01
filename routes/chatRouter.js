const express = require('express');
const chatRouter = express.Router();
const { validateToken } = require("./jwt");

chatRouter.use(express.static('public'))

chatRouter.get('/', (req, res) => {
    res.render('chatlist')
})

chatRouter.get('/:group', (req, res) => {
    let { group } = req.params
    res.render('chatwindow', { groupName: group })
})

module.exports = chatRouter