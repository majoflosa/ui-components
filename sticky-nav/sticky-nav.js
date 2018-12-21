class StickyNav {
    constructor( options ) {
        // nav element
        this.$nav = document.querySelector( options.navSelector );
        // wrapper element for all content under nav
        this.$mainWrap = document.querySelector( options.mainWrapSelector );
        // nav separation from top of page
        this.heightAboveNav = this.$nav.offsetTop;
        // css class to add to make the nav bar stick
        this.stickyClass = options.stickyClass;

        // track whether or not the nav has is in the sticky state
        this.isSticky = false;

        this.$menuButton = document.querySelector( options.menuButtonSelector );
        this.$menu = document.querySelector( options.menuSelector );
        this.openMenuClass = options.openMenuClass;

        // bind context of all methods to current instance
        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.stick = this.stick.bind( this );
        this.toggleMenu = this.toggleMenu.bind( this );
        this.disableStick = this.disableStick.bind( this );

        // run all initial functionality
        this.init();
    }

    init() {
        // bind events to relevant DOM elements
        this.bindEvents();
    }
    
    bindEvents() {
        // set up listener for scroll event
        window.addEventListener( 'scroll', this.stick );
        window.addEventListener( 'resize', this.disableStick );
        this.$menuButton.addEventListener( 'click', this.toggleMenu );
    }
    
    stick() {
        if ( window.innerWidth < 960 ) return false;

        if ( window.scrollY > this.heightAboveNav && this.isSticky ) {
            // do nothing if nav is already in sticky state, and user is scrolling past sticking point
            return;
        } else if ( window.scrollY > this.heightAboveNav && !this.isSticky ) {
            // user is scrolling past sticking point while nav is in initial state
            this.$nav.classList.add( this.stickyClass );
            this.$mainWrap.style.marginTop = this.$nav.offsetHeight + 'px';

            this.isSticky = true;
        } else {
            // set nav back to initial state if scrolling back to sticking point
            this.$nav.classList.remove( this.stickyClass );
            this.$mainWrap.style.marginTop = 0;

            this.isSticky = false;
        }
    }

    disableStick() {
        if ( window.innerWidth < 960 ) {
            this.$nav.classList.remove( this.stickyClass );
            this.$mainWrap.style.marginTop = 0;
    
            this.isSticky = false;
        }
    }

    toggleMenu() {
        if ( this.$menu.classList.contains(this.openMenuClass) ) this.$menu.classList.remove( this.openMenuClass );
        else this.$menu.classList.add( this.openMenuClass );
    }
}

// instantiate the component
window.addEventListener('load', function() {
    const stickyNav = new StickyNav({
        navSelector: '#sticky-nav',
        mainWrapSelector: '.sections-wrap',
        stickyClass: 'sticky',
        // optional for responsive menu
        menuButtonSelector: '.menu-button',
        menuSelector: '.nav-links',
        openMenuClass: 'open'
    });
});
