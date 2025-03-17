// Open first modal
const podrobnostiBtn = document.querySelector('.event-podrobnosti-button');
const eventInfoModal = document.getElementById('eventInfoModal');
const eventReservationModal = document.getElementById('eventReservationModal');
const eventConfirmationModal = document.getElementById('eventconfirmationModal');

podrobnostiBtn.addEventListener('click', () => {
    eventInfoModal.style.display = 'block';
});

// Close modals with close buttons
const closeButtons = document.querySelectorAll('.event-close-btn');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        eventInfoModal.style.display = 'none';
        eventReservationModal.style.display = 'none';
        eventConfirmationModal.style.display = 'none';
    });
});

// Close first modal with cancel button
const eventNoBtn = document.getElementById('eventeNoBtn');
eventNoBtn.addEventListener('click', () => {
    eventInfoModal.style.display = 'none';
});

// Open second modal when reserving
const eventReserveBtn = document.getElementById('eventReserveBtn');
eventReserveBtn.addEventListener('click', () => {
    eventInfoModal.style.display = 'none';
    eventReservationModal.style.display = 'block';
});

// Close second modal with cancel button
const eventCloseModalBtn = document.getElementById('eventCloseModalBtn');
eventCloseModalBtn.addEventListener('click', () => {
    eventReservationModal.style.display = 'none';
});

// Open third modal after submitting form (only if valid)
const eventReservationForm = document.getElementById('eventReservationForm');
eventReservationForm.addEventListener('submit', (e) => {
    e.preventDefault(); // No - actual form submission
    if (validateForm()) {
        eventReservationModal.style.display = 'none';
        eventConfirmationModal.style.display = 'block';
    }
});

// Close third modal with confirmation button
const eventGoBackBtn = document.getElementById('EventgoBackBtn');
eventGoBackBtn.addEventListener('click', () => {
    eventConfirmationModal.style.display = 'none';
});

// Close modals when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === eventInfoModal) {
        eventInfoModal.style.display = 'none';
    }
    if (e.target === eventReservationModal) {
        eventReservationModal.style.display = 'none';
    }
    if (e.target === eventConfirmationModal) {
        eventConfirmationModal.style.display = 'none';
    }
});

// Form validation
const nameInput = document.getElementById("event-name");
const emailInput = document.getElementById("event-email");
const phoneInput = document.getElementById("event-phone");

// Show validation icon
function showValidationIcon(input, isValid) {
    let iconElement = input.parentElement.querySelector(".event-validation-icon");
    if (isValid) {
        iconElement.classList.remove("error-icon");
        iconElement.classList.add("valid-icon");
    } else {
        iconElement.classList.remove("valid-icon");
        iconElement.classList.add("error-icon");
    }
}

// Show error message
function showErrorMessage(input, message) {
    let wrapper = input.parentElement;
    let errorElement = wrapper.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("div");
        errorElement.classList.add("error-message");
        wrapper.after(errorElement);
    }

    errorElement.textContent = message;
    input.classList.add("error-border");
    input.style.border = "1px solid #B82C00";
    input.style.boxShadow = "0px 0px 5px 0px #B82C00";

    showValidationIcon(input, false);
}

// Remove error message
function removeErrorMessage(input) {
    let wrapper = input.parentElement;
    let errorElement = wrapper.nextElementSibling;

    if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
    }

    input.classList.remove("error-border");
    input.style.border = "1px solid #396600";
    input.style.boxShadow = "0px 0px 5px 0px rgba(57, 102, 0, 0.60)";

    showValidationIcon(input, true);
}

// Validate Name (at least 8 characters)
function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 8) {
        showErrorMessage(nameInput, "Jméno musí mít alespoň 8 znaků.");
        return false;
    } else {
        removeErrorMessage(nameInput);
        return true;
    }
}

// Validate Email (pattern check)
function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
        showErrorMessage(emailInput, "Zadejte platný e-mail.");
        return false;
    } else {
        removeErrorMessage(emailInput);
        return true;
    }
}

// Validate Phone (9 to 15 digits)
function validatePhone() {
    const value = phoneInput.value.trim();
    const phonePattern = /^\+?[0-9]{9,15}$/;
    if (!phonePattern.test(value)) {
        showErrorMessage(phoneInput, "Zadejte platné telefonní číslo.");
        return false;
    } else {
        removeErrorMessage(phoneInput);
        return true;
    }
}

// Validate entire form
function validateForm() {
    let isValid = true;
    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePhone()) isValid = false;
    return isValid;
}

// Real-time validation on input
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
