class Navbar {
    constructor(el) {
        this.dom = { el: el };

        this.setDomElements();
        this.setNavbarProperties();
        this.bindEvents();
    }

    setDomElements() {
        this.dom.mobileToggle = this.dom.el.querySelector('.mf-navbar__mobile-toggle');
        this.dom.links = this.dom.el.querySelector('.mf-navbar__links');
        this.dom.searchForm = this.dom.el.querySelector('.mf-navbar__search');
        this.dom.searchInput = this.dom.el.querySelector('.mf-navbar__search-input');
        this.dom.searchButton = this.dom.el.querySelector('.mf-navbar__search-button');

        if (this.dom.searchForm && this.dom.searchForm.classList.contains('mf-navbar__search--toggleable')) {
            this.dom.searchToggle = this.dom.searchButton;
            this.dom.searchClose = this.dom.el.querySelector('.mf-navbar__search-close');
        }
    }

    setNavbarProperties() {
        this.hasSearch = !!this.dom.searchForm;
        this.isSearchToggleable = !!(this.dom.searchForm
            && this.dom.searchForm.classList.contains('mf-navbar__search--toggleable'));
        this.isSearchOpen = false;
    }

    bindEvents() {
        this.dom.mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.dom.links.classList.toggle('open');
        });
        
        if (this.hasSearch) {
            if (this.isSearchToggleable) {
                this.dom.searchToggle.addEventListener('click', (e) => {
                    if (!this.isSearchOpen) {
                        e.preventDefault();
                        this.dom.el.classList.toggle('open');
                        this.isSearchOpen = true;
                    }
                });
                this.dom.searchClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.dom.el.classList.toggle('open', false);
                    this.isSearchOpen = false;
                });
            }
    
            this.dom.searchButton.addEventListener('click', (e) => {
                if (!this.dom.searchInput.value) e.preventDefault();
            });
        }
    }
}

export default Navbar;
