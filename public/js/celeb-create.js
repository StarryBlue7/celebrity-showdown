const createCelebHandler = async (event) => {
    event.preventDefault();

    console.log("Attempting creation of celebrity!");

    // Find the values of the celebrities fame and name
    const fame_id = parseInt(event.target.getAttribute("data-id"));
    const celebName = event.target.getAttribute("data-name");
    console.log(fame_id, celebName)
    // post method for new created celeb
    const response = await fetch('/api/celebrities', {
        method: 'POST',
        body: JSON.stringify({ name: celebName, fame_id: fame_id }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log("Celebrity created successfully")
        document.location.replace('/profile');
    } else {
        console.log("Couldn't create celebrity");
    }
};

const createBtn = document.querySelectorAll('.create-btn');
// event listener on create button
createBtn.forEach(btn => {
    btn.addEventListener('click', createCelebHandler)
});