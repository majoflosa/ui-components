class SideMenu {
    constructor( options ) {
        // element wrapping menu
        this.$menuWrap = document.querySelector( options.menuWrapSelector );
        // button that toggles menu display state
        this.$menuButton = this.$menuWrap.querySelector( options.menuButtonSelector );
        // the menu
        this.$menu = this.$menuWrap.querySelector( options.menuSelector );
        // css class to toggle, to make menu visible
        this.visibleClass = options.visibleClass;
        // animation duration in milliseconds 
        this.animationDuration = options.animationDuration;

        // bind context of all methods to current instance
        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.toggleMenu = this.toggleMenu.bind( this );

        // run all initial functionality
        this.init();
    }

    init() {
        // place menu to the left of the visible screen
        this.$menu.style.marginLeft = - this.$menu.offsetWidth + 'px';
        // make wrapping element take only the width of the menu
        this.$menuWrap.style.width = 'auto';
        // bind events to relevant DOM elements
        this.bindEvents();
    }
    
    bindEvents() {
        // bind events to relevant DOM elements
        this.$menuButton.addEventListener('click', this.toggleMenu );
    }
    
    toggleMenu() {
        if ( !this.$menuWrap.classList.contains( this.visibleClass ) ) {
            // if menu is not currently visible, add the showing class that makes it visible
            this.$menuWrap.classList.add( this.visibleClass );
            // make the wrapper element width of the whole page
            this.$menuWrap.style.width = '100%';
        } else {
            // if element is currently visible, remove class that makes it visible
            this.$menuWrap.classList.remove( this.visibleClass );
            // set wrapper element width back to initial, after animation is over
            setTimeout( () => this.$menuWrap.style.width = 'auto', this.animationDuration);
        } 
    }
}

window.addEventListener('load', () => {
    // instantiate the component
    const menu = new SideMenu({
        menuWrapSelector: '#menu-wrap',
        menuButtonSelector: '#menu-button',
        menuSelector: '#main-menu',
        // css class to toggle, to make menu visible
        visibleClass: 'showing',
    
        // duration in ms based on duration set in css transition; 250ms (0.25s) in this example
        // a few more ms is recommended
        animationDuration: 260 
    });
});
