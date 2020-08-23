import { elementFromTemplate } from '../../utils/dom';
import components from './export-components';
import views from './export-views';

import '../scss/style.scss';

/**
 * Functionality for index page of component library
 */
class ComponentsIndex {
    constructor() {
        // array of components available in project
        this.components = components;
        // array of views available in project
        this.views = views;
        // cache of dome elements
        this.dom = {};
        // current view in state
        this.activeView = null;

        // bind methods to instance context
        this.updateView = this.updateView.bind(this);
        this.updateFooterNav = this.updateFooterNav.bind(this);

        // initiate functionality
        this.setDomElements();
        this.bindEvents();

        // set initial active view
        this.updateView();
        if (!window.location.hash) window.history.pushState({}, '', '#view-intro');
        // set initial href & style for bottom nav links
        this.updateFooterNav();
    }

    // store useful dom elements
    setDomElements() {
        this.dom.componentTitle = document.getElementById('component-title');
        this.dom.menu = document.getElementById('menu');
        this.dom.menuLinks = this.dom.menu.querySelectorAll('a');
        this.dom.viewWrapper = document.querySelector('.view-wrapper');
        this.dom.viewSections = this.dom.viewWrapper.querySelectorAll('.view-section');
        this.dom.viewNavLinks = this.dom.viewWrapper.nextElementSibling.querySelectorAll('a');
    }

    // bind events to respective dom elements
    bindEvents() {
        window.addEventListener('hashchange', this.updateView);
        this.dom.menuLinks.forEach(link => link.addEventListener('click', (e) => {
            this.updateView(e, true);
            this.updateFooterNav();
        }));
        this.dom.viewNavLinks.forEach(link => link.addEventListener('click', (e) => {
            this.updateView(e, true);
            this.updateFooterNav();
        }));
    }

    // update the view when 'route' changes; can be updated by nav links, updating url,
    // or back/forward browser navigation
    updateView(e, isClickEvent) {
        // if view is being updated by clicking a nav link, prevent link default action
        if (isClickEvent) e.preventDefault();
        // remove active class from current active view (if there is one) to hide it
        if (this.activeView) {
            this.activeView.classList.remove('view-active');
            this.dom.menu.querySelector('.active').classList.remove('active');
        }

        // get selected view from clicked link or current hash in url;
        // if neither, default to the intro view
        const view = isClickEvent 
            ? e.currentTarget.getAttribute('href') 
            : window.location.hash || '#view-intro';
        // get dom element corresponding to selected view
        this.activeView = view && this.dom.viewWrapper.querySelector(view);
        // if there is no such element, exit function
        if (!this.activeView) return;

        // get component name from component element's data attribute
        const component = this.activeView.dataset.component;
        // if the component has not been rendered before, render it now

        // if the view behavior has not been initialized, initialize now
        if (this.views[view] && this.views[view].init && !this.views[view].instance) {
            this.views[view].instance = new this.views[view].init(
                view,
                this.components[component].className
            );
        }

        // add the active class view to make it display
        this.activeView.classList.add('view-active');
        // add active class to menu link
        this.activeMenuLink = this.dom.menu.querySelector(`[href="${view}"]`);
        this.activeMenuLink.classList.add('active');
        // update title
        this.dom.componentTitle.innerText = this.activeMenuLink.innerText;

        // sync window history to enable 'back' and 'forward' navigation
        if (isClickEvent) window.history.pushState({}, '', view);
        window.scrollTo(0, 0);
    }

    updateFooterNav() {
        const prevLink = this.dom.viewNavLinks[0];
        const nextLink = this.dom.viewNavLinks[1];

        // get hash for prev/next view from menu links adjacent to active one
        const prevHref = this.activeMenuLink.previousElementSibling
            ? this.activeMenuLink.previousElementSibling.getAttribute('href')
            : null;
        const nextHref = this.activeMenuLink.nextElementSibling
            ? this.activeMenuLink.nextElementSibling.getAttribute('href')
            : null;

        // update prev link href and style
        if (!prevHref) {
            prevLink.classList.add('hidden');
        } else {
            prevLink.classList.remove('hidden');
            prevLink.setAttribute('href', prevHref);
        }
        // update prev link href and style
        if (!nextHref) {
            nextLink.classList.add('hidden');
        } else {
            nextLink.classList.remove('hidden');
            nextLink.setAttribute('href', nextHref);
        }
    }
}

window.componentsIndex = new ComponentsIndex();
console.log(window.componentsIndex);
window.parseDom = elementFromTemplate;
