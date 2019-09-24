
<template>
<div class="">
  <button @click="openCamera()" class="btn btn-submit">Subir publicaciòn</button>
  <div class="publication-new" v-if="publicate">
    <div class="camera-modal">
      <video ref="video" class="camera-stream"/>
      <div class="camera-modal-container">
         <span @click="capture" class="take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">camera</i>
          </span>
      </div>
    </div>
  </div>
</div>
 
  
  </template>

<script>
require('material-design-lite')
import firebase from 'firebase';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Fotos from './Fotos.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Fotos
  },
  
  data () {
      return {
        mediaStream: null,
        publicate:false
      }
    },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    openCamera(){
      this.publicate = true;
      navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      }).catch(error => {
        console.error('getUserMedia() error:', error);
      });
    },
    capture () {
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
        const imageCapture = new window.ImageCapture(mediaStreamTrack);
  
        return imageCapture.takePhoto().then(blob => {
          console.log('file ====', blob)
          firebase.storage().ref().child(`images/picture-${new Date().getTime()}`).put(blob).then(snapshop => {
            console.log('snapshop file ====', snapshop);
            firebase.storage().ref().child(snapshop.ref.location.path).getDownloadURL().then(url => {
              console.log('url ====', url);
              //Insertamos en una tabla el id del usuario, la foto y  descripción.
  
            }).catch(error => {
              console.error('error get url file', error)
              switch (error.code) {
                case 'storage/object_not_found':
                  // File doesn't exist
                  break;
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
          });
        })
      }
    },
    /*mounted () {
      alert(1)
      this.publicate = true;
      navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      }).catch(error => {
        console.error('getUserMedia() error:', error);
      });
    }*/
    destroyed () {
      const tracks = this.mediaStream.getTracks();
      tracks.map(track => track.stop());
    }
  }

</script>
<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
     .camera-modal {
          width: 100%;
          height: 100%;
          margin: 20px auto;
          z-index: 1000;
          padding: 15px;
      }
      .publication-new{
        width: 35%;
        height: 35%;
        margin: 0px auto;
        background: #ddd;
        border-radius:5px;
      }
      .camera-stream {
          width: 100%;
          max-height: 100%;
      }
      .camera-modal-container{
        position: absolute;
      }
      .camera-modal-container span{
        position: relative;
        top:-40px;
        left: 200px;
        
      }
  .flex-row{
    display: flex;

    
  }
  .home{
    position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   text-align: center;
  }
  .flex-row a{
    border-radius: 0px;
    font-weight: bold;
  }


</style>
