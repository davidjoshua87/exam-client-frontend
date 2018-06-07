<template>
<div class="home">
  <div class="row head">
    <div class="col-lg-3"></div>
    <div class="userBody col-lg-6">
      <h3>Get Access Token</h3>
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="">Email</span>
            </div>
            <input type="text" class="form-control" v-model="email">
          </div>
          <div class="input-group mt-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="">Name</span>
            </div>
            <input type="text" class="form-control" v-model="name">
          </div>
          <button class="btn btn-success mt-2" @click="requestToken">Submit</button>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
    <div class="col-lg-3"></div>
  </div>
  <div v-if="login == true && token !== ''" class="row mt-3">
    <div class="col-lg-3"></div>
    <div class="uploadImage col-lg-6">
      <h3>Upload Image</h3>
      <div class="row mt-3">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <input class="btn btn-primary" type="file" @change="onHandlerFile" ref="file" accept="image/*">
          <button class="btn btn-danger m-2" @click="uploadImage">Upload Image</button>
          <button class="btn btn-info m-2" @click="getAllPhotos">Get Image</button>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
    <div class="col-lg-3"></div>
  </div>
  <div v-if="login == true && token !== '' && getFoto == true" class="row mt-5">
    <div class="col-2"></div>
    <div class="col-8">
      <h3>List Uploaded Images</h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Image</th>
            <th scope="col">Sender By</th>
            <th scope="col">Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(image, index) in images" :key="index">
            <td scope="row">{{ index + 1 }}</td>
            <td><img :src="image.url"></td>
            <td>{{ image.user.name }}</td>
            <td>{{ stringDate(image.createdAt)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-2"></div>
  </div>
  <footer>
    <p>© 2018. Exam Phase-2</p>
  </footer>
</div>
</template>

<script>
// @ is an alias to /src
import {
  mapState
} from 'vuex'

import moment from 'moment'

export default {
  name: 'home',
  data() {
    return {
      email: '',
      name: '',
      file: '',
      login: false,
      getFoto: false
    }
  },
  computed: {
    ...mapState([
      'token',
      'images'
    ])
  },
  methods: {
    requestToken() {
      let userData = {
        email: this.email,
        name: this.name
      }
      this.login = true
      this.$store.dispatch('getToken', userData)
    },
    onHandlerFile() {
      this.file = this.$refs.file.files[0]
    },
    uploadImage() {
      let formData = new FormData()
      formData.append('file', this.file)
      this.$store.dispatch('uploadImage', formData)
    },
    getAllPhotos() {
      this.getFoto = true
      this.$store.dispatch('getAllImage')
    },
    stringDate: function (date) {
      return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  }
}
</script>

<style scoped>
h3 {
  color: white;
}

.btn-success {
  color: white;
  font-weight: bold;
}

.btn-primary {
  color: white;
  font-weight: bold;
}

.btn-danger {
  color: white;
  font-weight: bold;
}

.btn-info {
  color: white;
  font-weight: bold;
}

.input-group-text {
  background-color: black;
  color: #fbf6b2;
  font-weight: bold;

}

img {
  height: 10rem;
  width: auto;
}

table {
  color: white;
  background-color: #010673;
  border-radius: 15px;
  width: 150%;
}

p {
  color: white;
}
.userBody {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  padding: 1%;
  border: 1px solid #2c02f6;
  background-color: #010673;
  border-radius: 25px;
}

.uploadImage {
  display: flex;
  flex-direction: column;
  margin: 3% 0%;
  padding: 1%;
  border: 1px solid #2c02f6;
  background-color: #010673;
  border-radius: 25px;
}
</style>
