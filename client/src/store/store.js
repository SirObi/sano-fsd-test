import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

const URL = 'http://localhost:5000/studies'

export default new Vuex.Store({
    state: {
        menu_hidden: true,
        mobile_menu_hidden: true,
        studies: []
    },
    getters: {
        menu_hidden: (state) => state.menu_hidden,
        studies: (state) => state.studies
    },
    mutations: {
        updateStudies(state, studies) {
            state.studies = studies
        },
    },
    actions: {
        loadStudies({commit}) {
            axios.get(URL).then((response) => {
                console.log(response.data, this)
                commit('updateStudies', response.data)
            })
        }
    },
});
