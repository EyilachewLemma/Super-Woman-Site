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
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        }
    },
    mutations: {
        setFields(state, fields) {
            state.fields = fields
        },
        setEducationLebles(state, educationLebles) {
            state.educationLebles = educationLebles
        },
        setRoleModels(state, roleModels) {
            state.roleModels = roleModels
        },
        setBlogs(state, bolgs) {
            state.blogs = bolgs
        }
    },
    actions: {
        async fetchFields({ commit }) {
            commit('setIsLoading', true)
            try {
                var response = await apiClient.get('api/fields')
                if (response.status === 200) {
                    commit('setFields', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchEducationLebles({ commit }) {
            commit('setIsLoading', true)
            try {
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
        async fetchRoleModels({ commit }) {
            commit('setIsLoading', true)
            try {
                var response = await apiClient.get('api/role_models')
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
            commit('setIsLoading', true)
            try {
                var response = await apiClient.get('api/blogs')
                if (response.status === 200) {
                    commit('setBlogs', response.data)
                    console.log('blogs =', response.data)
                }
            } catch (err) {
                throw 'error'
            } finally {
                commit('setIsLoading', false)
            }
        }
    }

})