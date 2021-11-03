const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // Once logged out, redirect user to the homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText)
    }
};

document.querySelector('#logout').addEventListener('click',logout);