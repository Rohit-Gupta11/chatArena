//global variable 
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

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

//chatlist 
document.querySelectorAll('.group-name').forEach(group => {
    group.addEventListener('click', () => {
        let groupName = group.innerText
        const username = currentUser.fullname
        location.href = `/chat/${groupName}`
    })
})