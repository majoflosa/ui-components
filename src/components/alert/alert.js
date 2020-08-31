class Alert {
    constructor(el) {
        // this.dom will hold references to handy DOM elements related to this component;
        // constructor receives main component element as 'el'
        this.dom = { el: el };

        // bind event handlers' context for all elements to the current instance
        this.onDismissClick = this.onDismissClick.bind(this);        

        // invoke initiation functions
        this.setDomElements();
        this.setAlertProperties();
        this.bindEvents();
    }

    // saves references to handy DOM elements for this component in the this.dom object
    setDomElements() {
        this.dom.close = this.dom.el.querySelector('.mf-alert__close');
    }

    // sets useful properties about this instance
    setAlertProperties() {
        // is there a 'Dismiss' button
        this.isDismissable = !!this.dom.close;
    }

    // bind component's elements to their respective DOM elements
    bindEvents() {
        if (this.isDismissable) {
            this.dom.close.addEventListener('click', this.onDismissClick);
        }
    }

    /**
     * Event Handlers
     */

    // invoked when 'Dismiss' button is clicked
    onDismissClick(e) {
        // buttons may emit events, for example inside a form element
        // prevent default just in case
        e.preventDefault();
        
        // add css class that starts fade out animation
        this.dom.el.classList.add('dismissed');

        // get animation timing properties to calculate when animation is fully over
        let { transitionDuration, transitionDelay } = window.getComputedStyle(this.dom.el);
        transitionDuration = parseFloat(transitionDuration) * 1000;
        transitionDelay = parseFloat(transitionDelay) * 1000;
        
        // add an extra 100 ms to animation duration and delay
        const animationComplete = transitionDuration + transitionDelay + 100;
        // when animation is complete, hide element completely.
        setTimeout(() => this.dom.el.style.display = 'none', animationComplete);
    }
}

export default Alert;

/**
 * To initiate alert component:
 * 
 * import Alert from './path/to/alert.js';
 * 
 * const alertEl = document.querySelector('.mf-alert');
 * const alert = new Alert(alertEl);
 */