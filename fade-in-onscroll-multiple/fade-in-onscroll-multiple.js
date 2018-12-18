/**
 * Depends on TweenMax.min.js: https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js
 */

window.addEventListener('load', () => {

    class FadeInOnscroll {
        constructor( options ) {
            // the element that wraps content with fade in effect
            this.$element = document.querySelector( options.contentSelector );
            // wrapper's child elements, which will have the successive fadeIn animation
            this.fadeInSections = [...this.$element.querySelectorAll( options.fadeInSectionsSelector )];
            // duration of animation in seconds; defaults to 1
            this.duration = options.animationDuration || 1;
            // amount of pixels the content should slide
            this.positionShift = options.positionShift || 50;
            // animation delay in seconds between successive elements 
            this.stagger = options.staggerDelay || 0.3;

            // height of fade-in content wrapper
            this.elementHt = this.$element.offsetHeight;
            // track whether the content has already performed the animation
            this.contentDisplayed = false;

            // bind context of all methods to current instance
            this.init = this.init.bind( this );
            this.bindEvents = this.bindEvents.bind( this );
            this.fadeIn = this.fadeIn.bind( this );

            // run all initial functionality
            this.init();
        }

        /**
         * Run all initial functionality
         */
        init() {
            // make fade-in content invisible
            this.fadeInSections.forEach( section => section.style.opacity = 0 );

            // bind relevant events
            this.bindEvents();
        }

        /**
         * Bind relevant events
         */
        bindEvents() {
            window.addEventListener('scroll', this.fadeIn );
        }

        /**
         * Runs the animation if conditions are met
         */
        fadeIn() {
            // do nothing if animation already played
            if ( this.contentDisplayed ) return false;

            // check if enough has been scrolled to bring animated content into view
            if ( this.$element.offsetTop - window.innerHeight + (this.elementHt * 0.5) <= window.scrollY ) {
                // make note that animation has now played
                this.contentDisplayed = true;

                // create the animation
                TweenMax.staggerFromTo(
                    this.fadeInSections,
                    this.duration,
                    { y: this.positionShift, opacity: 0 },
                    { y: 0, opacity: 1, ease: Power1.easeOut },
                    this.stagger
                );
            }
        }

    }

    // instantiate the component
    const fadeInContent = new FadeInOnscroll({
        contentSelector: '.fade-in-wrap', // parent wrapper of sections with fade in effect
        fadeInSectionsSelector: '.fade-in-section', // sections with fade in effect
        animationDuration: 1, // seconds; defaults to 1
        positionShift: 50, // number of pixels the content should slide; defaults to 50
        staggerDelay: 0.3 // delay in seconds between successive elements; defaults to 0.3
    });

});
