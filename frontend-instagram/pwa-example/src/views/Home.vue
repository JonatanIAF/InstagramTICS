
<template>
  <div class="container">
    <button @click="openCamera()" class="button is-link">Crear publicación</button>
    <br />
    <br />
    <div class="publication-new" v-if="publicate">
      <div class="camera-modal">
        <video ref="video" class="camera-stream" />
        <div class="camera-modal-container">
          <span
            @click="capture"
            class="take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
          >
            <i class="material-icons">camera</i>
          </span>
        </div>
        <div class="field">
          <label class="label">
            <br />
          </label>
          <div class="control">
            <textarea v-model="foto_nueva.descripcion" class="textarea" placeholder="Descripción"></textarea>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" @click.prevent="addTodo()" class="button is-link">Subir</button>
          </div>
          <div class="control">
            <button class="button is-text">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="card card-align" v-for="todo in todos" :key="todo.id">
        <div class="card-header">
          <p class="card-header-title">{{user.email}}</p>
        </div>
        <div class="card-content">
          <img class="image" :src="todo.url_image" alt />
          <hr />
          <p>{{todo.descripcion}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("material-design-lite");
import firebase from "firebase";
import { todosCollection } from "../firebase";
export default {
  data() {
    return {
      todos: [],
      mediaStream: null,
      publicate: false,
      user: null,
      foto_nueva: {
        url_image: "",
        uid: localStorage.getItem("uid"),
        descripcion: "",
        fecha: ""
      }
    };
  },
  firestore() {
    return {
      todos: todosCollection.orderBy("fecha", "desc")
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        console.log("user id: " + firebase.auth().currentUser.uid);
        localStorage.setItem("uid", firebase.auth().currentUser.uid);
        console.log("uid local storage" + localStorage.getItem("uid"));
      } else {
        this.user = null;
      }
    });
  },
  mounted() {
    console.log(this.todos);
  },
  methods: {
    addTodo() {
      todosCollection
        .add({
          url_image: this.foto_nueva.url_image,
          uid: this.foto_nueva.uid,
          descripcion: this.foto_nueva.descripcion,
          fecha: new Date()
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.newTodo = "";
      
    },
    /*onSubmit() {
            fotos.push(this.foto_nueva,(res)=>{
                console.log("res: "+res)
            });
            
        },*/
    listar() {
      alert("entré");
      fotosRef.push(this.foto_nueva);
      this.foto_nueva.descripcion = "";
      /*var ref = db.ref("fotos");
            ref.orderByChild("uid").equalTo(localStorage.getItem("uid")).on("value", function(snapshot) {
                console.log(snapshot.val())
              
            });*/
    },
    eliminar: function(p_foto) {
      fotos.child(p_foto[".key"]).remove(function(error) {
        if (error) {
          toastr.error("Error al intentar eliminar el registro.", "Aviso");
        } else {
          toastr.success("Registro eliminado correctamente.", "Aviso");
        }
      });
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    openCamera() {
      this.publicate = true;
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
        })
        .catch(error => {
          console.error("getUserMedia() error:", error);
        });
    },
    capture() {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);

      return imageCapture.takePhoto().then(blob => {
        console.log("file ====", blob);
        firebase
          .storage()
          .ref()
          .child(`images/picture-${new Date().getTime()}`)
          .put(blob)
          .then(snapshop => {
            console.log("snapshop file ====", snapshop);
            firebase
              .storage()
              .ref()
              .child(snapshop.ref.location.path)
              .getDownloadURL()
              .then(url => {
                this.foto_nueva.url_image = url;
                console.log("url ====", url);
                //Insertamos en una tabla el id del usuario, la foto y  descripción.
              })
              .catch(error => {
                console.error("error get url file", error);
                switch (error.code) {
                  case "storage/object_not_found":
                    // File doesn't exist
                    break;
                  case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    break;
                  case "storage/canceled":
                    // User canceled the upload
                    break;
                  case "storage/unknown":
                    // Unknown error occurred, inspect the server response
                    break;
                }
              });
          });
      });
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
  destroyed() {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://code.getmdl.io/1.2.1/material.blue-red.min.css");

.card-align {
  width: 30%;
  margin: auto;
}
.camera-modal {
  width: 100%;
  height: 100%;
  margin: 20px auto;
  z-index: 1000;
  padding: 15px;
}
.publication-new {
  width: 35%;
  height: 35%;
  margin: 0px auto;
  background: #ddd;
  border-radius: 5px;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.camera-modal-container {
  position: absolute;
}
.camera-modal-container span {
  position: relative;
  top: -40px;
  left: 200px;
}
.flex-row {
  display: flex;
}
.home {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.flex-row a {
  border-radius: 0px;
  font-weight: bold;
}
</style>
