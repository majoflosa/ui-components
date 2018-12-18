class ScrollSpy {
    constructor( options ) {
        // array of links in navigation menu
        this.$navLinks = [...document.querySelectorAll( options.navLinkSelector )];
        // array of elements for menu to keep track on
        this.$sections = [...document.querySelectorAll( options.sectionSelector )];
        // name of css class to add to menu link matching current section
        this.activeClass = options.activeClass;

        // bind context of all methods to current instance
        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.spy = this.spy.bind( this );

        // run initial functionality
        this.init();
    }

    init() {
        // if page is loaded with no scroll distance, make first menu link active
        if ( window.scrollY === 0 ) this.$navLinks[0].classList.add( this.activeClass );
        
        // bind DOM events to elements
        this.bindEvents();
    }

    bindEvents() {
        // listen for scroll event, handle with spy method
        window.addEventListener('scroll', this.spy );
    }

    spy() {
        // find section whose offset distance from document top matches distance scrolled
        const currentSection = this.$sections.filter( section => {
            return ( window.scrollY >= section.offsetTop 
                && window.scrollY <= section.offsetTop + section.offsetHeight );
        })[0];

        // find menu link matching currentSection, give active css class
        const newActiveLink = document.querySelector( `[href="#${currentSection.id}"]` );
        newActiveLink.classList.add( this.activeClass );

        // remove active css class from any other menu link
        this.$navLinks.forEach( link => {
            if ( link.attributes.href.value !== `#${currentSection.id}` ) 
                link.classList.remove( this.activeClass );
        });
    }
}

// instantiate the component
const scrollspy = new ScrollSpy({
    sectionSelector: '.section',
    navLinkSelector: '.scrollspy-link',
    activeClass: 'active-link'
});