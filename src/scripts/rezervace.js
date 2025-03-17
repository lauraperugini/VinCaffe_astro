document.addEventListener("DOMContentLoaded", function () {
    // Modal Elements
    var reservationModal = document.getElementById("reservationModal");
    var confirmationModal = document.getElementById("confirmationModal");

    var openModalBtn = document.querySelector(".onlinerezervace");
    var closeBtns = document.querySelectorAll(".close-btn, #closeModalBtn");
    var goBackBtn = document.getElementById("goBackBtn");

    // Form Element
    var reservationForm = document.getElementById("reservationForm");

    // Ensure buttons and modals "exist"
    function checkElement(element) {
        return element !== null && element !== undefined;
    }

    // Modal Functions
    function openModal(modal) {
        if (checkElement(modal)) modal.style.display = "block";
    }

    function closeModal(modal) {
        if (checkElement(modal)) modal.style.display = "none";
    }

    // Open reservation modal
    if (checkElement(openModalBtn)) {
        openModalBtn.addEventListener("click", () => openModal(reservationModal));
    }

    // Close reservation modal (X button, Zrušit button)
    if (closeBtns.length > 0) {
        closeBtns.forEach(btn => {
            btn.addEventListener("click", () => closeModal(reservationModal));
        });
    }

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === reservationModal) closeModal(reservationModal);
        if (e.target === confirmationModal) closeModal(confirmationModal);
    });

    // Form submission
    if (checkElement(reservationForm)) {
        reservationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            closeModal(reservationModal);
            openModal(confirmationModal);
        });
    }

    // Go back button in confirmation modal
    if (checkElement(goBackBtn)) {
        goBackBtn.addEventListener("click", () => {
            closeModal(confirmationModal);
            window.location.href = "index.html";
        });
    }
});



//validation email etc

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".user-info input");

    function showValidationIcon(input, isValid) {
        let iconElement = input.parentElement.querySelector(".validation-icon");

        if (isValid) {
            iconElement.classList.remove("error-icon");
            iconElement.classList.add("valid-icon");
        } else {
            iconElement.classList.remove("valid-icon");
            iconElement.classList.add("error-icon");
        }
    }

    function showErrorMessage(input, message) {
        let wrapper = input.parentElement; // .input-wrapper
        let errorElement = wrapper.nextElementSibling;

        if (!errorElement || !errorElement.classList.contains("error-message")) {
            errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            wrapper.after(errorElement);
        }

        errorElement.textContent = message;
        input.classList.add("error-border");
        input.classList.remove("valid-border");
        input.style.borderRadius = "10px";
        input.style.border = "1px solid #B82C00";
        input.style.background = "#FFF";
        input.style.boxShadow = "0px 0px 5px 0px #B82C00";

        showValidationIcon(input, false);
    }

    function removeErrorMessage(input) {
        let wrapper = input.parentElement;
        let errorElement = wrapper.nextElementSibling;

        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.remove(); // Remove error message
        }

        input.classList.remove("error-border");
        input.classList.add("valid-border");
        input.style.borderRadius = "10px";
        input.style.border = "1px solid #396600";
        input.style.background = "#FFF";
        input.style.boxShadow = "0px 0px 5px 0px rgba(57, 102, 0, 0.60)";

        showValidationIcon(input, true);
    }

    function validateName() {
        const nameInput = document.getElementById("name");
        const value = nameInput.value.trim();
        if (value.length < 8) {
            showErrorMessage(nameInput, "Jméno musí mít alespoň 8 znaků.");
        } else {
            removeErrorMessage(nameInput);
        }
    }

    function validateEmail() {
        const emailInput = document.getElementById("email");
        const value = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            showErrorMessage(emailInput, "Zadejte platný e-mail.");
        } else {
            removeErrorMessage(emailInput);
        }
    }

    function validatePhone() {
        const phoneInput = document.getElementById("phone");
        const value = phoneInput.value.trim();
        const phonePattern = /^\+?[0-9]{9,15}$/;
        if (!phonePattern.test(value)) {
            showErrorMessage(phoneInput, "Zadejte platné telefonní číslo.");
        } else {
            removeErrorMessage(phoneInput);
        }
    }

    document.getElementById("name").addEventListener("input", validateName);
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("phone").addEventListener("input", validatePhone);
});




// calendar

let selectedDate = null;
let currentDate = new Date();

function renderCalendar(date) {
    const daysContainer = document.getElementById('calendar-days');
    const monthYear = document.getElementById('calendar-month-year');

    daysContainer.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        dayElement.onclick = () => {
            if (selectedDate) {
                selectedDate.classList.remove('selected');
            }
            dayElement.classList.add('selected');
            selectedDate = dayElement;
            confirmDate();  // "Trigger" confirmDate immediately on selection
        };

        daysContainer.appendChild(dayElement);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
}

function confirmDate() {
    if (selectedDate) {
        alert(`Selected Date: ${selectedDate.textContent} ${currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`);
    } else {
        alert('Please select a date.');
    }
}

renderCalendar(currentDate);