class CarouselGallery {
    constructor( options ) {
        // the element wrapping the whole component
        this.$outerWrapper = document.querySelector( options.outerWrapperSelector );
        // abort function if there is no such element
        if ( !this.$outerWrapper ) {
            console.warn(`The provided query selector ${options.outerWrapperSelector} did not match any element on the document. Aborting carousel gallery function.`);
            return false;
        }

        // element wrapping carousel items
        this.$innerWrapper = this.$outerWrapper.querySelector( options.innerWrapperSelector );
        // abort function if there is no such element
        if ( !this.$outerWrapper ) {
            console.warn(`The provided query selector ${options.innerWrapperSelector} did not match any element on the document. Aborting carousel gallery function.`);
            return false;
        }

        // array of carousel items
        this.$items = [...this.$outerWrapper.querySelectorAll( options.itemSelector )];
        // abort function if carousel has no items
        if ( !this.$items.length ) {
            console.warn(`The provided query selector ${options.itemSelector} did not match any element on the document. Aborting carousel gallery function.`);
            return false;
        }

        // elements for dots controlling carousel
        this.$bullets = [...this.$outerWrapper.querySelectorAll( options.bulletSelector )];

        // class to give bullet for current item
        this.selectedBulletClass = options.selectedBulletClass || 'selected-bullet';
        // class to give all bullets
        this.bulletClass = options.bulletSelector || '.carousel-bullet';
        // duration for carousel horizontal scroll animation
        this.animationDuration = options.animationDuration === undefined ? 0.5 : options.animationDuration;

        // bind context of all methods to current instance
        this.bindEvents = this.bindEvents.bind( this );
        this.shiftCarousel = this.shiftCarousel.bind( this );
        this.calculateSizes = this.calculateSizes.bind( this );

        // gather initial information of item dimensions and count
        this.calculateSizes();
        // bind events to their handlers
        this.bindEvents();
    }

    bindEvents() {
        this.$bullets.forEach( $bullet => $bullet.addEventListener( 'click', this.shiftCarousel ) );
        window.addEventListener( 'resize', this.calculateSizes );
    }

    shiftCarousel( event ) {
        // store index of bullet being clicked
        const bulletIndex = this.$bullets.indexOf( event.target );

        // remove selected class from whichever has it, and add to clicked bullet
        this.$bullets.forEach( $bullet => $bullet.classList.remove( this.selectedBulletClass) );
        event.target.classList.add( this.selectedBulletClass );

        // animate the carousel to new position
        TweenMax.to( 
            this.$innerWrapper, 
            this.animationDuration, 
            {x: `-${(this.$items[0].offsetWidth + (this.$items[0].offsetLeft*2)) * bulletIndex}`}
        );
    }

    /* 
     * Gather initial info of item widths, distance to shift carousel, and amount of bullets needed
     */
    calculateSizes() {
        // items' width including left adn right margins; equal widths and margins are assumed
        this.itemWidthMargin = this.$items[0].offsetWidth + (this.$items[0].offsetLeft*2);
        // width of inner carousel that falls outside of outer wrapper
        this.shiftSpace = (this.$items.length * this.itemWidthMargin) - this.$outerWrapper.offsetWidth;
        // each additional bullet is for every item outside of the outer wrapper
        this.bulletsNeeded = Math.round(this.shiftSpace / this.itemWidthMargin);

        // creates bullet elements as needed
        this.addBullets( true ); 
    }

    /* 
     * Amount of bullets is determined dynamically, depending on total carousel width and number of items.
     */
    addBullets( addedOnResize = false ) {
        for ( let i = 0; i < this.bulletsNeeded; i++ ) {
            if ( this.$bullets.length <= this.bulletsNeeded ) {
                // there are currently less bullets than needed; creating new bullet
                const $bullet = document.createElement( 'span' );
                // add same class as the rest
                $bullet.classList.add( this.bulletClass.substr(1, this.bulletClass.length) );
                // bind click listener on new bullet
                if ( addedOnResize ) $bullet.addEventListener('click', this.shiftCarousel);
                
                // render the new bullet
                this.$bullets[0].parentElement.appendChild( $bullet );
                // add new bullet to bullets array
                this.$bullets.push( $bullet );
            } else if ( this.$bullets.length > this.bulletsNeeded + 1 ) {
                // there are currently more bullets than needed; removing last bullet from array and DOM
                const $lastBullet = this.$bullets.pop();
                this.$bullets[0].parentElement.removeChild( $lastBullet );
                
                if ( $lastBullet.classList.contains(this.selectedBulletClass) ) {
                    // removed bullet was selected at time of removal; make previous bullet selected
                    this.$bullets[this.$bullets.length - 1].classList.add( this.selectedBulletClass );
                    // shift carousel to position of last item
                    this.shiftCarousel( {target: this.$bullets[this.$bullets.length - 1]} );
                }
            } // end if else
        } // end for loop
    } 

}

window.addEventListener('load', () => {
    const articlesCarousel = new CarouselGallery({
        outerWrapperSelector: '.carousel-list-outer',
        innerWrapperSelector: '.carousel-list',
        itemSelector: '.carousel-item',
        bulletSelector: '.carousel-bullet', // defaults to '.carousel-bullet'
        selectedBulletClass: 'selected-bullet', // defaults to 'selected-bullet'
        animationDuration: 0.5 // seconds; defaults to 0.5
    });
});
