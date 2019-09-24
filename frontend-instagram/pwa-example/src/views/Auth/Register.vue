<template>
  <div class="sign-up">
    <p>¡Vamos, crea una nueva cuenta!</p>
    <input type="text" v-model="name" placeholder="Nombre"><br>
    <input type="email" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Contraseña"><br>
    <button class="button is-small" @click="signUp">Registrarme</button>
    <span>Puedes regresar al <router-link to="/login">inicio de sesión</router-link>.</span>
  </div>
</template>

 <script>
  import firebase from 'firebase';

  export default {
    name: 'register',
    data() {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

 <style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>