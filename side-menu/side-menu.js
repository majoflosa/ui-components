class SideMenu {
    constructor( options ) {
        this.$menuWrap = document.querySelector( options.menuWrapSelector );
        this.$menuButton = this.$menuWrap.querySelector( options.menuButtonSelector );
        this.$menu = this.$menuWrap.querySelector( options.menuSelector );
        this.animationDuration = options.animationDuration;

        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.toggleMenu = this.toggleMenu.bind( this );

        this.init();
    }

    init() {
        this.$menu.style.marginLeft = - this.$menu.offsetWidth + 'px';
        this.$menuWrap.style.width = 'auto';
        this.bindEvents();
    }
    
    bindEvents() {
        this.$menuButton.addEventListener('click', this.toggleMenu );
    }
    
    toggleMenu() {
        if ( !this.$menuWrap.classList.contains('showing') ) {
            this.$menuWrap.classList.add('showing');
            this.$menuWrap.style.width = '100%';
        } else {
            this.$menuWrap.classList.remove('showing');
            setTimeout( () => this.$menuWrap.style.width = 'auto', this.animationDuration);
        } 
    }
}

const menu = new SideMenu({
    menuWrapSelector: '#menu-wrap',
    menuButtonSelector: '#menu-button',
    menuSelector: '#main-menu',

    // duration in ms based on duration set in css transition; 250ms (0.25s) in this example
    // a few more ms is recommended
    animationDuration: 260 
});