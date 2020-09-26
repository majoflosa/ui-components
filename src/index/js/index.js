import { elementFromTemplate } from '../../utils/dom';
import components from './export-components';
import views from './export-views';
import ViewBase from './views/view-base';

import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import sass from 'highlight.js/lib/languages/stylus';
import js from 'highlight.js/lib/languages/javascript';

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
        this.activeMenuLink = null;
        this.activeCode = null;

        // cache components code after fetching
        this.code = {};

        this.fetchUrlBase = window.location.origin.match('localhost')
            ? window.location.origin
            : `${window.location.origin}/ui-components`;

        // bind methods to instance context
        this.updateView = this.updateView.bind(this);
        this.updateFooterNav = this.updateFooterNav.bind(this);
        this.onCodeButtonClick = this.onCodeButtonClick.bind(this);
        this.onViewLinkClick = this.onViewLinkClick.bind(this);
        this.onModalOpenClick = this.onModalOpenClick.bind(this);
        this.onModalCloseClick = this.onModalCloseClick.bind(this);
        this.updateModalCode = this.updateModalCode.bind(this);
        this.loadComponentCode = this.loadComponentCode.bind(this);

        // initiate functionality
        this.setDomElements();
        this.bindEvents();

        // set initial active view
        this.updateView();
        if (!window.location.hash) window.history.pushState({}, '', '#view-intro');
        // set initial href & style for bottom nav links
        this.updateFooterNav();

        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('scss', scss);
        hljs.registerLanguage('sass', sass);
        hljs.registerLanguage('javascript', js);
        hljs.configure({ useBR: true });
    }

    // store useful dom elements
    setDomElements() {
        this.dom.componentTitle = document.body.querySelector('#component-title');
        this.dom.openModal = document.body.querySelector('.header__open-modal');

        this.dom.menu = document.body.querySelector('.menu__links');
        this.dom.menuLinks = this.dom.menu.querySelectorAll('a');

        this.dom.viewWrapper = document.body.querySelector('.view-wrapper');
        this.dom.viewSections = this.dom.viewWrapper.querySelectorAll('.view-section');
        this.dom.viewNavLinks = this.dom.viewWrapper.nextElementSibling.querySelectorAll('a');
        
        this.dom.modal = document.body.querySelector('.code-modal');
        this.dom.modalTitle = this.dom.modal.querySelector('.code-modal__title');
        this.dom.codeButtons = this.dom.modal.querySelector('.code-modal__buttons');
        this.dom.modalContent = this.dom.modal.querySelector('.code-modal__content');
        this.dom.modalClose = this.dom.modal.querySelector('.code-modal__close');
    }

    // bind events to respective dom elements
    bindEvents() {
        window.addEventListener('hashchange', this.updateView);
        this.dom.menuLinks.forEach(link => link.addEventListener('click', this.onViewLinkClick));
        this.dom.viewNavLinks.forEach(link => link.addEventListener('click', this.onViewLinkClick));

        this.dom.openModal.addEventListener('click', this.onModalOpenClick);
        this.dom.codeButtons.addEventListener('click', this.onCodeButtonClick);
        this.dom.modalClose.addEventListener('click', this.onModalCloseClick);
    }

    // update the view when 'route' changes; can be updated by nav links, updating url,
    // or back/forward browser navigation
    updateView(e, isClickEvent) {
        // if view is being updated by clicking a nav link, prevent link default action
        if (isClickEvent) e.preventDefault();
        // remove active class from current active view (if there is one) to hide it
        if (this.activeView) this.activeView.classList.remove('view-active');
        if (this.activeMenuLink) this.activeMenuLink.classList.remove('active');

        // get selected view from clicked link or current hash in url;
        // if neither, default to the intro view
        const view = isClickEvent 
            ? e.currentTarget.getAttribute('href') 
            : window.location.hash || '#view-intro';
        // get dom element corresponding to selected view
        this.activeView = view && this.dom.viewWrapper.querySelector(view);
        // if there is no such element, exit function
        if (!this.activeView) return;

        // if the view behavior has not been initialized, initialize now
        if (this.views[view] && !this.views[view].instance) {
            this.views[view].instance = new ViewBase(view);
        }

        // add the active class view to make it display
        this.activeView.classList.add('view-active');
        // add active class to menu link
        this.activeMenuLink = this.dom.menu.querySelector(`[href="${view}"]`);
        this.activeMenuLink.classList.add('active');
        // update title
        this.dom.componentTitle.innerText = this.activeMenuLink.innerText;

        // if component in current view has no js, disable its button
        const component = this.views[view].name;
        if (!this.components[component].init) {
            this.dom.codeButtons.querySelector('[data-code="js"]')
                .setAttribute('disabled', 'disabled');
        } else {
            this.dom.codeButtons.querySelector('[data-code="js"]')
                .removeAttribute('disabled');
        }

        // disable and hide 'See code' button on intro view
        this.dom.openModal.toggleAttribute('disabled', view === '#view-intro');
        this.dom.openModal.classList.toggle('hidden', view === '#view-intro');
        // disable all component links, except in intro
        if (view !== '#view-intro') {
            this.activeView.querySelectorAll('a').forEach(link => {
                if (link.getAttribute('href') === '#') link.addEventListener('click', (e) => e.preventDefault());
            });
        }

        // sync window history to enable 'back' and 'forward' navigation
        if (isClickEvent) window.history.pushState({}, '', view);
        window.scrollTo(0, 0);
    }

    // update next/prev bottom links href after view updates
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

    /** = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
     * Event Handlers
     * = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

    // invoked when any link that updates view is clicked;
    // updates view and footer links
    onViewLinkClick(e) {
        this.updateView(e, true);
        this.updateFooterNav();
    }

    // invoked when the 'See Code' button is clicked;
    // loads HTML code and opens modal
    onModalOpenClick(e) {
        e.preventDefault();
        
        // use active view's component name as key in 'this.code' cache
        const activeViewName = this.activeView.id.replace('view-', '');

        // Intro is not a component, don't show code for intro
        if (activeViewName === 'intro') {
            e.target.blur();
            return false;
        };

        if (!this.activeCode) this.activeCode = 'html';

        this.updateModalCode(activeViewName, this.activeCode);
    }

    // invoked when modal close button is clicked;
    // hides modal, removes selected state in code buttons
    onModalCloseClick(e) {
        e.preventDefault();
        this.dom.modal.classList.remove('open');
        this.dom.codeButtons.querySelector('.selected').classList.remove('selected');
    }

    // invoked when top code buttons are clicked;
    // loads selected code, opens modal, adds selected state to code button
    onCodeButtonClick(e) {
        e.preventDefault();
        
        // use active view's component name as key in 'this.code' cache
        const activeViewName = this.activeView.id.replace('view-', '');

        // Intro is not a component, don't show code for intro
        if (activeViewName === 'intro') {
            e.target.blur();
            return false;
        };
        
        // language of code about to be displayed; one of 'html', 'css', 'scss', 'sass', or 'js'
        // if js is already selected for a component that has no js, default to html
        this.activeCode = e.target.dataset.code === 'js'
            ? (this.components[activeViewName].init ? e.target.dataset.code : 'html')
            : e.target.dataset.code;

        this.updateModalCode(activeViewName, this.activeCode);
    }

    updateModalCode(component, language) {
        if (language === 'js' && !this.components[component].init) language = 'html';

        if (this.code[component] && this.code[component][language]) {
            this.dom.modalTitle.innerText = `${this.activeMenuLink.innerText} - ${language.toUpperCase()}`;
            this.dom.modalContent.innerHTML = '';
            this.dom.modalContent.append(this.code[component][language]);
        } else {
            this.dom.modal.classList.add('loading');
            
            this.loadComponentCode(component, language).then(() => {
                this.dom.modalTitle.innerText = `${this.activeMenuLink.innerText} - ${language.toUpperCase()}`;
                this.dom.modalContent.innerHTML = '';
                this.dom.modalContent.append(this.code[component][language]);
                this.dom.modal.classList.remove('loading');
            }).catch(err => {
                console.log('err: ', err);
                this.dom.modal.classList.remove('loading');
            });
        }

        if (this.dom.codeButtons.querySelector('.selected'))
            this.dom.codeButtons.querySelector('.selected').classList.remove('selected');

        this.dom.codeButtons
            .querySelector(`[data-code="${language}"]`)
            .classList
            .add('selected');

        this.dom.modal.classList.add('open');
    }

    loadComponentCode(component, language) {
        const headers = { 'Content-Type': 'text/plain' };

        return fetch(`${this.fetchUrlBase}/src/components/${component}/${component}.${language}`, { headers })
            .then(data => data.text())
            .then(text => {
                if (text.indexOf('Cannot GET') !== -1) {
                    this.code[component] = this.code[component] || {};
                    this.code[component][language] = null;

                    // e.target.blur();
                    this.dom.codeButtons.forEach(button => button.blur());

                    return false;
                }

                // create code element with preformatted content of loaded file
                const pre = document.createElement('pre');
                pre.innerText = text;
                const codeEl = document.createElement('code');
                codeEl.className = language; // language will match css class hljs needs for syntax highlight
                codeEl.append(pre);

                this.code[component] = this.code[component] || {};
                this.code[component][language] = codeEl;

                hljs.highlightBlock(codeEl);
            });
    }
}

window.componentsIndex = new ComponentsIndex();
console.log(window.componentsIndex);
window.parseDom = elementFromTemplate;

// if (module.hot) module.hot.accept();
