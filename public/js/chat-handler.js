const requiredUser = JSON.parse(localStorage.getItem('currentUser'))
const socket = io()

// user dash
const yourList = document.querySelector('.your-list')

function populateConnectedUser(fullname, userId) {
    let markup = `
        <span class="icon is-medium is-left">
        <i class="fas fa-lg fa-user-alt" style="color: white;"></i>
        </span>
        <div class="your-list-subitem">
            <h1 id="your-friend" style="font-weight:600;">${fullname}</h1>
        </div>
        `
    const temp = document.createElement('div')
    temp.id = userId
    temp.className = 'your-list-item'
    temp.innerHTML = markup
    yourList.appendChild(temp)
    yourList.scrollTop = yourList.scrollHeight
}

// chat window
const msgInput = document.getElementById('message-input')
const sendBtn = document.getElementById('send-btn')

const chatHistory = document.getElementById('chat-history')

// send message on click on send button
sendBtn.addEventListener('click', () => {
    if (msgInput.value) {
        storeMsgData(requiredUser.fullname, requiredUser.email, msgInput.value)
        appendMessage(msgInput.value, requiredUser.fullname, 'outgoing')
        socket.emit('message', {
            msg: msgInput.value,
            username: requiredUser.fullname,
            email: requiredUser.email
        })
        msgInput.value = ''
    }
})

// send message on pressing enter in message input
msgInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && msgInput.value) {
        event.preventDefault()
        storeMsgData(requiredUser.fullname, requiredUser.email, msgInput.value)
        appendMessage(msgInput.value, requiredUser.fullname, 'outgoing')
        socket.emit('message', {
            msg: msgInput.value,
            username: requiredUser.fullname,
            email: requiredUser.email
        })
        msgInput.value = '';
    }
})

function appendMessage(msg, owner, type) {
    let msgDiv = document.createElement('div')
    let alignType = 'left'
    if (type === 'outgoing') {
        alignType = 'right'
        owner = 'You'
    }
    let markup = `
        <p style="text-align:${alignType};">${owner}</p>
        <p class="message ${type}">${msg}</p> 
    `
    msgDiv.innerHTML = markup
    chatHistory.appendChild(msgDiv)
    chatHistory.scrollTop = chatHistory.scrollHeight
}

function storeMsgData(username, email, message) {
    let data = {
        email: email,
        username: username,
        message: message
    }
    socket.emit('store message', data)
}

// fetch all previus messages in this groupId
window.onload = () => {
    
    let groupId = window.location.pathname.split('/')[2]

    fetch(`/chat/history/${groupId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => {
            data.forEach(element => {
                let direction = 'incoming'
                if(element.email === requiredUser.email){
                    direction = 'outgoing'
                }
                appendMessage(element.message, element.username, direction)
            });
        }).catch((error) => {
            console.error('Error:', error);
        });
}

// emitting socket event
socket.emit('joined', { username: requiredUser.fullname, email: requiredUser.email })

// listening to socket event
socket.on('message', (data) => {
    appendMessage(data.msg, data.username, 'incoming')
})

//when someone joins
socket.on('introduce', (data) => {
    let introDiv = document.createElement('p')
    introDiv.innerText = `${data.username} joined`
    introDiv.classList = 'alert'
    chatHistory.appendChild(introDiv)
    chatHistory.scrollTop = chatHistory.scrollHeight
    populateConnectedUser(data.username, data.socketId )
})

//when a user leaved
socket.on('user gone', (data) => {
    const temp = document.getElementById(data)
    let introDiv = document.createElement('p')
    introDiv.innerText = `${temp.innerText} disconnected`
    introDiv.classList = 'alert'
    chatHistory.appendChild(introDiv)
    chatHistory.scrollTop = chatHistory.scrollHeight
    temp.remove()
});