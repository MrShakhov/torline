export default {
    data() {
        return {
            loadedSourcesCount: 0,
            isLoaded: false
        }
    },

    methods: {
        checkLoading() {
            this.loadedSourcesCount++;

            const nameInKebabCase = this.$options.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            if ( this.loadedSourcesCount === this.$el.querySelectorAll(`.loadable-${nameInKebabCase}`).length ) {
                this.isLoaded = true;
                this.$emit('load');
            }
        }
    }
}