import IntroView from './views/view-intro';
import ButtonView from './views/view-button';
import HeroView from './views/view-hero';
import NavbarView from './views/view-navbar';

export default {
    '#view-intro': { hash: '#view-intro', name: 'intro', title: 'Introduction', init: IntroView },
    '#view-button': { hash: '#view-button', name: 'button', title: 'Buttons', init: ButtonView },
    '#view-hero': {
        hash: '#view-hero',
        name: 'hero',
        title: 'Hero',
        init: HeroView,
    },
    '#view-navbar': { hash: '#view-navbar', name: 'navbar', title: 'Nav Bar', init: NavbarView }
};
