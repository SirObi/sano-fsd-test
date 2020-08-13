import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

const URL = 'http://localhost:5000'

export default new Vuex.Store({
    state: {
        menu_hidden: true,
        mobile_menu_hidden: true,
        studies: [],
        enrollments: []
    },
    getters: {
        menu_hidden: (state) => state.menu_hidden,
        studies: (state) => state.studies,
        enrollments: (state) => state.enrollments
    },
    mutations: {
        updateStudies(state, studies) {
            state.studies = studies
        },
        updateEnrollments(state, enrollments) {
            state.enrollments = enrollments
        }
    },
    actions: {
        loadStudies({commit}) {
            axios.get(URL + '/studies').then((response) => {
                commit('updateStudies', response.data)
            })
        },
        loadEnrollments({commit}) {
            axios.post(URL + '/enrollments').then((response) => {
                commit('updateEnrollments', response.data)
            })
        },
        addEnrollment({dispatch}, user_id, study_id) {
            payload = {user_id: user_id, study_id: study_id}
            axios.post(URL + '/enrollments', payload).then((response) => {
                dispatch('loadEnrollments')
            })
        },
        deleteEnrollment({dispatch}, user_id, study_id) {
            data = {user_id: user_id, study_id: study_id}
            axios.delete(URL + 'enrollments', {data: data}).then((response) => {
                dispatch('loadEnrollments')
            })
        }

    },
});
