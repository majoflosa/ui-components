class Accordion {
    constructor(el) {
        // this.dom will hold references to handy DOM elements related to this component;
        // constructor receives main component element as 'el'
        this.dom = { el: el };

        // bind event handlers' context for all elements to the current instance
        this.onPanelTriggerClick = this.onPanelTriggerClick.bind(this);
        this.togglePanel = this.togglePanel.bind(this);

        // invoke initiation functions
        this.setDomElements();
        this.setProperties();
        this.bindEvents();
    }

    // saves references to handy DOM elements for this component in the this.dom object
    setDomElements() {
        this.dom.panelTriggers = [];
        this.dom.panelBody = [];

        // to support nested accordions, make sure to only store the panel elements from
        // the direct children of this instance's element; otherwise, the nested accordion's
        // trigger event listener would be added twice
        [...this.dom.el.children].forEach(panel => {
            this.dom.panelTriggers.push(panel.children[0].querySelector('.mf-accordion__panel-trigger'));
            this.dom.panelBody.push(panel.children[1]);
        });
    }

    // sets useful properties about this instance
    setProperties() {
        // is there only one panel in this accordion
        this.isSingle = this.dom.panelTriggers.length === 1;
        // or are there multiple panels
        this.isMultiple = !this.isSingle;
        // can more than one panel be open at a time
        this.opensMultiple = this.isMultiple && this.dom.el.classList.contains('mf-accordion--opens-multiple');
        // is this accordion inside another accordion's panel
        this.isNested = this.dom.el.parentElement.matches('.mf-accordion__panel-contents');
        // duration of close/open animation
        const { transitionDuration, transitionDelay } = window.getComputedStyle(this.dom.panelBody[0]);
        this.animationDuration = parseFloat(transitionDuration) + parseFloat(transitionDelay) + 0.1;
    }

    // bind component's elements to their respective DOM elements
    bindEvents() {
        this.dom.panelTriggers.forEach(button => button.addEventListener('click', this.onPanelTriggerClick));
    }

    /**
     * Event Handlers
     */

    // invoked when the panel header (button) is clicked
    onPanelTriggerClick(e) {
        // get wrapping panel for this clicked trigger
        const panel = e.currentTarget.parentElement.parentElement.parentElement;
        // body of panel about to be opened/closed
        const panelBody = panel.querySelector('.mf-accordion__panel-body');
        // current state of panel about to be opened/closed
        const panelIsOpen = panel.classList.contains('open');

        // opens/closes the panel body
        this.togglePanel(panelBody, panelIsOpen);

        // for accordions that should only keep one panel open at a time, close the rest if a panel is
        // being opened
        if (!this.opensMultiple && !panelIsOpen) {
            [...panel.parentElement.children].forEach(sibling => {
                if (sibling === panel) return;

                const siblingBody = sibling.querySelector('.mf-accordion__panel-body');
                this.togglePanel(siblingBody, true);
            });
        }
    }
    
    // opens/closes a panel's body
    togglePanel(panelBody, panelIsOpen) {
        // get the height of the body's content wrapper at the moment before opening/closing
        const contentHeight = panelBody.firstElementChild.offsetHeight;

        // if currently open, close panelBody by setting the height to it's content height,
        // and then set it to zero; the newly added height needs a little time, otherwise it
        // snaps shut without animating
        if (panelIsOpen) {
            panelBody.style.height = `${contentHeight}px`;
            setTimeout(() => panelBody.style.height = 0, 10);
        } else {
            // if currently closed, open panelBody by setting the height to 0 (to override 'auto' in css),
            // then set it to content's height
            panelBody.style.height = 0;
            panelBody.style.height = `${contentHeight}px`;
            // after the animation is complete, remove inline height
            setTimeout(() => panelBody.style = {}, this.animationDuration * 1000);
        }

        // add/remove 'open' class to/from main accordion element
        panelBody.parentElement.classList.toggle('open', !panelIsOpen);
    }
}

export default Accordion;
