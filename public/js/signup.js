const signupFormHandler = async (event) => {
    event.preventDefault();

    console.log("Signup user attempted");

    // Retrieve user values from the login form
    const username = document.querySelector('#name-signup').value.trim();

    const email = document.querySelector('#email-signup').value.trim();

    const password = document.querySelector('#password-signup').value.trim();

    if (username && password && email) {
        const response = await fetch('api/users', {
            method: 'POST',
            body: JSON.stringify({username, password, email}),
            headers: { 'Content-Type': 'application/json'} 
        });
        // Once user created, redirect user to the profile page
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler)