class StickyNav {
    constructor( options ) {
        // nav element
        this.$nav = document.querySelector( options.navSelector );
        // wrapper element for all content under nav
        this.$mainWrap = document.querySelector( options.mainWrapSelector );
        // nav separation from top of page
        this.heightAboveNav = this.$nav.offsetTop;

        // track whether or not the nav has is in the sticky state
        this.isSticky = false;

        // bind context of all methods to current instance
        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.stick = this.stick.bind( this );

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
    }
    
    stick() {
        if ( window.scrollY > this.heightAboveNav && this.isSticky ) {
            // do nothing if nav is already in sticky state, and user is scrolling past sticking point
            return;
        } else if ( window.scrollY > this.heightAboveNav && !this.isSticky ) {
            // user is scrolling past sticking point while nav is in initial state
            this.$nav.classList.add( 'sticky' );
            this.$mainWrap.style.marginTop = this.$nav.offsetHeight + 'px';

            this.isSticky = true;
        } else {
            // set nav back to initial state if scrolling back to sticking point
            this.$nav.classList.remove( 'sticky' );
            this.$mainWrap.style.marginTop = 0;

            this.isSticky = false;
        }
    }
}

// instantiate the component
window.addEventListener('load', function() {
    const stickyNav = new StickyNav({
        navSelector: '#sticky-nav',
        mainWrapSelector: '.sections-wrap'
    });
});
