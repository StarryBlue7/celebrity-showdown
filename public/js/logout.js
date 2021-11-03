const logoutHandler = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // Once logged out, redirect user to the homepage
    if (response.ok) {
        console.log("Loggest out successfully");
        document.location.replace('/');
    } else {
        console.log("Couldn't log out");
        alert(response.statusText)
    }
};

document
    .querySelector('#logout')
    .addEventListener('click',logoutHandler)