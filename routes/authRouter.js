const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const authRouter = express.Router();
const saltRounds = 10;
const { createTokens, validateToken } = require("../middlewares/jwt");
const { verify } = require('jsonwebtoken')

authRouter.use(express.static('public'))

// auth db setup with schema and model
const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

const userModel = mongoose.model('chatarena-user', userSchema);

// login route 
authRouter.get('/login', (req, res) => {
    const accessToken = req.cookies["access-token"]
    if(accessToken){
        const validToken = verify(accessToken, "jwtsecretplschange");
        if(validToken){
            res.redirect('/chat')
        }else{
            res.render('login')
        }
    }else {
        res.render('login')
    }

})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    await userModel.findOne({ email: email }, (err, result) => {

        if (err) {
            res.send({ err: err });
        }

        if (result) {
            bcrypt.compare(password, result.password, (err, response) => {
                if (response) {
                    const accessToken = createTokens(result);
                    
                    // storing an access token
                    res.cookie("access-token", accessToken, {
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        httpOnly: true,
                    });

                    res.json({
                        logined: true,
                        currentUser: result
                    })
                } else {
                    res.json({ logined: false, message: "Wrong username/password combination" });
                }
            });
        } else {
            res.json({ logined: false, message: "Username doesn't exist" });
        }
    });
})

// register route
authRouter.get('/register', (req, res) => {
    const accessToken = req.cookies["access-token"]
    if(accessToken){
        const validToken = verify(accessToken, "jwtsecretplschange");
        if(validToken){
            res.redirect('/chat')
        }else{
            res.render('register')
        }
    }else {
        res.render('register')
    }
})

authRouter.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    let exUser = await userModel.findOne({ email: email });
    if (exUser) {
        res.json({
            logined: false,
            message: "User already exist"
        })
    } else {

        bcrypt.hash(password, saltRounds, async (err, hash) => {

            if (err) {
                console.log(err);
            }

            await userModel.create({
                fullname: fullname,
                email: email,
                password: hash
            }, (err, result) => {
                const accessToken = createTokens(result);

                res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                });

                res.json({
                    logined: true,
                    currentUser: result
                })
            });

        });

    }
})

// logout route
authRouter.post('/logout', validateToken, (req, res) => {
    res.clearCookie("access-token")
    req.authenticated = false;
    req.authenticated.save()
    res.status(200)
})

module.exports = authRouter