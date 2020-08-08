import template from './button.html';
import './button.scss';

class ButtonComponent {
    constructor() {
        console.log('button initiated');
    }
}

export default {
    template,
    init: ButtonComponent,
};
