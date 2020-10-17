class LoadingScreen {
    constructor(el) {
        // this.dom will hold references to handy DOM elements related to this component;
        // constructor receives main component element as 'el'
        this.dom = { el };

        // bind event handlers' context for all elements to the current instance
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);

        // invoke initiation functions
        this.setProperties();
        this.bindEvents();

        // if window is already loaded when component is initiated,
        // invoke hideLoadingScreen immediately
        if (document.readyState === 'complete') this.hideLoadingScreen();
    }

    // sets useful properties about this instance
    setProperties() {
        this.minTime = this.dom.el.dataset.minTime || 0;
    }

    // bind component's elements to their respective DOM elements
    bindEvents() {
        window.addEventListener('load', this.hideLoadingScreen);
    }

    // adds 'loaded' class to loading screen to hide it
    hideLoadingScreen() {
        if (this.minTime > 0) {
            // if a min time was provided, wait for the time period to add 'loaded' class,
            // which starts fade out animation
            setTimeout(() => this.dom.el.classList.add('loaded'), this.minTime);
            
            // calculate fade out animation duration
            const { transitionDuration, transitionDelay } = window.getComputedStyle(this.dom.el);
            let duration = parseInt(transitionDuration.split(',')[0]);
            duration += parseInt(transitionDelay.split(',')[0]);

            // when both animation and min time are over, apply 'display: none' to loading screen
            setTimeout(() => this.dom.el.style.display = 'none', (duration * 1000) + this.minTime + 100);
            return;
        }
        
        // start fade out animation
        this.dom.el.classList.add('loaded');

        // calculate animation duration
        const { transitionDuration, transitionDelay } = window.getComputedStyle(this.dom.el);
        const duration = parseInt(transitionDuration.split(',')[0]) + parseInt(transitionDelay.split(',')[0]) + 0.1;

        // when animation is over, apply 'display: none' to loading screen
        setTimeout(() => this.dom.el.style.display = 'none', duration * 1000);
    }
}

export default LoadingScreen;
