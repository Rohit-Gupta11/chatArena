const requiredUser = JSON.parse(localStorage.getItem('currentUser'))
const socket = io()

const yourList = document.querySelector('.your-list')

function populateConnectedUser(fullname) {
    let markup = `
        <span class="icon is-medium is-left">
        <i class="fas fa-lg fa-user-alt" style="color: white;"></i>
        </span>
        <div class="your-list-subitem">
            <h1 id="your-friend" style="font-weight:600;">${fullname}</h1>
        </div>
        `
    const temp = document.createElement('div')
    temp.className = 'your-list-item'
    temp.innerHTML = markup
    yourList.appendChild(temp)
}

populateConnectedUser("Elon Musk")

// chat window
const msgInput = document.getElementById('message-input')
const sendBtn = document.getElementById('send-btn')

const chatHistory = document.getElementById('chat-history')

sendBtn.addEventListener('click', () => {
    if(msgInput.value){
        msgData = {
            msg: msgInput.value,
            username: requiredUser.fullname,
            email: requiredUser.email
        }
        appendMessage(msgInput.value, msgData.username,'outgoing')
        socket.emit('message', JSON.parse(msgData))
        msgInput.value = ''
    }
})

msgInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && msgInput.value){
        event.preventDefault()
        msgData = {
            msg: msgInput.value,
            username: requiredUser.fullname,
            email: requiredUser.email
        }
        appendMessage(msgInput.value, msgData.username, 'outgoing')
        socket.emit('message', JSON.parse(msgData))
        msgInput.value = '';
    }
})

function appendMessage(msg, owner, type){
    let msgDiv = document.createElement('div')
    let alignType = 'left'
    if(type === 'outgoing'){
        alignType = 'right'
        owner = 'You'
    }
    let markup = `
        <p style="text-align:${alignType};">${owner}</p>
        <p class="message ${type}">${msg}</p> 
    `
    msgDiv.innerHTML = markup
    chatHistory.appendChild(msgDiv)
    window.scrollY = scroll.height
}

socket.emit('joined', { username : requiredUser.fullname, email: requiredUser.email})

socket.on('message', (data) => {
    appendMessage(data.msg, data.username, 'incoming')
})

socket.on('introduce', (data) => {
    let introDiv = document.createElement('p')
    introDiv.innerText = `${data.username} joined`
    introDiv.classList = 'message'
    introDiv.style.margin = '10px auto;'
    chatHistory.appendChild(introDiv)
})