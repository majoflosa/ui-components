import introTemplate from '../../components/intro/intro.html';
import alertTemplate from '../../components/alert/alert.html';
import Alert from '../../components/alert/alert';
import buttonTemplate from '../../components/button/button.html';
import heroTemplate from '../../components/hero/hero.html';
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
};
