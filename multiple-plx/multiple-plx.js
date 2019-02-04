class MultiplePlxBanner {
    /**
     * 
     * @param { string } bannerSelector css selector for wrapping parallax element
     * @param { string } backgroundElementSelector css selector for element wrapping background image
     * @param { string } backgroundImageSelector css selector for background image
     * @param { number } scrollRatio proportion of how many pixels to shift background to pixels scrolled
     */
    constructor( options ) {
        // the element that wraps content and parallax background
        this.$banner = document.querySelector( options.bannerSelector );
        // abort everything if there is no banner
        if ( !this.$banner ) {
            console.warn(`The query selector "${options.bannerSelector}" did not match any elements on the document. Aborting parallax function.`);
            return false;
        }
        // the element containing the image to use as background for the banner
        this.$bannerBg = this.$banner.querySelector( options.backgroundSelector );
        // abort everything if there is no banner background element
        if ( !this.$bannerBg ) {
            console.warn(`The query selector "${options.backgroundSelector}" did not match any elements on the document. Aborting parallax function.`);
            return false;
        }

        this.$bannerBgImg = this.$bannerBg.querySelector( options.backgroundImageSelector );
        // abort everything if there is no banner background image element
        if ( !this.$bannerBgImg ) {
            console.warn(`The query selector "${options.backgroundImageSelector}" did not match any elements on the document. Aborting parallax function.`);
            return false;
        }

        // the height of the wrapper element
        this.bannerHt = this.$banner.offsetHeight;
        // the height of the image used as background
        this.bannerBgHt = this.$bannerBgImg.offsetHeight;

        // value to use for `top` css property on image used as background
        this.initialBannerTop = -(this.bannerBgHt - this.bannerHt) / 2;

        this.scrollRatio = options.scrollRatio || 0.15;
        
        // bind context of all class methods to the created instance object
        this.bindEvents = this.bindEvents.bind( this );
        this.parallax = this.parallax.bind( this );

        // set initial `top` value
        this.$bannerBg.style.top = this.initialBannerTop + 'px';
        // bind all necessary events to respective handlers
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener( 'scroll', this.parallax );
    }
    
    /**
     * Calculate and set new `top` value for banner image based on window scroll position
     */
    parallax() {
        // whether or not banner element has been scrolled into view
        const isElementVisible = this.$banner.offsetTop - window.innerHeight <= window.scrollY
            && window.scrollY <= this.$banner.offsetHeight + (this.bannerHt*2);
            
        if ( isElementVisible ) {
            // amount of pixels to shift background, based on element's vertical position on the page
            const plxScroll = window.scrollY * this.scrollRatio;
            // set new `top` value on background
            this.$bannerBg.style.top = this.initialBannerTop - plxScroll + 'px';
        }
    }
}

window.addEventListener('load', () => {
    // initiate the component
    const plxBanner = new MultiplePlxBanner({
        bannerSelector: '#banner-1', 
        backgroundSelector: '.plx-background', 
        backgroundImageSelector: '.plx-background-img',
        scrollRatio: -0.15 // 0.15 is the default value
    });

    const plxBanner2 = new MultiplePlxBanner({
        bannerSelector: '#banner-3', 
        backgroundSelector: '.plx-background', 
        backgroundImageSelector: '.plx-background-img', 
        scrollRatio: -0.15
    });

});
