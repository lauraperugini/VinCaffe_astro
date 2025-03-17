document.addEventListener("DOMContentLoaded", function () {
    // Modals
    const occasionButton = document.querySelector('.occasion-podrobnosti-button');
    const occasionInfoModal = document.getElementById('occasionInfoModal');
    const occasionReservationModal = document.getElementById('occasionReservationModal');
    const occasionConfirmationModal = document.getElementById('occasionconfirmationModal');
    
    // Buttons
    const occasionCloseBtns = document.querySelectorAll('.occasion-close-btn');
    const occasionReserveBtn = document.getElementById('occasionReserveBtn');
    const occasionGoBackBtn = document.getElementById('OccasiongoBackBtn');
    const occasionCloseModalBtn = document.getElementById('occasionCloseModalBtn');
    
    // Form
    const occasionReservationForm = document.getElementById('occasionReservationForm');
    const nameInput = document.getElementById('occasion-name');
    const emailInput = document.getElementById('occasion-email');
    const phoneInput = document.getElementById('occasion-phone');

    // Open "Occasion Info" Modal 
    occasionButton.addEventListener('click', () => {
        occasionInfoModal.style.display = 'block';
    });

    // Close modals when clicking close buttons 
    occasionCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => closeAllModals());
    });

    // Open Reservation Modal + Close Info Modal 
    occasionReserveBtn.addEventListener('click', () => {
        occasionInfoModal.style.display = 'none';
        occasionReservationModal.style.display = 'block';
    });

    // Close Reservation Modal when clicking "ZRUŠIT" 
    occasionCloseModalBtn.addEventListener('click', () => {
        closeModal(occasionReservationModal);
    });

    // Handle Reservation Form Submission 
    occasionReservationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        if (validateForm()) {
            closeModal(occasionReservationModal);
            occasionConfirmationModal.style.display = 'block';
        }
    });

    // Close Confirmation Modal 
    occasionGoBackBtn.addEventListener('click', () => {
        closeModal(occasionConfirmationModal);
    });

    // Close all modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('occasion-modal')) {
            closeAllModals();
        }
    });

    // Function to close modal
    function closeModal(modal) {
        if (modal) modal.style.display = 'none';
    }

    // Function to close all modals
    function closeAllModals() {
        occasionInfoModal.style.display = 'none';
        occasionReservationModal.style.display = 'none';
        occasionConfirmationModal.style.display = 'none';
    }

    // Form validation

    function showValidationIcon(input, isValid) {
        const iconElement = input.parentElement.querySelector(".occasion-validation-icon");
        if (isValid) {
            iconElement.classList.remove("error-icon");
            iconElement.classList.add("valid-icon");
        } else {
            iconElement.classList.remove("valid-icon");
            iconElement.classList.add("error-icon");
        }
    }

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

    function validateForm() {
        let isValid = true;
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validatePhone()) isValid = false;
        return isValid;
    }

    // live validation
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
});
