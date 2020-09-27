class Tooltip {
    constructor(el) {
        // this.dom will hold references to handy DOM elements related to this component;
        // constructor receives main component element as 'el'
        this.dom = { el: el };

        // bind event handlers' context for all elements to the current instance
        this.onClickTrigger = this.onClickTrigger.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMouseoverTrigger = this.onMouseoverTrigger.bind(this);
        this.onMouseleaveTrigger = this.onMouseleaveTrigger.bind(this);

        // invoke initiation functions
        this.setDomElements();
        this.setProperties();
        this.bindEvents();
        this.setTooltipPosition();
    }

    // saves references to handy DOM elements for this component in the this.dom object
    setDomElements() {
        this.dom.trigger = this.dom.el.querySelector('.mf-tooltip__trigger');
        this.dom.tooltip = this.dom.el.querySelector('.mf-tooltip__element');

        // a trigger element is required; throw error if none is provided
        if (!this.dom.trigger) 
            throw new Error('Tooltip component requires an element with class "mf-tooltip__trigger".');

        // if no tooltip element is provided, create an empty one
        if (!this.dom.tooltip) {
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'mf-tooltip__element';
            
            this.dom.el.append(tooltipElement);
            this.dom.tooltip = tooltipElement;
        }
    }

    // sets useful properties about this instance
    setProperties() {
        // settings can be provided as data attributes
        const dataset = this.dom.el.dataset;
        this.text = dataset.tooltipText || '';
        this.position = dataset.tooltipPosition || 'top';
        this.triggerEvent = dataset.tooltipTrigger || 'mouseover';

        // track state
        this.tooltipIsShowing = false;
        this.noContent = false;

        // if tooltip element is empty, add text from component's data-tooltip-text attribute if it exists
        if (this.dom.tooltip.innerHTML === '' && !this.text) {
            this.noContent = true;
        } else if (this.dom.tooltip.innerHTML === '') {
            this.dom.tooltip.innerText = this.text;
        }
    }

    // calculate position relative to component element and trigger element
    setTooltipPosition() {
        // initial top and left offset from trigger element to parent
        let offsetParent = this.dom.trigger.offsetParent;
        let topOffset = this.dom.trigger.offsetTop;
        let leftOffset = this.dom.trigger.offsetLeft;

        // increase offset distance as needed when traversing through trigger's parent elements,
        // until the tooltip wrapper is reached
        while (offsetParent && !offsetParent.classList.contains('mf-tooltip')) {
            let newParent = offsetParent.offsetParent;
            topOffset += offsetParent.offsetTop;
            leftOffset += offsetParent.leftOffset;
            offsetParent = newParent;
        }

        // to help calculate middle alignment - vertical and horizontal - of trigger and tooltip,
        // calculate difference in size between them
        const widthsDiff = this.dom.tooltip.offsetWidth > this.dom.trigger.offsetWidth
            ? this.dom.tooltip.offsetWidth - this.dom.trigger.offsetWidth
            : this.dom.trigger.offsetWidth - this.dom.tooltip.offsetWidth;
        const heightsDiff = this.dom.tooltip.offsetHeight > this.dom.trigger.offsetHeight
            ? this.dom.tooltip.offsetHeight - this.dom.trigger.offsetHeight
            : this.dom.trigger.offsetHeight - this.dom.tooltip.offsetHeight;

        // set top and left positions, for each possible tooltip position: top, bottom, left, and right
        this.positions = {
            top: {
                top: topOffset - this.dom.tooltip.offsetHeight - 8,
                left: leftOffset - (widthsDiff / 2)
            },
            bottom: {
                top: topOffset + this.dom.tooltip.offsetHeight,
                left: leftOffset - (widthsDiff / 2)
            },
            left: {
                top: topOffset - (heightsDiff / 2),
                left: leftOffset - this.dom.tooltip.offsetWidth - 12
            },
            right: {
                top: topOffset - (heightsDiff / 2),
                left: leftOffset + this.dom.trigger.offsetWidth + 12
            }
        };

        // update top and left style of tooltip element
        this.dom.tooltip.style.top = `${this.positions[this.position].top}px`;
        this.dom.tooltip.style.left = `${this.positions[this.position].left}px`;
    }

    // bind component's elements to their respective DOM elements
    bindEvents() {
        if (this.triggerEvent === 'click') {
            this.dom.trigger.addEventListener('click', this.onClickTrigger);
            document.addEventListener('click', this.onDocumentClick);
        } else {
            this.dom.trigger.addEventListener('mouseenter', this.onMouseoverTrigger);
            this.dom.trigger.addEventListener('mouseleave', this.onMouseleaveTrigger);
        }
    }

    /**
     * Event Handlers
     */

    // invoked when trigger is clicked (if trigger event is click instead of hover);
    // toggles tooltip visibility
    onClickTrigger(e) {
        e.preventDefault();
        e.stopPropagation();

        this.tooltipIsShowing = !this.tooltipIsShowing;
        this.dom.el.classList.toggle('open', this.tooltipIsShowing);
    }

    onDocumentClick(e) {
        if (this.tooltipIsShowing && !this.dom.tooltip.contains(e.target) && e.target !== this.dom.tooltip) {
            this.tooltipIsShowing = false;
            this.dom.el.classList.toggle('open', false);
        }
    }

    // invoked when trigger is hovered over; makes tooltip visible
    onMouseoverTrigger(e) {
        e.preventDefault();

        this.tooltipIsShowing = true;
        this.dom.el.classList.toggle('open', true);
    }
    // invoked when trigger is hovered out of; hides tooltip
    onMouseleaveTrigger(e) {
        e.preventDefault();

        this.tooltipIsShowing = false;
        this.dom.el.classList.toggle('open', false);
    }
}

export default Tooltip;

/**
 * To initiate tooltip component:
 * 
 * import Tooltip from './path/to/tooltip.js';
 * 
 * const tooltipEl = document.querySelector('.mf-tooltip');
 * const tooltip = new Tooltip(tooltipEl);
 */
