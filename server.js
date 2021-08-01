require('dotenv').config()
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const { verify } = require('jsonwebtoken')
const PORT = process.env.PORT || 4000
const app = express()
const server = http.createServer(app)
const authRouter = require('./routes/authRouter')
const chatRouter = require('./routes/chatRouter')
const { Server } = require('socket.io')
const io = new Server(server)


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser());

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    const accessToken = req.cookies["access-token"]
    if (accessToken) {
        const validToken = verify(accessToken, "jwtsecretplschange");
        if (validToken) {
            res.redirect('/chat')
        } else {
            res.render('login')
        }
    } else {
        res.render('login')
    }
})

app.use('/auth', authRouter)
app.use('/chat', chatRouter)

io.on('connection', (socket) => {

    console.log(`user connected and id ${socket.id} and ${socket.handshake.headers.referer}`)
    let room = socket.handshake.headers.referer
    room = room.split('/')[4]
    socket.join(room)

    socket.on('joined', (data) => {
        console.log(data)
        socket.broadcast.to(room).emit('introduce', data);
    })

    socket.on('message', (data) => {
        console.log(`message data : ${data}`)
        socket.broadcast.to(room).emit('message', data);
    })

})


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('db connected')
    server.listen(PORT, () => {
        console.log("this is working well")
    })
})
