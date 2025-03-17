document.addEventListener("DOMContentLoaded", function () {
    // Modal Elements
    const wineInfoModal = document.getElementById("wineInfoModal");
    const wineReservationModal = document.getElementById("wineReservationModal");
    const wineConfirmationModal = document.getElementById("wineconfirmationModal");

    // Buttons
    const winePodrobnostiButton = document.querySelector(".wine-podrobnosti-button");
    const wineReserveBtn = document.getElementById("wineReserveBtn");
    const wineNoBtn = document.getElementById("wineNoBtn");
    const wineCloseModalBtn = document.getElementById("wineCloseModalBtn");
    const wineGoBackBtn = document.getElementById("WinegoBackBtn");

    // Form
    const wineReservationForm = document.getElementById("wineReservationForm");

    // function to check element existence
    function checkElement(element) {
        return element !== null && element !== undefined;
    }

    // Function - open modal
    function openModal(modal) {
        if (checkElement(modal)) modal.style.display = "block";
    }

    // Function - close modal
    function closeModal(modal) {
        if (checkElement(modal)) modal.style.display = "none";
    }

    // Open "wine info" modal
    if (checkElement(winePodrobnostiButton)) {
        winePodrobnostiButton.addEventListener("click", () => openModal(wineInfoModal));
    }

    // Close "wine info" modal when clicking "ZRUŠIT"
    if (checkElement(wineNoBtn)) {
        wineNoBtn.addEventListener("click", () => closeModal(wineInfoModal));
    }

    // Open reservation modal + close info modal
    if (checkElement(wineReserveBtn)) {
        wineReserveBtn.addEventListener("click", function () {
            closeModal(wineInfoModal);
            openModal(wineReservationModal);
        });
    }

    // Close reservation modal when clicking "ZRUŠIT"
    if (checkElement(wineCloseModalBtn)) {
        wineCloseModalBtn.addEventListener("click", () => closeModal(wineReservationModal));
    }

    // Form submission (validate + open conf. modal)
    if (checkElement(wineReservationForm)) {
        wineReservationForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateForm()) {
                closeModal(wineReservationModal);
                openModal(wineConfirmationModal);
            }
        });
    }

    // Close conf. modal when clicking "DÍKY A ZAVŘÍT"
    if (checkElement(wineGoBackBtn)) {
        wineGoBackBtn.addEventListener("click", () => closeModal(wineConfirmationModal));
    }

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === wineInfoModal) closeModal(wineInfoModal);
        if (e.target === wineReservationModal) closeModal(wineReservationModal);
        if (e.target === wineConfirmationModal) closeModal(wineConfirmationModal);
    });

    // Form validation
    const nameInput = document.getElementById("wine-name");
    const emailInput = document.getElementById("wine-email");
    const phoneInput = document.getElementById("wine-phone");

    function showValidationIcon(input, isValid) {
        let iconElement = input.parentElement.querySelector(".wine-validation-icon");
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

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
});
