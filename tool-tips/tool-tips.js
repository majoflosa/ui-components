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
                toggler.addEventListener( 'mouseenter', this.show );
                toggler.addEventListener( 'mouseout', this.hide );
            } else {
                toggler.addEventListener( 'click', this.toggle );
            }
        });
    }

    buildTooltip( toggler ) {
        const $tooltip = document.createElement( 'span' );
        $tooltip.className = this.tooltipClass + ' ' + toggler.dataset.ttPosition;
        $tooltip.innerText = toggler.dataset.ttText;
        
        // toggler.appendChild( $tooltip );
        toggler.parentElement.insertBefore( $tooltip, toggler );
        toggler.parentElement.style.position = 'relative';
        // $tooltip.style[toggler.dataset.ttPosition] = - $tooltip.offsetHeight + 'px';
        if ( toggler.dataset.ttPosition === 'top' ) {
            let shift = (-$tooltip.offsetWidth/2) + (toggler.offsetWidth/2);
            $tooltip.style.transform = `translateX(${shift}px)`;
        }
    }

    toggle() {
        
    }

    show() {

    }

    hide() {

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