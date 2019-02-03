class LayeredPlxBanner {
    /**
     * 
     * @param {object} options object containing css selectors for parallax banner wrapper, background image, and
     * array of layers
     */
    constructor( options ) {
        // the element that wraps content and parallax background
        this.$banner = document.querySelector( options.bannerSelector );
        if ( !this.$banner ) {
            console.warn(`The query selector ${options.bannerSelector} did not match any elements on the document. Aborting parallax function.`);
            return false;
        }

        this.layerElements = [...document.querySelectorAll( options.layerSelector )];
        this.layers = this.layerElements.map( (layerElement, index) => {
            return {
                element: layerElement,
                initialTop: options.layerOptions[index]
                    ? options.layerOptions[index].initialTop
                    : 600,
                scrollRatio: options.layerOptions[index]
                    ? options.layerOptions[index].scrollRatio 
                    : 0.5
            };
        });
        if ( !this.layers.length ) {
            console.warn(`The query selector ${options.layerSelector} did not match any elements on the document. Aborting parallax function.`);
            return false;
        }

        // the element containing the optional image to use as background for the banner
        this.$bannerBg = this.$banner.querySelector( options.plxBackgroundSelector );
        // the optional image to use as background for the banner
        this.$bannerBgImg = this.$bannerBg 
            ? this.$bannerBg.querySelector( options.plxBackgroundImgSelector )
            : null;
        // the height of the wrapper element
        this.bannerHt = this.$banner.offsetHeight;
        // parallax background is optional
        this.bannerBgHt = this.$bannerBg && this.$bannerBgImg
            ? this.$bannerBgImg.offsetHeight
            : 0;
        this.plxBackgroundScrollRatio = options.plxBackgroundScrollRatio || 0.15;

        // value to use for `top` css property on image used as background;
        // if the banner is full-screen height, set to 0; else, center vertically
        this.initialBannerTop = this.$banner.classList.contains('full-screen') 
            ? 0 
            : -(this.bannerBgHt - this.bannerHt) / 2;

        // bind context of all class methods to the created instance object
        this.bindEvents = this.bindEvents.bind( this );
        this.parallax = this.parallax.bind( this );

        // initialize background position, if any
        if ( this.$bannerBg )
            this.$bannerBg.style.top = this.initialBannerTop + 'px';
        
        // bind all events to respective handlers handlers
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener( 'scroll', this.parallax );
    }

    /**
     * Calculate and set new `top` value for banner image and layers based on window scroll position
     */
    parallax() {
        // calculate amount of px to shift background element's position and set to `top` property
        if ( this.$bannerBg )
            this.$bannerBg.style.top = this.initialBannerTop - (window.scrollY * this.plxBackgroundScrollRatio) + 'px';
        
        // calculate amount of px to shift each layer element and set to `top` property
        this.layers.forEach( layer => {
            layer.element.style.top = layer.initialTop - (window.scrollY * layer.scrollRatio ) + 'px';
        });
    }
}

window.addEventListener('load', () => {
    // initiate the component
    const layeredPlxBanner = new LayeredPlxBanner({
        bannerSelector: '.layered-plx', // query selector for wrapping element of parallax banner
        plxBackgroundSelector: '.plx-background', // query selector for element containing background image; optional
        plxBackgroundImgSelector: '.plx-background-img', // query selector for background image; optional
        plxBackgroundScrollRatio: 0.15, // proportional shift of background image to scroll amount; defaults to 0.15
        layerSelector: '.plx-layer', // query selector for other parallax layers
        layerOptions: [
            // options for each layer; adjust according to desired layer initial position and parallax speed
            { initialTop: 600, scrollRatio: 0.5 },
            { initialTop: 800, scrollRatio: 0.95 },
            { initialTop: 1100, scrollRatio: 1.5 }
        ]
    });

});
