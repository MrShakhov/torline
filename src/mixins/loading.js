export default {
    data() {
        return {
            loadedSourcesCount: 0,
            isLoaded: false
        }
    },

    methods: {
        checkLoading(event, ...callbacks) {
            this.loadedSourcesCount++;

            const nameInKebabCase = this.$options.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            if ( this.loadedSourcesCount >= this.$el.querySelectorAll(`.loadable-${nameInKebabCase}`).length ) {

                if (this.isLoaded === false) {
                    this.isLoaded = true;
                    this.$emit('init-complete');
                }

                this.$emit('load');

                callbacks.forEach( callback => callback() );
            }
        }
    }
};