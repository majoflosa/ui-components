class Navbar {
    constructor(el) {
        // this.dom will hold references to handy DOM elements related to this component;
        // constructor receives main component element as 'el'
        this.dom = { el: el };

        // bind event handlers' context for all elements to current instance
        this.onMobileToggleClick = this.onMobileToggleClick.bind(this);
        this.onSearchToggleClick = this.onSearchToggleClick.bind(this);
        this.onSearchCloseClick = this.onSearchCloseClick.bind(this);
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);

        // invoke initiation functions
        this.setDomElements();
        this.setNavbarProperties();
        this.bindEvents();
    }

    // saves references to handy DOM elements for this component in the this.dom object
    setDomElements() {
        // toggle button to hide/show menu on mobile
        this.dom.mobileToggle = this.dom.el.querySelector('.mf-navbar__mobile-toggle');
        // menu container
        this.dom.links = this.dom.el.querySelector('.mf-navbar__links');

        // search form elements; may not exist if navbar has no search feature
        this.dom.searchForm = this.dom.el.querySelector('.mf-navbar__search');
        this.dom.searchInput = this.dom.el.querySelector('.mf-navbar__search-input');
        this.dom.searchButton = this.dom.el.querySelector('.mf-navbar__search-button');
        if (this.dom.searchForm && this.dom.searchForm.classList.contains('mf-navbar__search--toggleable')) {
            this.dom.searchToggle = this.dom.searchButton;
            this.dom.searchClose = this.dom.el.querySelector('.mf-navbar__search-close');
        }
    }

    // sets useful properties about this instance
    setNavbarProperties() {
        // is there a search form
        this.hasSearch = !!this.dom.searchForm;
        // can search form be hidden & shown
        this.isSearchToggleable = !!(this.dom.searchForm
            && this.dom.searchForm.classList.contains('mf-navbar__search--toggleable'));
        // tracks search form display state; initially hidden
        this.isSearchOpen = false;
    }

    // bind component's elements to their respective DOM elements
    bindEvents() {
        this.dom.mobileToggle.addEventListener('click', this.onMobileToggleClick);
        
        if (this.hasSearch) {
            if (this.isSearchToggleable) {
                this.dom.searchToggle.addEventListener('click', this.onSearchToggleClick);
                this.dom.searchClose.addEventListener('click', this.onSearchCloseClick);
            }
    
            this.dom.searchButton.addEventListener('click', this.onSearchButtonClick);
        }
    }

    /**
     * Event Handlers
     */
    
    // show/hide menu display on mobile
    onMobileToggleClick(e) {
        e.preventDefault();
        this.dom.links.classList.toggle('open');
    }

    // displays search input if it is currently not displayed when 'Search' button is clicked
    onSearchToggleClick(e) {
        if (!this.isSearchOpen) {
            e.preventDefault();
            this.dom.el.classList.toggle('open');
            this.isSearchOpen = true;
        }
    }

    // hides search input when 'X' button is clicked on an open search input
    onSearchCloseClick(e) {
        e.preventDefault();
        this.dom.el.classList.toggle('open', false);
        this.isSearchOpen = false;
    }

    // prevents search form from being submitted if search input is empty
    onSearchButtonClick(e) {
        if (!this.dom.searchInput.value) e.preventDefault();
    }
}

export default Navbar;

/**
 * To initiate navbar:
 * 
 * import Navbar from './path/to/navbar.js';
 * const navbarEl = document.querySelector('.mf-navbar');
 * const navbar = new Navbar(navbarEl);
 */
