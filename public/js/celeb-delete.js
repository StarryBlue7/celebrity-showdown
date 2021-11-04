const deleteCelebHandler = async (event) => {
    event.preventDefault();

    console.log("Attempting delete of user celebrity");

    const celebId = document.querySelector('whatevertheidisonthebutton').dataset.celebid
    const response = await fetch('/api/celebrities/${celebId}', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log("Celebrity deleted successfully")
        document.location.replace('/profile');
    } else {
        console.log("Couldn't delete celebrity");
        res.status(500).json(err);
    }
};

document
    .querySelector('#delete-celeb')
    .addEventListener('click', deleteCelebHandler)