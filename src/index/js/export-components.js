import introTemplate from '../../components/intro/intro.html';
import buttonTemplate from '../../components/button/button.html';
import heroTemplate from '../../components/hero/hero.html';
import navbarTemplate from '../../components/navbar/navbar.html';
import Navbar from '../../components/navbar/navbar';

export default {
    intro: { name: 'intro', template: introTemplate, className: 'mf-intro', view: '#view-intro' },
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
};
