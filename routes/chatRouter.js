const express = require('express');
const chatRouter = express.Router();
const { validateToken } = require("./jwt");
const mongoose = require('mongoose')

chatRouter.use(express.static('public'))

const groupSchema = mongoose.Schema({
    groupId: String,
    username: String,
    email: String,
    message: String
});

const groupModel = mongoose.model('chatarena-group', groupSchema);

chatRouter.get('/', validateToken,(req, res) => {
    res.render('chatlist')
})

chatRouter.get('/:group', validateToken, (req, res) => {
    let { group } = req.params
    res.render('chatwindow', { groupName: group })
})

chatRouter.get('/history/:group', validateToken, async (req, res) => {
    let { group } = req.params
    group = group.split(' ').join('%20')
    await groupModel.find({groupId: group}, (err, result) => {
        res.json(result)
    })
})

module.exports = { chatRouter, groupModel}