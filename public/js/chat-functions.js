//global variable 
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

// var socket = io();

// logout button 
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.addEventListener('click', () => {
    fetch('/auth/logout', {
        method: 'POST',
    }).then(() => {
        console.log('logout')
        localStorage.removeItem('currentUser')
        location.href = '/'
    })
})

//profile user
const profileUser = document.querySelector('.profile-user')
profileUser.innerText = `Hi, ${currentUser.fullname}!`