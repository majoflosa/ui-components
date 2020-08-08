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
        this.instances = [];
        this.activeView = null;

        this.onClickMenuLink = this.onClickMenuLink.bind(this);

        this.setDomElements();
        this.renderComponents();
        this.bindEvents();
    }

    setDomElements() {
        this.dom.menu = document.getElementById('menu');
        this.dom.menuLinks = this.dom.menu.querySelectorAll('a');
        this.dom.viewWrapper = document.querySelector('.view-wrapper');
        this.dom.viewSections = this.dom.viewWrapper.querySelectorAll('.view-section');
    }

    bindEvents() {
        this.dom.menuLinks.forEach(link => link.addEventListener('click', this.onClickMenuLink));
    }

    renderComponents() {
        this.dom.viewSections.forEach(section => {
            const component = section.dataset.component;
            const container = section.firstElementChild;
            const element = this.components[component] && elementFromTemplate(this.components[component].template);
            
            if (element) {
                container.appendChild(element);
                this.initComponent(component);
            };
        });
    }

    initComponent(component) {
        if (this.components[component] && this.components[component].init) {
            this.instances.push(new this.components[component].init());
        };
    }

    onClickMenuLink(e) {
        e.preventDefault();

        if (this.activeView) this.activeView.classList.remove('view-active');

        const view = e.currentTarget.getAttribute('href');
        const componentView = document.querySelector(view);
        if (componentView) {
            componentView.classList.add('view-active');
            this.activeView = componentView;
        };
    }
}

window.componentsIndex = new ComponentsIndex();
console.log(window.componentsIndex);
