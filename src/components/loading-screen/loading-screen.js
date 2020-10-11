class LoadingScreen {
    constructor(el) {
        this.dom = { el };

        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);

        this.setProperties();
        this.bindEvents();
    }

    setProperties() {
        this.minTime = this.dom.el.dataset.minTime || 0;
    }

    bindEvents() {
        window.addEventListener('load', this.hideLoadingScreen);
    }

    hideLoadingScreen() {
        if (this.minTime > 0) {
            setTimeout(() => this.dom.el.classList.add('loaded'), this.minTime);
            
            const { transitionDuration, transitionDelay } = window.getComputedStyle(this.dom.el);
            
            let duration = parseInt(transitionDuration.split(',')[0]);
            duration += parseInt(transitionDelay.split(',')[0]);

            setTimeout(() => this.dom.el.style.display = 'none', (duration * 1000) + this.minTime + 100);
            return;
        }
        
        this.dom.el.classList.add('loaded');
        const { transitionDuration, transitionDelay } = window.getComputedStyle(this.dom.el);
        const duration = parseInt(transitionDuration.split(',')[0]) + parseInt(transitionDelay.split(',')[0]) + 0.1;

        setTimeout(() => this.dom.el.style.display = 'none', duration * 1000);

    }
}

export default LoadingScreen;
