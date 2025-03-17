// Get modal and buttons
const kontaktModal = document.getElementById('KontaktModal');
const kontaktOpenBtn = document.querySelector('.kontakt');
const kontaktCloseBtn = document.getElementById('kontaktCloseModalBtn');
const kontaktCloseSpan = document.querySelector('.kontakt-close-btn');

// Open modal when clicking the button
kontaktOpenBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor link behavior
    kontaktModal.style.display = 'block';
});

// Close modal when clicking the close button (footer button)
kontaktCloseBtn.addEventListener('click', function() {
    kontaktModal.style.display = 'none';
});

// Close modal when clicking the close icon (X)
kontaktCloseSpan.addEventListener('click', function() {
    kontaktModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === kontaktModal) {
        kontaktModal.style.display = 'none';
    }
});
