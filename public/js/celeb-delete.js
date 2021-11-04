const deleteCelebHandler = async (event) => {
    event.preventDefault();

    console.log("Attempting delete of user celebrity");

    // Find the value (celebrity.id) of the data-celebid attribute on button
    const celeb_Id = event.target.getAttribute("data-celebid");

    // Pass the celebrity.id value into the delete celebrity route
    const response = await fetch(('/api/celebrities/'+ celeb_Id), {
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

// Create an array with all delete buttons on celeb cards
const deleteBtns = document.querySelectorAll('.delete-celeb');

// Add event listener to all delete buttons by looping through all of them
deleteBtns.forEach(btn => {
    btn.addEventListener('click', deleteCelebHandler)
});