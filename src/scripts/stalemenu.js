let currentPage = 1;
const totalPages = 3; // Adjust this number based on the total number of pages

// Fct = show the page based on the currentPage value
function showPage(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.menu-page');
    pages.forEach((page) => {
        page.style.display = 'none';
    });
    
    // Show current page
    const activePage = document.getElementById(`page-${page}`);
    if (activePage) {
        activePage.style.display = 'block';
    }
}

// change pages
function changePage(direction) {
    if (direction === 'next') {
        if (currentPage < totalPages) {
            currentPage++;
        } else {
            currentPage = 1; // Loop back -> first page
        }
    } else if (direction === 'prev') {
        if (currentPage > 1) {
            currentPage--;
        } else {
            currentPage = totalPages; // Loop back -> last page
        }
    }

    showPage(currentPage);
}

// Initial call to show the first page
showPage(currentPage);
