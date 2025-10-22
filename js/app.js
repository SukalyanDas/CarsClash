// Main application functionality and navigation
class CarClashApp {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pages = document.querySelectorAll('.page');
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializePage();
    }

    bindEvents() {
        // Navigation event listeners
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.id === 'stats-link' || link.id === 'matchmaker-link') {
                    // Allow default behavior (navigation to external pages)
                    return;
                }
                e.preventDefault();
                this.navigateToPage(link.getAttribute('data-page'));
            });
        });

        // Button event listeners
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.hasAttribute('data-page')) {
                    e.preventDefault();
                    this.navigateToPage(btn.getAttribute('data-page'));
                }
            });
        });
    }

    // Navigate between pages
    navigateToPage(pageId) {
        // Update active page
        this.pages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active nav link
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Initialize the page
    initializePage() {
        // Set initial active page
        const initialPage = document.querySelector('.page.active');
        if (initialPage) {
            const pageId = initialPage.id;
            this.navigateToPage(pageId);
        }
    }
}

// Global navigation function for use by other modules
function navigateToPage(pageId) {
    if (window.carClashApp) {
        window.carClashApp.navigateToPage(pageId);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.carClashApp = new CarClashApp();
});
