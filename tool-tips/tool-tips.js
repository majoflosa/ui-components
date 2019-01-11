class Tooltip {
    constructor( options ) {
        this.$togglers = [...document.querySelectorAll( options.togglerSelector )];

        this.toggleBy = options.toggleBy || 'hover';
        this.tooltipClass = options.tooltipClass || 'tool-tip';

        this.init = this.init.bind( this );
        this.bindEvents = this.bindEvents.bind( this );
        this.toggle = this.toggle.bind( this );
        this.show = this.show.bind( this );
        this.hide = this.hide.bind( this );

        this.init();
    }

    init() {
        this.$togglers.forEach( toggler => this.buildTooltip( toggler ) );
        this.bindEvents();
    }

    bindEvents() {
        this.$togglers.forEach( toggler => {
            if ( this.toggleBy === 'hover' ) {
                toggler.addEventListener( 'mouseenter', event => this.show( event.target ) );
                toggler.addEventListener( 'mouseout', event => this.hide( event.target ) );
            } else {
                toggler.addEventListener( 'click', event => this.toggle( event.target ) );
            }
        });
    }

    buildTooltip( toggler ) {
        const $tooltip = document.createElement( 'span' );
        $tooltip.className = this.tooltipClass + ' ' + toggler.dataset.ttPosition;
        $tooltip.innerText = toggler.dataset.ttText;
        
        toggler.parentElement.style.position = 'relative';
        toggler.parentElement.insertBefore( $tooltip, toggler );
        
        if ( ['top', 'bottom'].includes( toggler.dataset.ttPosition) ) {
            const shift = (-$tooltip.offsetWidth/2) + (toggler.offsetWidth/2);
            $tooltip.style.transform = `translateX(${shift}px)`;
        } else if ( ['left', 'right'].includes(toggler.dataset.ttPosition) ) {
            const shift = toggler.dataset.ttPosition === 'left' 
            ? -$tooltip.offsetWidth - 15 
            : toggler.offsetWidth + 15;
            $tooltip.style.transform = `translate(${shift}px, ${-toggler.offsetHeight/2}px)`;
        }
        $tooltip.style.display = 'none';
    }

    toggle( toggler ) {
        const $tooltip = toggler.parentElement.querySelector( `.${this.tooltipClass}` );
        $tooltip.style.display = $tooltip.style.display === 'none' ? 'inline-block' : 'none';
    }

    show( toggler ) {
        toggler.parentElement.querySelector( `.${this.tooltipClass}` ).style.display = 'inline-block';
    }

    hide( toggler ) {
        toggler.parentElement.querySelector( `.${this.tooltipClass}` ).style.display = 'none';
    }
}

window.addEventListener('load', () => {
    const tooltip = new Tooltip({
        togglerSelector: '.tool-tip-toggle',
        toggleBy: 'hover', // or click; defaults to hover
        tooltipClass: 'tool-tip' // default: tool-tip
        // fadeDuration: 0.25 // seconds
    });
    // const tooltipBottom = new Tooltip();
    // const tooltipLeft = new Tooltip();
    // const tooltipRight = new Tooltip();
})