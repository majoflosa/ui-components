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
        this.setCodeMap();
        this.render();
        this.bindEvents();
    }

    setDomElements() {
        this.dom.templateEl = elementFromTemplate(this.component.template);
        this.dom.components = this.dom.templateEl.querySelectorAll(`.${this.component.className}`);
    }

    setCodeMap() {
        this.dom.components.forEach(component => {
            let stringHTML = component.outerHTML
                .replace(/<svg\b.*<\/svg>/, '<svg>/* icon of your choice here */</svg>')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            this.codeMap.push({ html: stringHTML });
        });
    }

    render() {
        const wrap = document.createElement('div');
        this.dom.components.forEach((component, i) => {
            const story = document.createElement('div');
            story.className = 'view-section__component-story';
            
            const storyCode = `<code class="html">${this.codeMap[i].html}</code>`;
            story.innerHTML = `${component.outerHTML}${storyCode}`;

            wrap.append(story);
        });
        
        this.dom.viewEl.children[0].append(wrap);

        this.dom.components = wrap.querySelectorAll(`.${this.component.className}`);
    }

    bindEvents() {

    }
}

export default ButtonView;
