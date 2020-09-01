import { elementFromTemplate } from '../../../utils/dom';
import components from '../export-components';

class ViewBase {
    constructor(hash) {
        this.component = components[hash.replace('#view-', '')];
        
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
            });
    }

    setDomElements() {
        this.dom.components = this.dom.templateEl.querySelectorAll(`.${this.component.className}`);
        console.log('this.dom.components: ', this.dom.components);
    }

    render() {
        if (this.dom.components.length === 0) {
            return this.dom.viewEl.children[0].append(this.dom.templateEl);
        }
        
        const wrap = document.createElement('div');
        this.dom.components.forEach((component, i) => {
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

        this.dom.components = wrap.querySelectorAll(`.${this.component.className}`);
    }

    initComponents() {
        this.dom.components.forEach(component => {
            if (this.component.init) {
                this.instances.push(new this.component.init(component))
            }
        });
    }
}

export default ViewBase;
