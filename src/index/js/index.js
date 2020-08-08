import { elementFromTemplate } from '../../utils/dom';
import button from '../../components/button/button';
import hero from '../../components/hero/hero';

import '../scss/style.scss';

class ComponentsIndex {
    constructor() {
        this.components = {
            button,
            hero,
        };
        this.dom = {};
        this.activeView = null;

        this.updateView = this.updateView.bind(this);

        this.setDomElements();
        this.bindEvents();

        if (window.location.hash) this.updateView();
    }

    setDomElements() {
        this.dom.menu = document.getElementById('menu');
        this.dom.menuLinks = this.dom.menu.querySelectorAll('a');
        this.dom.viewWrapper = document.querySelector('.view-wrapper');
        this.dom.viewSections = this.dom.viewWrapper.querySelectorAll('.view-section');
    }

    bindEvents() {
        window.addEventListener('hashchange', (e) => this.updateView(e));
        this.dom.menuLinks.forEach(link => link.addEventListener('click', (e) => this.updateView(e, true)));
    }

    renderComponent(component) {
        const viewSection = this.dom.viewWrapper.querySelector(`[data-component="${component}"]`);
        const container = viewSection.firstElementChild;
        const element = this.components[component] && elementFromTemplate(this.components[component].template);

        if (!element) return;

        container.appendChild(element);
        this.initComponent(component);
        this.components[component].hasRendered = true;
    }

    initComponent(component) {
        const _component = this.components[component];

        if (_component && _component.init) {
            _component.instances = component.instances || [];
            _component.instances.push(new _component.init());
        };
    }

    updateView(e, isClickEvent) {
        if (isClickEvent) e.preventDefault();
        if (this.activeView) this.activeView.classList.remove('view-active');

        const view = isClickEvent ? e.currentTarget.getAttribute('href') : window.location.hash;
        const componentView = view && document.querySelector(view);
        if (!componentView) return;

        const component = componentView.dataset.component
        if (this.components[component] && !this.components[component].hasRendered) this.renderComponent(component);

        componentView.classList.add('view-active');
        this.activeView = componentView;

        if (isClickEvent) window.history.pushState({}, '', view);
    }
}

window.componentsIndex = new ComponentsIndex();
console.log(window.componentsIndex);
