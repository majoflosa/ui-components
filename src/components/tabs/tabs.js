class Tabs {
    constructor(el) {
        // this.dom will hold references to handy DOM elements related to this component;
        // constructor receives main component element as 'el'
        this.dom = { el };

        // bind event handlers' context for all elements to the current instance
        this.onTabClick = this.onTabClick.bind(this);

        // invoke initiation functions
        this.setDomElements();
        this.setProperties();
        this.bindEvents();
    }

    // saves references to handy DOM elements for this component in the this.dom object
    setDomElements() {
        this.dom.header = this.dom.el.querySelector('.mf-tabs__header');
        this.dom.tabs = this.dom.el.querySelectorAll('.mf-tabs__tab');
        this.dom.content = this.dom.el.querySelector('.mf-tabs__content');
        this.dom.panels = this.dom.el.querySelectorAll('.mf-tabs__panel');
    }

    // sets useful properties about this instance
    setProperties() {
        this.selectedTab = this.dom.header.querySelector('.selected') || this.dom.tabs[0];
        this.selectedPanel = this.dom.content.querySelector(`[data-index="${this.selectedTab.dataset.index}"]`);

        // html may or may not initially have pre-selected tabs/panels; add selected class if not
        if (!this.selectedTab.classList.contains('selected')) this.selectedTab.classList.add('selected');
        if (!this.selectedPanel.classList.contains('selected')) this.selectedPanel.classList.add('selected');
    }

    // bind component's elements to their respective DOM elements
    bindEvents() {
        this.dom.tabs.forEach(tab => tab.addEventListener('click', this.onTabClick));
    }

    /**
     * Event Handlers
     */

    // invoked when the panel header (button) is clicked
    onTabClick(e) {
        // get data-index value that links a tab with its panel
        const selectedIndex = e.currentTarget.dataset.index;

        // clear currently selected tab/pabel
        this.selectedTab.classList.remove('selected');
        this.selectedPanel.classList.remove('selected');

        // update selected tab
        this.selectedTab = e.currentTarget;
        this.selectedTab.classList.add('selected');
        // update selected panel
        this.selectedPanel = this.dom.content.querySelector(`[data-index="${selectedIndex}"]`);
        this.selectedPanel.classList.add('selected');
    }
}

export default Tabs;

/**
 * To initiate tabs component:
 * 
 * import Tabs from './path/to/tabs.js';
 * 
 * const tabsEl = document.querySelector('.mf-tabs');
 * const tabs = new Tabs(tabsEl);
 */
