import hljs from 'highlight.js';

import { elementFromTemplate } from '../../../utils/dom';
import components from '../export-components';
import '../../../components/hero/hero.scss';

class HeroView {
    constructor(hash) {
        this.component = components[hash.replace('#view-', '')];
        this.dom = { viewEl: document.querySelector(hash) };
        this.instances = [];
        this.storiesHTML = [];

        this.fetchCode();
        this.setDomElements();
        // this.render();
    }

    fetchCode() {
        const headers = { 'Content-Type': 'text/plain' };
        fetch('/src/components/hero/hero.html', { headers })
            .then(data => data.text())
            .then(data => {
                console.log('data: ', data);
                const stories = data.split('<!--');
                stories.forEach((story, i) => {
                    if (!i) return;
                    const _story = `<!-- ${story}`;
                    this.storiesHTML.push(_story);
                });
                this.render();
            })
            // .then(() => console.log(this.storiesHTML))
            .catch(err => console.log(err));
    }

    setDomElements() {
        this.dom.templateEl = elementFromTemplate(this.component.template);
        console.log('this.dom.templateEl: ', this.dom.templateEl);
        this.dom.components = this.dom.templateEl.querySelectorAll(`.${this.component.className}`);
    }

    render() {
        const wrap = document.createElement('div');
        this.dom.components.forEach((component, i) => {
            const story = document.createElement('div');
            story.className = 'view-section__component-story';

            const title = document.createElement('h3');
            title.innerText = this.component.stories[i];
            
            const pre = document.createElement('pre');
            pre.innerText = this.storiesHTML[i];
            
            const code = document.createElement('code');
            code.className = 'html';
            code.append(pre);
            // console.log('code: ', code);
            
            story.append(title, component, code);
            wrap.append(story);

            hljs.highlightBlock(story.querySelector('code'));
        });
        this.dom.viewEl.children[0].append(wrap);
    }
}

export default HeroView;
