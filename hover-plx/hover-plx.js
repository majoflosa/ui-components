window.addEventListener('load', () => {

    class HoverPlx {
        /**
         * 
         * @param { string } bannerSelector css selector for wrapping parallax element
         * @param { string } backgroundSelector css selector for element wrapping background image
         * @param { string } contentSelector css selector for element wrapping banner content
         */
        constructor( selectors ) {
            // the element that wraps content and parallaxed background
            this.$banner = document.querySelector( selectors.bannerSelector );
            // the element containing the image to use as background for the banner
            this.$plxBackground = document.querySelector( selectors.backgroundSelector );
            // the element containing the content of the banner
            this.$content = this.$banner.querySelector( selectors.contentSelector );

            // max distance in px the content can move from its original position
            this.contentPlxRange = 10;
            // max distance in px the background can move from its original position 
            this.bannerPlxRange = 5; 

            // width of the banner wrapper
            this.bannerWd = this.$banner.offsetWidth;
            // position of central horizontal axis of the banner
            this.centerX = this.bannerWd / 2;
            
            // height of the banner wrapper
            this.bannerHt = this.$banner.offsetHeight;
            // position of central vertical axis of the banner
            this.centerY = this.bannerHt / 2;

            // initial value for `top` css property of background
            this.initialPlxBackgroundTop = -(this.$plxBackground.querySelector('img').offsetHeight - this.bannerHt)/2
            // initial value for `left` css property of background
            this.initialPlxBackgroundLeft = -(this.$plxBackground.querySelector('img').offsetWidth - this.bannerWd)/2

            // binding context of all methods to returned instance
            this.init = this.init.bind( this );
            this.bindEvents = this.bindEvents.bind( this );
            this.hoverParallax = this.hoverParallax.bind( this );

            // run all initial functionality
            this.init();
        }

        /**
         * Set initial `top` and `left` positions of image being used as background,
         * Bind event listeners to pertinent DOM elements
         */
        init() {
            this.$plxBackground.style.top = this.initialPlxBackgroundTop + 'px';
            this.$plxBackground.style.left = this.initialPlxBackgroundLeft + 'px';
            this.bindEvents();
        }

        bindEvents() {
            this.$banner.addEventListener( 'mousemove', this.hoverParallax );
        }

        hoverParallax( e ) {
            // proportion of horizontal mouse position to max movement range
            const hoverRatioX = (this.centerX - e.clientX)/this.centerX;
            // distance in px content will shift horizontally
            const contentShiftX = this.contentPlxRange * hoverRatioX;
            // distance in px banner will shift horizontally
            const bannerShiftX = this.bannerPlxRange * hoverRatioX;
            
            // proportion of vertical mouse position to max movement range
            const hoverRatioY = (this.centerY - e.clientY)/this.centerY;
            // distance in px content will shift vertically
            const contentShiftY = this.contentPlxRange * hoverRatioY;
            // distance in px banner will shift vertically
            const bannerShiftY = this.bannerPlxRange * hoverRatioY;

            // set new `top` and `left` values for content
            this.$content.style.left = contentShiftX + 'px';
            this.$content.style.top = contentShiftY + 'px';
            
            // set new `top` and `left` values for banner
            this.$plxBackground.style.left = this.initialPlxBackgroundLeft - bannerShiftX + 'px';
            this.$plxBackground.style.top = this.initialPlxBackgroundTop - bannerShiftY + 'px';
        }
    }

    // instantiate the component
    const hoverPlx = new HoverPlx({
        bannerSelector: '.hero-banner',
        backgroundSelector: '.plx-background',
        contentSelector: '.hero-banner__content'
    });

});
