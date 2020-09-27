class Tooltip {
    constructor(el) {
        this.dom = { el: el };

        this.onClickTrigger = this.onClickTrigger.bind(this);
        this.onMouseoverTrigger = this.onMouseoverTrigger.bind(this);
        this.onMouseleaveTrigger = this.onMouseleaveTrigger.bind(this);

        this.setDomElements();
        this.setProperties();
        this.bindEvents();
        this.getTooltipPosition();
    }

    setDomElements() {
        this.dom.trigger = this.dom.el.querySelector('.mf-tooltip__trigger');
        this.dom.tooltip = this.dom.el.querySelector('.mf-tooltip__element');

        if (!this.dom.trigger) 
            throw new Error('Tooltip component requires an element with class "mf-tooltip__trigger".');

        if (!this.dom.tooltip) {
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'mf-tooltip__element';
            
            this.dom.el.append(tooltipElement);
            this.dom.tooltip = tooltipElement;
        }
    }

    setProperties() {
        const dataset = this.dom.el.dataset;
        this.text = dataset.tooltipText || '';
        this.position = dataset.tooltipPosition || 'top';
        this.triggerEvent = dataset.tooltipTrigger || 'mouseover';

        this.tooltipIsShowing = false;
        this.noContent = false;

        if (this.dom.tooltip.innerHTML === '' && !this.text) {
            this.noContent = true;
        } else if (this.dom.tooltip.innerHTML === '') {
            this.dom.tooltip.innerText = this.text;
        }
    }

    getTooltipPosition() {
        let offsetParent = this.dom.trigger.offsetParent;
        let topOffset = this.dom.trigger.offsetTop;
        let leftOffset = this.dom.trigger.offsetLeft;

        let i = 0;
        while (!offsetParent || !offsetParent.classList.contains('mf-tooltip')) {
            let newParent = offsetParent.offsetParent;
            topOffset += offsetParent.offsetTop;
            leftOffset += offsetParent.leftOffset;
            offsetParent = newParent;

            i++;
            if (i > 15) break;
        }

        const widthsDiff = this.dom.tooltip.offsetWidth > this.dom.trigger.offsetWidth
            ? this.dom.tooltip.offsetWidth - this.dom.trigger.offsetWidth
            : this.dom.trigger.offsetWidth - this.dom.tooltip.offsetWidth;
        const heightsDiff = this.dom.tooltip.offsetHeight > this.dom.trigger.offsetHeight
            ? this.dom.tooltip.offsetHeight - this.dom.trigger.offsetHeight
            : this.dom.trigger.offsetHeight - this.dom.tooltip.offsetHeight;

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

        this.dom.tooltip.style.top = `${this.positions[this.position].top}px`;
        this.dom.tooltip.style.left = `${this.positions[this.position].left}px`;
    }

    bindEvents() {
        if (!this.dom.tooltip) return;
        if (this.triggerEvent === 'click') {
            this.dom.trigger.addEventListener('click', this.onClickTrigger);
        } else {
            this.dom.trigger.addEventListener('mouseenter', this.onMouseoverTrigger);
            this.dom.trigger.addEventListener('mouseleave', this.onMouseleaveTrigger);
        }
    }

    /**
     * Event Handlers
     */

    onClickTrigger(e) {
        e.preventDefault();

        this.tooltipIsShowing = !this.tooltipIsShowing;
        this.dom.el.classList.toggle('open', this.tooltipIsShowing);
    }

    onMouseoverTrigger(e) {
        e.preventDefault();

        this.tooltipIsShowing = true;
        this.dom.el.classList.toggle('open', true);
    }
    onMouseleaveTrigger(e) {
        e.preventDefault();

        this.tooltipIsShowing = false;
        this.dom.el.classList.toggle('open', false);
    }
}

export default Tooltip;
