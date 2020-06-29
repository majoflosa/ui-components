class LightboxGallery {
    constructor( options ) {
        this.$lightbox = document.querySelector( options.lightboxSelector );
        if ( !this.$lightbox ) {
            if ( process.env.NODE_ENV === 'development' ) {
                console.warn( `The provided query selector ${options.lightboxSelector} did not match any elements. Aborting lightbox function.` );
                return false;
            }
        }

        this.$imageWrap = this.$lightbox.querySelector( options.imageWrapSelector );
        this.$image = this.$lightbox.querySelector( options.imageSelector );

        this.$thumbnails = [...document.querySelectorAll( '.lightbox-thumbnail' )];
        if ( !this.$thumbnails.length ) {
            if ( process.env.NODE_ENV === 'development' ) {
                console.warn( `The provided query selector ${options.thumbnailSelector} did not match any elements. Aborting lightbox function.` );
                return false;
            }
        }

        this.$nextButton = this.$lightbox.querySelector( options.nextButtonSelector );
        this.$prevButton = this.$lightbox.querySelector( options.prevButtonSelector );
        this.$close = this.$lightbox.querySelector( '.lightbox-close' );

        this.displaying = false;
        this.currentIndex = 0;
        this.imagesCache = [];

        this.bindEvents = this.bindEvents.bind( this );
        this.changeSlide = this.changeSlide.bind( this );
        this.updateImageSrc = this.updateImageSrc.bind( this );
        this.handleThumbnailClick = this.handleThumbnailClick.bind( this );
        this.toggleLightbox = this.toggleLightbox.bind( this );
        this.nextSlide = this.nextSlide.bind( this );
        this.prevSlide = this.prevSlide.bind( this );

        this.bindEvents();
    }

    bindEvents() {
        this.$thumbnails.forEach( $thumbnail => $thumbnail.addEventListener('click', this.handleThumbnailClick) );
        this.$nextButton.addEventListener( 'click', this.nextSlide );
        this.$prevButton.addEventListener( 'click', this.prevSlide );
        this.$close.addEventListener( 'click', this.toggleLightbox );
    }

    handleThumbnailClick( event ) {
        const $thumbnailLink = event.target.parentElement;
        this.currentImageSrc = $thumbnailLink.dataset.image;
        this.currentIndex = this.$thumbnails.indexOf( $thumbnailLink.parentElement );

        this.changeSlide( this.currentImageSrc );
        this.toggleLightbox( event );
    }

    changeSlide( src ) {
        this.$imageWrap.classList.add('loading');
        this.$image.src = '';

        if ( this.imagesCache.includes(src) ) {
            this.updateImageSrc( src );
        } else {
            const $newImage = document.createElement('img');
            $newImage.src = src;
            this.imagesCache.push( src );
    
            $newImage.addEventListener('load', () => {
                this.updateImageSrc( src );
            });
        }
    }

    prevSlide() {
        if ( this.currentIndex === 0 ) return false;

        this.currentIndex--;
        const newSrc = this.$thumbnails[this.currentIndex].querySelector('a').dataset.image;
        
        this.changeSlide( newSrc );
    }

    nextSlide() {
        if ( this.currentIndex >= this.$thumbnails.length ) return false;

        this.currentIndex++;
        const newSrc = this.$thumbnails[this.currentIndex].querySelector('a').dataset.image;
        
        this.changeSlide( newSrc );
    }

    updateImageSrc( src ) {
        this.$image.src = src;
        this.$imageWrap.classList.remove('loading');
        TweenLite.fromTo(this.$image, 0.25, {opacity: 0}, {opacity: 1});
    }

    toggleLightbox( event ) {
        if ( !this.$close ) return false;

        if ( this.displaying ) {
            // hide modal
            this.$lightbox.classList.remove('showing');
            this.$lightbox.classList.add('hidden');
            this.displaying = false;

            setTimeout( () => {
                this.$imageWrap.classList.add('loading');
                this.$image.src = '';
            }, 500);
        } else {
            // show modal
            this.$lightbox.classList.remove('hidden');
            this.$lightbox.classList.add('showing');
            this.displaying = true;
        }

        event.preventDefault();
    }
}


window.addEventListener('load', () => {
    const lightbox = new LightboxGallery({
        lightboxSelector: '.lightbox',
        thumbnailSelector: '.lightbox-thumbnail',
        imageWrapSelector: '.lightbox-image-wrap',
        imageSelector: '.lightbox-image',
        nextButtonSelector: '.lightbox-nav-next',
        prevButtonSelector: '.lightbox-nav-prev'
    });
});
