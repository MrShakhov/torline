const state = {
    provider: '',
    id: '',
    url: '',
    isActive: false,
    content: ''
};

const mutations = {
    playTrailer(state, { provider, id }) {
        state.content = 'trailer';
        state.provider = provider;
        state.id = id;
        state.isActive = true;
    },
    turnOff(state) {
        state.isActive = false;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};