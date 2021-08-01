//login form validation and fetch code
const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let data = {
        email: loginForm.email.value,
        password: loginForm.password.value
    }

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.logined == true) {
                localStorage.setItem('currentUser', JSON.stringify({ _id: data.currentUser._id, fullname: data.currentUser.fullname }))
                location.href = '/chat'
            }
            else if (data.logined == false) {
                alert(data.message)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})
