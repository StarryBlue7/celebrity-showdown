const loginFormHandler = async (event) => {
    event.preventDefault();

    console.log("Login user attempted");

    // Retrieve user values from the login form
    const email = document.querySelector('#email-login').value.trim();
    
    const password = document.querySelector('#password-login').value.trim();

    console.log(password);
    // if email and password values are provided, then authenticate and create session
    if (email && password) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' },
        });
        // Once logged in, redirect the user to the profile page
        if (response.ok) {
            console.log("Verified credentials");
            document.location.replace('/profile');
        } else {
            console.log("Couldn't Verify credentials");
            alert(response.statusText)
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler)