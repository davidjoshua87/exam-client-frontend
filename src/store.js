import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    images: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setImages (state, imageData) {
      state.images = imageData
    }
  },
  actions: {
    getToken ({
      commit
    }, userData) {
      let email = userData.email
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (userData.email === '') {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'email is required!'
        })
      } else if (!re.test(String(email).toLowerCase())) {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Please input a valid email address!'
        })
      } else if (userData.name === '') {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'name is required'
        })
      } else {
        axios.post('http://35.197.135.159/request-token', {
          email: userData.email,
          name: userData.name
        })
          .then(function (response) {
            localStorage.setItem('token', response.data.uuid)
            swal(
              'Good job!',
              'You already get the token right now!',
              'success'
            )
            commit('setToken', response.data.uuid)
          })
          .catch(function (err) {
            swal({
              type: 'error',
              title: 'Oops...',
              text: err
            })
          })
      }
    },
    uploadImage ({
      state,
      dispatch
    }, formData) {
      let token = state.token
      if (token === '') {
        alert('authorization token is required')
      } else {
        axios.post('http://35.197.135.159/image', formData, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
          .then(function (response) {
            swal(
              'Good job!',
              'success upload photo',
              'success'
            )
            dispatch('getAllImage')
          })
          .catch(function (err) {
            swal({
              type: 'error',
              title: 'Oops...',
              text: err
            })
          })
      }
    },
    getAllImage ({
      commit,
      state
    }) {
      let token = state.token
      if (token === '') {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'authorization token is required!'
        })
      } else {
        axios.get('http://35.197.135.159/image', {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
          .then(function (imageData) {
            swal(
              'Good job!',
              'success get photo',
              'success'
            )
            commit('setImages', imageData.data)
          })
          .catch(function (err) {
            swal({
              type: 'error',
              title: 'Oops...',
              text: err
            })
          })
      }
    }
  }
})
