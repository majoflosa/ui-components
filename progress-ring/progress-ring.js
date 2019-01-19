class ProgressRing {
    constructor( options ) {
        this.$ring = document.querySelector( options.ringSelector );
        this.$number = document.querySelector( options.numberSelector );

        this.percent = options.percent;
        this.animationDuration = options.animationDuration;
        this.countedPercentage = 0;
        this.circumference;

        this.animate = this.animate.bind( this );
        this.countPercentage = this.countPercentage.bind( this );
        this.calculateCircle = this.calculateCircle.bind( this );

        this.animate();
    }

    animate() {
        let interval = setInterval( () => this.countPercentage(), 10 );
        this.calculateCircle();

        setTimeout( () => {
            clearInterval( interval );
            this.$number.innerText = this.percent + '%';
        }, this.animationDuration);

        TweenMax.fromTo(
            this.$ring,
            this.animationDuration/1000,
            { strokeDasharray: 0, strokeDashoffset: 0 },
            { 
                strokeDasharray: `${this.circumference} ${this.circumference}`, 
                strokeDashoffset: this.circumference - this.percent / 100 * this.circumference
            }
        );
    }

    calculateCircle() {
        const radius = this.$ring.r.baseVal.value;
        this.circumference = radius * 2 * Math.PI;

        this.$ring.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    }

    countPercentage() {
        this.countedPercentage += this.percent/(this.animationDuration/10);
        this.$number.innerText = this.countedPercentage.toFixed() + '%';
    }
}

window.addEventListener( 'load', () => {
    const progressRing1 = new ProgressRing({
        ringSelector: '.progress-ring-path-1',
        numberSelector: '.number-1',
        percent: 38,
        animationDuration: 1800
    });
    const progressRing2 = new ProgressRing({
        ringSelector: '.progress-ring-path-2',
        numberSelector: '.number-2',
        percent: 85,
        animationDuration: 1800
    });
    const progressRing3 = new ProgressRing({
        ringSelector: '.progress-ring-path-3',
        numberSelector: '.number-3',
        percent: 27,
        animationDuration: 1800
    });
});
