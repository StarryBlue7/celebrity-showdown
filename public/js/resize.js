function assignJustifyClass() {
    if ($(window).width() < 1036) {
        $('.toggle-justify').removeClass('justify-content-between').addClass('justify-content-center');
    } else {
        $('.toggle-justify').removeClass('justify-content-center').addClass('justify-content-between');
    }
}

// Listen for window resize
window
    .addEventListener('resize', assignJustifyClass)

// Initialize function (to evaluate window size)
assignJustifyClass();