import { elementFromTemplate } from '../../../utils/dom';
import components from '../export-components';
import '../../../components/navbar/navbar.scss';

class NavbarView {
    constructor(hash) {
        this.component = components[hash.replace('#view-', '')];
        this.dom = { viewEl: document.querySelector(hash) };
        this.instances = [];

        this.setDomElements();
        this.setViewContent();
    }

    setDomElements() {
        this.dom.templateEl = elementFromTemplate(this.component.template);
    }

    setViewContent() {
        this.dom.viewEl.children[0].append(this.dom.templateEl);
    }
}

export default NavbarView;
