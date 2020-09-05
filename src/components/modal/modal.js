class Modal {
    constructor(el) {
        this.dom = { el };

        this.defaultOptions = {
            layout: 'overlay',
        };

        this.onModalTriggerClick = this.onModalTriggerClick.bind(this);
        this.onModalCloseClick = this.onModalCloseClick.bind(this);

        this.setDomElements();
        this.setProperties();
        this.bindEvents();
    }

    setDomElements() {
        this.dom.triggers = document.body.querySelectorAll('.mf-modal-trigger');
        this.dom.close = this.dom.el.querySelector('.mf-modal__close');
    }

    setProperties() {
        this.hasModalId = this.dom.el.dataset.modalId !== undefined;
        this.options = Object.assign({}, this.defaultOptions, this.dom.el.dataset);
    }

    bindEvents() {
        this.dom.triggers.forEach(button => button.addEventListener('click', this.onModalTriggerClick));
        this.dom.close.addEventListener('click', this.onModalCloseClick);
    }

    /**
     * Event Handlers
     */

    onModalTriggerClick(e) {
        e.preventDefault();

        if (e.currentTarget.dataset.modalId !== this.dom.el.dataset.modalId) {
            return false;
        }

        this.dom.el.classList.add('open');
        this.dom.el.style.height = '100vh';

        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';
    }

    onModalCloseClick(e) {
        e.preventDefault();

        this.dom.el.classList.remove('open');
        setTimeout(() => this.dom.el.style.height = 0, 310);

        document.body.style.height = 'auto';
        document.body.style.overflow = 'auto';
    }
}

export default Modal;

/**
 * 
 */