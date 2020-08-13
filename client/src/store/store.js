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
          console.log(state.enrollments)
        }
    },
    actions: {
        loadStudies({commit}) {
            axios.get(URL + '/studies').then((response) => {
                commit('updateStudies', response.data)
            })
        },
        loadEnrollments({commit}) {
            let config = {
                headers: {'Authorization': `OAuth ${localStorage.getItem('authToken')}`}
            }

            axios.get(URL + '/enrollments', config).then((response) => {
                commit('updateEnrollments', response.data.map(ent => ent.study))
            })
        },
        addEnrollment({dispatch}, study_id) {
            let config = {
                headers: {'Authorization': `OAuth ${localStorage.getItem('authToken')}`}
            }
            const payload = {study_id: study_id}
            axios.post(URL + '/enrollments', payload, config).then((response) => {
                dispatch('loadEnrollments')
            })
        },
        deleteEnrollment({dispatch}, study_id) {
            let config = {
                headers: {'Authorization': `OAuth ${localStorage.getItem('authToken')}`}
            }

            axios.delete(URL + `/enrollments?study_id=${study_id}`, config).then((response) => {
                dispatch('loadEnrollments')
            })
        }

    },
});
