import introTemplate from '../../components/intro/intro.html';

import alertTemplate from '../../components/alert/alert.html';
import Alert from '../../components/alert/alert';

import buttonTemplate from '../../components/button/button.html';

import heroTemplate from '../../components/hero/hero.html';

import gridTemplate from '../../components/grid/grid.html';

import formsTemplate from '../../components/forms/forms.html';

import navbarTemplate from '../../components/navbar/navbar.html';
import Navbar from '../../components/navbar/navbar';

import accordionTemplate from '../../components/accordion/accordion.html';
import Accordion from '../../components/accordion/accordion';

import tabsTemplate from '../../components/tabs/tabs.html';
import Tabs from '../../components/tabs/tabs';

import modalTemplate from '../../components/modal/modal.html';
import Modal from '../../components/modal/modal';

import tooltipTemplate from '../../components/tooltip/tooltip.html';
import Tooltip from '../../components/tooltip/tooltip';

import loadingScreenTemplate from '../../components/loading-screen/loading-screen.html';
import LoadingScreen from '../../components/loading-screen/loading-screen';

export default {
    intro: { name: 'intro', template: introTemplate, className: 'mf-intro', view: '#view-intro' },
    alert: {
        name: 'alert',
        template: alertTemplate,
        className: 'mf-alert',
        view: '#view-alert',
        stories: [ 'Default', 'Primary color', 'Secondary color', 'Danger color', 'Alert with header and message', 'Dismissable', 'Dismissable with content' ],
        init: Alert,
    },
    button: {
        name: 'button',
        template: buttonTemplate,
        className: 'mf-btn',
        view: '#view-button',
    },
    hero: {
        name: 'hero',
        template: heroTemplate,
        className: 'mf-hero',
        view: '#view-hero',
        stories: [ 'Default, centered content', 'Left-aligned content', 'Right-aligned content' ],
    },
    grid: {
        name: 'grid',
        template: gridTemplate,
        className: 'mf-grid',
        view: '#view-grid',
        stories: [ 'Default', 'With Gutters', 'Reverse' ],
    },
    forms: {
        name: 'forms',
        template: formsTemplate,
        className: 'mf-forms',
        view: '#view-forms',
        stories: [ 'Text Inputs', 'Text Inputs with Labels', 'Text Inputs with Labels, Inline', 'Text Inputs, required', 'Text Inputs, with error', 'Text Inputs, disabled', 'Select, native dropdown', 'Checkbox', 'Checkbox with label', 'Checkbox, as toggler switch', 'Radio', 'Radio, with label', 'Radio, as button group' ],
    },
    navbar: {
        name: 'navbar',
        template: navbarTemplate,
        className: 'mf-navbar',
        view: '#view-navbar',
        stories: [ 'Basic Nav Bar', 'Nav Bar with Search', 'Nav Bar with Toggle-able Search'],
        init: Navbar
    },
    accordion: {
        name: 'accordion',
        template: accordionTemplate,
        className: 'mf-accordion',
        view: '#view-accordion',
        stories: [ 'Single', 'Multiple, open single', 'Multiple, open multiple', 'Nested accordion' ],
        init: Accordion,
    },
    tabs: {
        name: 'tabs',
        template: tabsTemplate,
        className: 'mf-tabs',
        view: '#view-tabs',
        stories: [ 'Basic', 'Vertical, left tabs', 'Vertical, right tabs' ],
        init: Tabs,
    },
    modal: {
        name: 'modal',
        template: modalTemplate,
        className: 'mf-modal',
        view: '#view-modal',
        stories: [ 'Basic', 'Full-screen' ],
        init: Modal,
    },
    tooltip: {
        name: 'tooltip',
        template: tooltipTemplate,
        className: 'mf-tooltip',
        view: '#view-tooltip',
        stories: [ 'Top', 'Bottom', 'Left', 'Right', 'Click' ],
        init: Tooltip,
    },
    'loading-screen': {
        name: 'loading-screen',
        template: loadingScreenTemplate,
        className: 'mf-loading-screen',
        view: '#view-loading-screen',
        stories: [ 'Basic', 'With minimum display time' ],
        init: LoadingScreen
    },
};
