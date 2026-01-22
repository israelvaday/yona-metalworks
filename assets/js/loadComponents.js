// Function to load HTML components
function loadComponent(elementId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// Function to initialize all components
function initComponents() {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // Reinitialize navbar scripts if needed
            initializeNavbar();
        });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Add event listener for when DOM is loaded
document.addEventListener('DOMContentLoaded', initComponents);

// Function to initialize navbar functionality
function initializeNavbar() {
    setTimeout(() => {
        // Mobile nav toggle
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileNavToggle) {
            mobileNavToggle.addEventListener('click', function(e) {
                document.body.classList.toggle('mobile-nav-active');
                this.classList.toggle('bi-list');
                this.classList.toggle('bi-x');
            });
        }

        // Dropdown menus
        document.querySelectorAll('.navmenu .dropdown > a').forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth < 1200) {
                    e.preventDefault();
                    this.nextElementSibling.classList.toggle('dropdown-active');
                }
            });
        });

        // Set active menu item
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.navmenu a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Reinitialize main.js functions if needed
        if (typeof initMainFunctions === 'function') {
            initMainFunctions();
        }
    }, 100); // Small delay to ensure DOM is updated
}

// Load components
async function loadComponents() {
    try {
        // Load footer
        const footerResponse = await fetch('footer.html');
        if (!footerResponse.ok) {
            throw new Error(`HTTP error! status: ${footerResponse.status}`);
        }
        const footerHtml = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', loadComponents);