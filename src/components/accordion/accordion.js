class Accordion {
    constructor(el) {
        this.dom = { el: el };

        this.onPanelTriggerClick = this.onPanelTriggerClick.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.closePanel = this.closePanel.bind(this);

        this.setDomElements();
        this.setProperties();
        this.bindEvents();
    }

    setDomElements() {
        this.dom.panelTrigger = this.dom.el.querySelectorAll('.mf-accordion__panel-trigger');
        this.dom.panelBody = this.dom.el.querySelectorAll('.mf-accordion__panel-body');
    }

    setProperties() {
        this.isSingle = this.dom.panelTrigger.length === 1;
        this.isMultiple = !this.isSingle;
        this.opensMultiple = this.isMultiple && this.dom.el.classList.contains('mf-accordion--opens-multiple');
        this.animationDuration = null;
    }

    bindEvents() {
        this.dom.panelTrigger.forEach(button => button.addEventListener('click', this.onPanelTriggerClick));
    }

    onPanelTriggerClick(e) {
        const panel = e.currentTarget.parentElement.parentElement.parentElement;
        const panelBody = panel.querySelector('.mf-accordion__panel-body');
        const panelIsOpen = panel.classList.contains('open');

        if (!this.animationDuration) {
            const { transitionDuration, transitionDelay } = window.getComputedStyle(panelBody);
            this.animationDuration = parseFloat(transitionDuration) + parseFloat(transitionDelay) + 0.1;
        }

        this.togglePanel(panelBody, panelIsOpen);

        if (!this.opensMultiple && !panelIsOpen) {
            [...panel.parentElement.children].forEach(sibling => {
                if (sibling === panel) return;

                const siblingBody = sibling.querySelector('.mf-accordion__panel-body');
                this.togglePanel(siblingBody, true);
            });
        }
    }
    
    togglePanel(panelBody, panelIsOpen) {
        if (panelIsOpen) {
            this.closePanel(panelBody);
        } else {
            this.openPanel(panelBody);
        }

        panelBody.parentElement.classList.toggle('open', !panelIsOpen);
    }
    
    openPanel(panelBody) {
        const contentHeight = panelBody.firstElementChild.offsetHeight;
        
        panelBody.style.height = 0;
        panelBody.style.height = `${contentHeight}px`;
        setTimeout(() => panelBody.style = {}, this.animationDuration * 1000);
    }
    
    closePanel(panelBody) {
        const contentHeight = panelBody.firstElementChild.offsetHeight;
        
        panelBody.style.height = `${contentHeight}px`;
        setTimeout(() => panelBody.style.height = 0, 10);
    }
}

export default Accordion;
