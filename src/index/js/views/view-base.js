import { elementFromTemplate } from '../../../utils/dom';
import components from '../export-components';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';

class ViewBase {
    constructor(hash) {
        this.component = components[hash.replace('#view-', '')];
        this.fetchUrlBase = window.location.origin.match('localhost')
            ? window.location.origin
            : `${window.location.origin}/ui-components`;
        
        this.dom = {
            viewEl: document.querySelector(hash),
            templateEl: elementFromTemplate(this.component.template),
        };
        this.instances = [];
        
        this.setDomElements();
        import(`../../../components/${this.component.name}/${this.component.name}.scss`)
            .then(() => {
                this.render();
                this.initComponents();
            })
            .catch((err) => console.log('error: ', err));

        hljs.registerLanguage('xml', xml);
        hljs.configure({ useBR: true });
    }

    setDomElements() {
        if (this.dom.templateEl.childElementCount === 1) {
            this.dom.components = [this.dom.templateEl];
        } else {
            this.dom.components = this.dom.templateEl.querySelectorAll(`.${this.component.className}`);
        }
        // console.log('this.dom.templateEl: ', this.dom.templateEl);
        // console.log('this.dom.components: ', this.dom.components);
    }

    render() {
        if (this.component.name === 'modal') return this.renderModal();
        
        if (this.dom.components.length === 1) {
            const wrap = document.createElement('div');
            const story = document.createElement('div');
            story.className = 'view-section__component-story';
            
            const title = document.createElement('h3');
            title.innerText = this.component.stories[0];
            
            story.append(title, this.dom.templateEl);
            wrap.append(story);

            // this.dom.viewEl.children[0].append(this.dom.templateEl);
            this.dom.viewEl.children[0].append(wrap);
            return this.getComponentCode();
        }

        const wrap = document.createElement('div');
        [...this.dom.templateEl.children].forEach((component, i) => {
            const story = document.createElement('div');
            story.className = 'view-section__component-story';

            if (this.component.stories && this.component.stories.length) {
                const title = document.createElement('h3');
                title.innerText = this.component.stories[i];
                story.append(title, component);
            } else {
                story.append(component);
            }

            wrap.append(story);
        });
        
        this.dom.viewEl.children[0].append(wrap);
        this.getComponentCode();

        this.dom.components = wrap.querySelectorAll(`.${this.component.className}`);
    }

    initComponents() {
        if (this.component.init) {
            this.dom.components.forEach(component => {
                this.instances.push(new this.component.init(component))
            });
        }
    }

    renderModal() {
        const wrap = document.createElement('div');
        let customInd = 0;
        [...this.dom.templateEl.children].forEach(element => {
            if (element.tagName === 'BUTTON') {
                const story = document.createElement('div');
                story.className = 'view-section__component-story';
    
                const title = document.createElement('h3');
                title.innerText = this.component.stories[customInd];
                story.append(title, element);

                wrap.append(story);
                customInd++;
            } else {
                document.body.append(element);
            }
        });

        this.dom.viewEl.children[0].append(wrap);
        this.getComponentCode();
    }

    getComponentCode() {
        fetch(`${this.fetchUrlBase}/src/components/${this.component.name}/${this.component.name}.html`)
            .then(data => data.text())
            .then(text => {
                const componentTitle = document.getElementById('component-title').innerText;
                const storiesCode = text.split(`<!-- ${componentTitle}:`).slice(1);
                const storyElements = this.dom.viewEl.querySelectorAll('.view-section__component-story');

                if (this.dom.components.length === 1) {
                    const pre = document.createElement('pre');
                    pre.innerText = `<!--${storiesCode[0]}`;

                    const code = document.createElement('code');
                    code.className = 'html';
                    code.append(pre);

                    this.dom.viewEl.children[0].append(code);
                    return hljs.highlightBlock(code);
                }

                storiesCode.forEach((storyCode, i) => {
                    const pre = document.createElement('pre');
                    pre.innerText = `<!--${storyCode}`;

                    const code = document.createElement('code');
                    code.className = 'html';
                    code.append(pre);

                    storyElements[i].append(code);

                    hljs.highlightBlock(code);
                });
            })
            .catch(err => console.log(err));
    }
}

export default ViewBase;
