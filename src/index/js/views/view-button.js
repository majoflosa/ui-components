import { elementFromTemplate } from '../../../utils/dom';
import components from '../export-components';

import '../../../components/button/button.scss';

class ButtonView {
    constructor(hash) {
        this.component = components[hash.replace('#view-', '')];
        this.dom = { viewEl: document.querySelector(hash) };
        this.instances = [];
        this.codeMap = [];
        
        this.setDomElements();
        this.render();
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
            story.append(component);
            wrap.append(story);
        });
        
        this.dom.viewEl.children[0].append(wrap);

        this.dom.components = wrap.querySelectorAll(`.${this.component.className}`);
    }
}

export default ButtonView;
