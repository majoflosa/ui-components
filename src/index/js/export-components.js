import introTemplate from '../../components/intro/intro.html';
import buttonTemplate from '../../components/button/button.html';
import heroTemplate from '../../components/hero/hero.html';
import navbarTemplate from '../../components/navbar/navbar.html';

export default {
    intro: { name: 'intro', template: introTemplate, className: 'mf-intro', view: '#view-intor' },
    button: { name: 'button', template: buttonTemplate, className: 'mf-btn', view: '#view-button' },
    hero: { name: 'hero', template: heroTemplate, className: 'mf-hero', view: '#view-hero' },
    navbar: { name: 'navbar', template: navbarTemplate, className: 'mf-navbar', view: '#view-navbar' },
};
