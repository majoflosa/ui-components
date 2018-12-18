window.addEventListener('load', () => {
    
    class MultiplePlxBanner {
        /**
         * 
         * @param { string } bannerSelector css selector for wrapping parallax element
         * @param { string } backgroundElementSelector css selector for element wrapping background image
         * @param { string } backgroundImageSelector css selector for background image
         * @param { number } scrollRatio proportion of how many pixels to shift background to pixels scrolled
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

            this.scrollRatio = selectors.scrollRatio;
            
            // bind context of all class methods to the created instance object
            this.init = this.init.bind( this );
            this.bindEvents = this.bindEvents.bind( this );
            this.parallax = this.parallax.bind( this );

            // run all initial class functionality
            this.init();
        }

        /**
         * Set initial `top` position of image being used as background,
         * Calculate total vertical space above the banner element
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
            let isElementVisible = this.$banner.offsetTop - window.innerHeight <= window.scrollY
                && window.scrollY <= this.$banner.offsetHeight + (this.bannerHt*2);
                
            if ( isElementVisible ) {
                // amount of pixels to shift background, based on element's vertical position on the page
                const plxScroll = window.scrollY * this.scrollRatio;
                // set new `top` value on background
                this.$bannerBg.style.top = this.initialBannerTop - plxScroll + 'px';
            }
        }
    }

    // initiate the component
    const plxBanner = new MultiplePlxBanner({
        bannerSelector: '#banner-1', 
        backgroundSelector: '.plx-background', 
        backgroundImageSelector: '.plx-background-img',
        scrollRatio: 0.15 // 0.15 is the default value
    });

    const plxBanner2 = new MultiplePlxBanner({
        bannerSelector: '#banner-3', 
        backgroundSelector: '.plx-background', 
        backgroundImageSelector: '.plx-background-img', 
        scrollRatio: 0.25
    });

});
