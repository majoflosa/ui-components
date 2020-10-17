class Modal {
    constructor(el) {
        // this.dom will hold references to handy DOM elements related to this component;
        // constructor receives main component element as 'el'
        this.dom = { el };

        // set default options
        this.defaultOptions = {
            layout: 'overlay',
        };

        // bind event handlers' context for all elements to the current instance
        this.onModalTriggerClick = this.onModalTriggerClick.bind(this);
        this.onModalCloseClick = this.onModalCloseClick.bind(this);

        // invoke initiation functions
        this.setDomElements();
        this.setProperties();
        this.bindEvents();
    }

    // saves references to handy DOM elements for this component in the this.dom object
    setDomElements() {
        this.dom.triggers = document.body.querySelectorAll('.mf-modal-trigger');
        this.dom.close = this.dom.el.querySelector('.mf-modal__close');
    }

    // sets useful properties about this instance
    setProperties() {
        // if there are 2 or more modals in current view, an id should be provided with data-modal-id attribute,
        // to link the button to its respective modal element
        this.hasModalId = this.dom.el.dataset.modalId !== undefined;
        // get options from data attributes, and merge with defaults
        this.options = Object.assign({}, this.defaultOptions, this.dom.el.dataset);
    }

    // bind component's elements to their respective DOM elements
    bindEvents() {
        this.dom.triggers.forEach(button => button.addEventListener('click', this.onModalTriggerClick));
        this.dom.close.addEventListener('click', this.onModalCloseClick);
    }

    /**
     * Event Handlers
     */

    // invoked when modal button is clicked
    onModalTriggerClick(e) {
        e.preventDefault();
        // quit if button id does not match this modal instance's id
        if (e.currentTarget.dataset.modalId !== this.dom.el.dataset.modalId) {
            return false;
        }

        // add 'open' class, which starts fade in animation
        this.dom.el.classList.add('open');
        // make modal element height of viewport
        this.dom.el.style.height = '100vh';

        // before overwriting body's styles, save current style to restore them later
        this.initialDocHeight = document.body.style.height;
        this.initialDocOverflow = document.body.style.overflow;
        // make the whole page size of viewport and hide overflow to prevent scrolling
        // while modal is open
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';
    }

    // invoked when modal close button is clicked
    onModalCloseClick(e) {
        e.preventDefault();

        // remove 'open' class which starts fade out animation
        this.dom.el.classList.remove('open');
        // when animation is done, shrink height to 0
        setTimeout(() => this.dom.el.style.height = 0, 310);

        // restore document height and overflow;
        document.body.style.height = this.initialDocHeight;
        document.body.style.overflow = this.initialDocOverflow;
    }
}

export default Modal;

/**
 * To initiate modal component:
 * 
 * import Modal from './path/to/modal.js';
 * 
 * const modalEl = document.querySelector('.mf-modal');
 * const modal = new Modal(modalEl);
 */