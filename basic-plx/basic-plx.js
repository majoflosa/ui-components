window.addEventListener('load', () => {
    
    class BasicPlxBanner {
        /**
         * 
         * @param {string } bannerSelector query selector for main wrapping element
         * @param { string } backgroundElementSelector query selector for element wrapping background img
         * @param { string } backgroundImageSelector query selector for background img
         * @param { number } scrollRatio proportion of how much background image shifts on scroll
         */
        constructor( options ) {
            // the element that wraps content and parallaxed background
            this.$banner = document.querySelector( options.bannerSelector );
            // the element containing the image to use as background for the banner
            this.$bannerBg = this.$banner.querySelector( options.backgroundSelector );

            // the height of the wrapper element
            this.bannerHt = this.$banner.offsetHeight;
            // the height of the image used as background
            this.bannerBgHt = this.$bannerBg.querySelector( options.backgroundImageSelector ).offsetHeight;

            // value to use for `top` css property on image used as background;
            // if the banner is full-screen height, set to 0; else, center vertically
            this.initialBannerTop = this.$banner.classList.contains('full-screen') 
                ? 0 
                : -(this.bannerBgHt - this.bannerHt) / 2;

            // amount of pixels the background image should move on scroll,
            // proportional to the amount of pixels window scrolls
            this.scrollRatio = options.scrollRatio || 0.1;
            
            // bind context of all class methods to the created instance object
            this.bindEvents = this.bindEvents.bind( this );
            this.parallax = this.parallax.bind( this );

            // run all initial class functionality
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
            // whether or not the parallax banner is currently scrolled into view
            this.elementIsVisible = (
                this.$banner.offsetTop - window.innerHeight <= window.scrollY
                    && window.scrollY <= this.$banner.offsetTop + (this.bannerHt)
            );
            
            // if banner is not currently in view, do nothing
            if ( !this.elementIsVisible ) return false;

            // re-adjust the image's position
            this.$bannerBg.style.top = this.initialBannerTop - (window.scrollY * this.scrollRatio) + 'px';
        }
    }

    // initiate the component
    const plxBanner = new BasicPlxBanner( {
        bannerSelector: '.hero-banner',
        backgroundSelector: '.plx-background', 
        backgroundImageSelector: '.plx-background-img',
        scrollRatio: -0.2 // defaults to 0.1
    });

});
