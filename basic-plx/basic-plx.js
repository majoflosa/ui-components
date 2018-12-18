window.addEventListener('load', () => {
    
    class BasicPlxBanner {
        /**
         * 
         * @param {string } bannerSelector css selector for main wrapping element
         * @param { string } backgroundElementSelector css selector for element wrapping background img
         * @param { string } backgroundImageSelector css selector for background img
         */
        constructor( selectors ) {
            // the element that wraps content and parallaxed background
            this.$banner = document.querySelector( selectors.bannerSelector );
            // the element containing the image to use as background for the banner
            this.$bannerBg = this.$banner.querySelector( selectors.backgroundSelector );

            // the height of the wrapper element
            this.bannerHt = this.$banner.offsetHeight;
            // the height of the image used as background
            this.bannerBgHt = this.$bannerBg.querySelector( selectors.backgroundImageSelector ).offsetHeight;

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
         * Calculate and set new `top` value for banner image based on window scroll position
         */
        parallax() {
            this.$bannerBg.style.top = this.initialBannerTop - (window.scrollY * 0.15) + 'px';
        }
    }

    // initiate the component
    const plxBanner = new BasicPlxBanner( {
        bannerSelector: '.hero-banner',
        backgroundSelector: '.plx-background', 
        backgroundImageSelector: '.plx-background-img'} 
    );

});
