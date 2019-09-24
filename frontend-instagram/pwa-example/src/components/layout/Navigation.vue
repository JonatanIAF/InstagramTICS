<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <h3 class="title is-3">InstaShot</h3>
                </router-link>
                <a
                    role="button"
                    class="navbar-burger burger"
                    :class="{'is-active': isOpen}"
                    @click.prevent="toggleMenu"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isOpen}">
                <div class="navbar-start">
                    <router-link class="navbar-item" to="/"></router-link>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <template v-if="user">
                            <div class="navbar-item has-dropdown is-hoverable">
                                <a class="navbar-link">{{ user.displayName || user.email }}</a>
                                <div class="navbar-dropdown">
                                    <router-link class="navbar-item" to="/home">Inicio</router-link>
                                    <router-link class="navbar-item" to="/home">Seguidores</router-link>
                                    <router-link class="navbar-item" to="/home">Siguiendo</router-link>
                                    <hr class="navbar-divider" />
                                    <a class="navbar-item" @click="logout">Cerrar Sesión</a>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </nav>
        <div class="home">
            <div class="flex-row" v-if="user">
                <router-link class="button is-fullwidth link" to="/home">Mis fotos</router-link>
                <router-link class="button is-fullwidth link" to="/fotos">Fotos</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      isOpen: false,
      user: null
    };
  },
  methods: {
    toggleMenu() {
      const status = !this.isOpen;
      this.isOpen = status;
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>
<style>
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
.flex-row .link {
  border-radius: 0px;
  font-weight: bold;
}
</style>
