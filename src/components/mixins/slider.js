import scrolling from './scrolling';

export default {
    mixins: [ scrolling ],

    methods: {
        next() {

            // Getting the initial data
            const wrapperCoordinates = this.$refs.listOfItems.getBoundingClientRect();
            const wrapperScrollLeft = this.$refs.listOfItems.scrollLeft;

            // Finding the last item coordinate
            const targetItem = document.elementFromPoint(wrapperCoordinates.right - 1, wrapperCoordinates.top + 1).closest('li');
            const targetCoordinate = targetItem.getBoundingClientRect().left - wrapperCoordinates.left + wrapperScrollLeft;

            // Scroll to the last item
            this.scrollTo(targetCoordinate);

        },
        back() {

            // Finding of target coordinate
            const itemWidth = this.$refs.listOfItems.firstElementChild.offsetWidth;
            let targetCoordinate = this.$refs.listOfItems.scrollLeft - (itemWidth * this.getCapacity());
            if (targetCoordinate < 0) targetCoordinate = 0; // Correcting if needed

            // Scroll
            this.scrollTo(targetCoordinate);

        }
    }
};