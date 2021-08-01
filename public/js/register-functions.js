//register form validation and fetch code
const registerForm = document.getElementById('register-form')

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let data = {
        fullname: registerForm.fullname.value,
        email: registerForm.email.value,
        password: registerForm.password.value
    }

    fetch('/auth/register', {
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
            else if(data.logined == false) {
                alert(data.message)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})
