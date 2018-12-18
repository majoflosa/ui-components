window.addEventListener('load', () => {

    class LayeredPlxBanner {
        /**
         * 
         * @param {object} elements object containing css selectors for parallax banner wrapper, background image, and
         * array of layers
         */
        constructor( elements ) {
            // the collection of selectors and elements that will have parallax effect
            this.elements = elements;

            // the element that wraps content and parallaxed background
            this.$banner = document.querySelector( elements.banner );
            // the element containing the image to use as background for the banner
            this.$bannerBg = this.$banner.querySelector( elements.plxBackground );

            // the height of the wrapper element
            this.bannerHt = this.$banner.offsetHeight;
            // the height of the image used as background
            this.bannerBgHt = this.$bannerBg.querySelector( elements.plxBackgroundImg ).offsetHeight;

            // value to use for `top` css property on image used as background;
            // if the banner is full-screen height, set to 0; else, center vertically
            this.initialBannerTop = this.$banner.classList.contains('full-screen') 
                ? 0 
                : -(this.bannerBgHt - this.bannerHt) / 2;

            // bind context of all class methods to the created instance object
            this.init = this.init.bind( this );
            this.bindEvents = this.bindEvents.bind( this );
            this.parallax = this.parallax.bind( this );

            // run all initial class functionality
            this.init();
        }

        /**
         * Set initial `top` position of image being used as background,
         * Bind event listeners to pertinent DOM elements
         */
        init() {
            this.$bannerBg.style.top = this.initialBannerTop + 'px';
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
            this.$bannerBg.style.top = this.initialBannerTop - (window.scrollY * 0.15) + 'px';
            // calculate amount of px to shift each layer element and set to `top` property
            this.elements.layers.forEach( layer => {
                layer.element.style.top = layer.initialTop - (window.scrollY * layer.scrollRatio ) + 'px';
            });
        }
    }

    // select all layer elements
    const layerElements = [...document.querySelectorAll( '.plx-layer' )];

    // modify layer elements collection to include initial properties
    const layers = layerElements.map( (layerElement, index) => {
        let layerObj = {
            element: layerElement,
            initialTop: 600,
            scrollRatio: 0.5
        };

        return layerObj;
    });

    // manually override individual initial position and scroll speed ratio
    layers[1].initialTop = 800;
    layers[1].scrollRatio = 0.95;
    layers[2].initialTop = 1100;
    layers[2].scrollRatio = 1.5;

    // initiate the component
    const layeredPlxBanner = new LayeredPlxBanner({
        banner: '.hero-banner', // css selector for wrapping element of parallax banner
        plxBackground: '.plx-background', // css selector for element containing background image
        plxBackgroundImg: '.plx-background-img', // css selector for background imag
        layers: layers // array of objects containing layer DOM elements and their initial settings
    });

});
