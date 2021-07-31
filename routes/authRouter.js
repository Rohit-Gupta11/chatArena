const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const authRouter = express.Router();
const saltRounds = 10;

authRouter.use(express.static('public'))

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

const userModel = mongoose.model('webchat-user', userSchema);

authRouter.get('/login', (req, res) => {
    res.render('login')
})

authRouter.get('/register', (req, res) => {
    res.render('register')
})

module.exports = authRouter