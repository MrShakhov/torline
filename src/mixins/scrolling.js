// Scrollable element required to set ref="listOfItems"

export default {
    methods: {
        scrollTo(coordinate) {

            // Save initial data
            const startTime = performance.now();
            const startPosition = this.$refs.listOfItems.scrollLeft;

            const distance = coordinate - startPosition;
            const duration = 300;

            // Planning to scroll to the next animation frame
            requestAnimationFrame( function animate(time) {

                // Calculate the completeness of the animation
                let timeFraction = (time - startTime) / duration;
                if (timeFraction > 1) timeFraction = 1;

                // Scrolling
                this.$refs.listOfItems.scrollLeft = startPosition + (distance * timeFraction);

                // Checking the completeness of the animation and repeating if needed
                if (timeFraction < 1) requestAnimationFrame(animate.bind(this));

            }.bind(this) );
        }
    }
};