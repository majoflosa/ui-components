class ModalBox {
    constructor( options ) {
        this.$modal = document.querySelector( options.wrapperSelector );
        if ( !this.$modal ) {
            console.warn( `The provided query selector ${options.wrapperSelector} did not match any element on the document.` );

            return false;
        }
        this.$togglers = [];
        
        this.hiddenClass = options.hiddenClass;
        this.visibleClass = options.visibleClass;
        this.displaying = false;
        
        this.setTogglers = this.setTogglers.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.toggleModal = this.toggleModal.bind( this );
        
        this.setTogglers( options.togglerSelectors );
        this.bindEvents();
    }

    setTogglers( selectors ) {
        for ( let i = 0; i < selectors.length; i++ ) {
            let $toggler = document.querySelector( selectors[i] );
            if ( $toggler ) this.$togglers.push( $toggler );
        } 
    }

    bindEvents() {
        this.$togglers.forEach( $toggler => $toggler.addEventListener('click', this.toggleModal) );
    }

    toggleModal() {
        if ( this.displaying ) {
            this.$modal.classList.remove( 'showing' );
            this.$modal.classList.add( 'hidden' );
        } else {
            this.$modal.classList.remove( 'hidden' );
            this.$modal.classList.add( 'showing' );
        }

        this.displaying = !this.displaying;
    }
}

window.addEventListener('load', () => {
    const landingModal = new ModalBox({
        wrapperSelector: '.landing-modal',
        togglerSelectors: ['.modal-close', '#trigger', '.cancel-modal-action'],
        hiddenClass: 'hidden',
        visibleClass: 'visible',
        // animationDuration: 0.5
    });
});
