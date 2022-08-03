import { createStore } from 'vuex'
import apiClient from '../url/index'
import auth from './auth'
export default createStore({
    modules: {
        auth
    },
    state: {
        fields: [],
        educationLebles: [],
        roleModels: [],
        blogs: [],
        isLoading: false,
        languages: [],
        lang: 'en',
        myInterests: [],
        myMentor: {},

    },
    getters: {
        fields(state) {
            return state.fields
        },
        educationLebles(state) {
            return state.educationLebles
        },
        roleModels(state) {
            return state.roleModels
        },
        blogs(state) {
            return state.blogs
        },
        isLoading(state) {
            return state.isLoading
        },
        languages(state) {
            return state.languages
        },
        lang(state) {
            return state.lang
        },
        myInterests(state) {
            return state.myInterests
        },
        myMentor(state) {
            return state.myMentor
        }


    },
    mutations: {
        setFields(state, fields) {
            state.fields = fields
        },
        setEducationLebles(state, educationLebles) {
            state.educationLebles = educationLebles
        },
        setRolemodels(state, roleModels) {
            state.roleModels = roleModels
        },
        setBlogs(state, bolgs) {
            state.blogs = bolgs
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setLlanguages(state, languages) {
            state.languages = languages
        },
        setLang(state, lang) {
            state.lang = lang
        },
        setmyInterests(state, interests) {
            state.myInterests = interests
        },
        setMyMentor(state, myMentor) {
            state.myMentor = myMentor
        }

    },
    actions: {
        async fetchFields({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get('api/fields')
                if (response.status === 200) {
                    commit('setFields', response.data)
                    console.log('fields =', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchEducationLebles({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get('user/education_levels')
                if (response.status === 200) {
                    commit('setEducationLebles', response.data)
                    console.log('education lebles=', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchRoleModels({ commit }, queryObject) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(`user/get_role_models?lang=${queryObject.lang}&per_page=${queryObject.perPage}`)
                if (response.status === 200) {
                    commit('setRolemodels', response.data)
                    console.log('role models=', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchBlogs({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(`user/get_blogs?lang=${'en'}`)
                if (response.status === 200) {
                    commit('setBlogs', response.data)
                    console.log('blogs =', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchLanguages({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(`api/languages `)
                if (response.status === 200) {
                    commit('setLlanguages', response.data)
                    console.log('languages =', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchMyInterests({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(`user/my_interests `)
                if (response.status === 200) {
                    commit('setmyInterests', response.data)
                    console.log('my interests =', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchMyMentor({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(`user/my_mentor `)
                if (response.status === 200) {
                    commit('setMyMentor', response.data)
                    console.log('my mentor =', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },

    }

})