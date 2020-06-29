class GraphRing {
    constructor( options ) {
        // element wrapping the ring and all its layers
        this.$wrapper = document.querySelector( options.wrapperSelector );
        if ( !this.$wrapper ) {
            console.warn( `The provided query selector "${options.wrapperSelector}" did not match any element on the document. Aborting GraphRing function.` );
            return false;
        }

        // the first circle in wrapper; used as basis for radius and circumference
        this.$baseRing = this.$wrapper.querySelector( 'circle' );
        if ( !this.$baseRing ) {
            console.warn( `No circle elements were found in wrapper element. Aborting GraphRing function.` );
            return false;
        }
        // array of all rings representing data
        this.$dataRings = [...this.$wrapper.querySelectorAll( options.dataRingSelector )];
        if ( !this.$dataRings.length ) {
            console.warn( `No circle elements were found in wrapper element. Aborting GraphRing function.` );
            return false;
        }
        // wrapper element for data statistics display
        this.$stats = document.querySelector( options.statsWrapSelector );

        // radius & circumference of the ring
        this.radius = this.$baseRing.r.baseVal.value;
        this.circumference = this.radius * 2 * Math.PI;
        // initial rotation angle
        this.degOffset = 0;
        // names or description of data types
        this.dataNames = options.dataNames;

        // bind methods' context to this instance object
        this.calculateArc = this.calculateArc.bind( this );
        this.addStat = this.addStat.bind( this );

        // render rings according to their data
        this.$dataRings.forEach( ($dataRing, index) => {
            this.calculateArc( $dataRing );
            this.addStat( $dataRing, index );
        });
    }

    /* 
     * Calculates and creates arc according to data for a given ring 
     */
    calculateArc( $dataRing ) {
        // the circle for the current data being calculated
        const arc = $dataRing.querySelector( 'circle' );
        // retrieve percent data from 'data-percent' attribute
        const percent = +$dataRing.dataset.percent;

        // render arc
        arc.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        arc.style.strokeDashoffset = this.circumference - (percent/100 * this.circumference);
        
        // rotate from center to begin wnere previous arc ends
        arc.style.transform = `rotate(${-90 + this.degOffset}deg)`;
        // increment angle tracker by current arc length
        this.degOffset += (percent/100) * 360;
    }

    /* 
     * Adds data description for a given ring
     */
    addStat( $dataRing, index ) {
        // get percent data from 'data-percent' attribute
        const percent = +$dataRing.dataset.percent;
        // create element that will display current data
        const $stat = document.createElement( 'p' );

        // add content to element according to current percent
        $stat.innerText = `${this.dataNames[index] || 'Data ' + (index+1)}: ${percent}%`;

        // render the created element
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
