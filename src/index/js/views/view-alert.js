import { elementFromTemplate } from '../../../utils/dom';
import components from '../export-components';

import '../../../components/alert/alert.scss';

class AlertView {
    constructor(hash) {
        this.component = components[hash.replace('#view-', '')];
        this.dom = { viewEl: document.querySelector(hash) };
        this.instances = [];

        this.setDomElements();
        this.render();
        this.initComponents();
    }

    setDomElements() {
        this.dom.templateEl = elementFromTemplate(this.component.template);
        this.dom.components = this.dom.templateEl.querySelectorAll(`.${this.component.className}`);
    }

    render() {
        const wrap = document.createElement('div');
        this.dom.components.forEach((component, i) => {
            const story = document.createElement('div');
            story.className = 'view-section__component-story';

            const title = document.createElement('h3');
            title.innerText = this.component.stories[i];

            story.append(title, component);
            wrap.append(story);
        });

        this.dom.viewEl.children[0].append(wrap);
    }

    initComponents() {
        this.dom.components.forEach(component => this.instances.push(new this.component.init(component)));
    }
}

export default AlertView;
