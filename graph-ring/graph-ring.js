class GraphRing {
    constructor( options ) {
        this.$wrapper = document.querySelector( options.wrapperSelector );
        this.$baseRing = this.$wrapper.querySelector( 'circle' );
        this.$dataRings = [...document.querySelectorAll( options.dataRingSelector )];
        this.$stats = document.querySelector( options.statsWrapSelector );

        this.radius = this.$baseRing.r.baseVal.value;
        this.circumference = this.radius * 2 * Math.PI;
        this.degOffsets = 0;
        this.dataNames = options.dataNames;

        this.calculateArc = this.calculateArc.bind( this );
        this.addStat = this.addStat.bind( this );

        this.$dataRings.forEach( ($dataRing, index) => {
            this.calculateArc( $dataRing );
            this.addStat( $dataRing, index );
        });
    }

    calculateArc( $dataRing, index ) {
        const arc = $dataRing.querySelector( 'circle' );
        const percent = +$dataRing.dataset.percent;

        arc.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        arc.style.strokeDashoffset = this.circumference - (percent/100 * this.circumference);
        
        arc.style.transform = `rotate(${-90 + this.degOffsets}deg)`;

        this.degOffsets += (percent/100) * 360;
        // console.log( (percent/100) * 360 );
    }

    addStat( $dataRing, index ) {
        const percent = +$dataRing.dataset.percent;
        const $stat = document.createElement( 'p' );

        $stat.innerText = `${this.dataNames[index] || 'Data ' + (index+1)}: ${percent}%`;

        this.$stats.appendChild( $stat );
    }
}

window.addEventListener('load', () => {
    const graphRing = new GraphRing({
        wrapperSelector: '.rings-wrap',
        dataRingSelector: '.data-ring-wrap',
        statsWrapSelector: '.stats',
        dataNames: ['Blue Things', 'Red Things', 'Green Things', 'Yellow Things']
    });
});
