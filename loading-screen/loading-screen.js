window.addEventListener('load', () => {
    
    class LoadingScreen {
        constructor( selector ) {
            // the element wrapping the loading screen content
            this.$body = document.querySelector('body');
            this.$loadingScreen = this.$body.querySelector( selector );

            // bind all methods' contexts to created instance
            this.init = this.init.bind( this );
            this.simulateLoading = this.simulateLoading.bind( this );
            this.fadeLoadingScreen = this.fadeLoadingScreen.bind( this );

            // run initial functionality
            this.init();
        }

        init() {
            // shrink body height to screen size while loading screen is visible
            this.$body.style.height = window.height + 'px';
            this.$body.style.overflow = 'hidden';

            // do not call this method on a real site; this method is just to simulate
            // loading time on this demo
            this.simulateLoading(); // delete/comment this line on your site
            
            // un-comment the line below on your site
            // this.fadeLoadingScreen();
        }

        /**
         * This method is only used to simulate loading time on this demo; do not run it on your site
         */
        simulateLoading() {
            setTimeout( this.fadeLoadingScreen, 4000 );
        }

        /**
         * Add `fulfilled` class to loading screen to trigger the css fadeOut animation
         */
        fadeLoadingScreen() {
            this.$loadingScreen.classList.add( 'fulfilled' );
            
            this.$body.style.height = 'auto';
            this.$body.style.overflow = 'initial';

            // hide element completely after 1.5 seconds
            setTimeout( () => {
                this.$loadingScreen.style.display = 'none';
            }, 1500);
        }
    }

    // instantiate the class
    const loadingScreen = new LoadingScreen( '#loading-screen' );

});
