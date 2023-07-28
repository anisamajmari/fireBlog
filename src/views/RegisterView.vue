<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Log In</router-link>
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <userImg class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <userImg class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <userImg class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <emailImg class="icon" />
        </div>

        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <passwordImg class="icon" />
        </div>
      </div>
      <div class="error" v-show="error">{{ this.errorMsg }}</div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import emailImg from '../assets/Icons/envelope-regular.svg';
import passwordImg from '../assets/Icons/lock-alt-solid.svg';
import userImg from '../assets/Icons/user-alt-light.svg';
import { createFirebaseUser } from '../firebase/app_auth.js';
import { addUser } from '../firebase/repository/user_repository.js';

export default {
  namespaced: 'Register',
  components: { emailImg, passwordImg, userImg },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      error: null,
      errorMsg: ''
    };
  },
  methods: {
    async register() {
      if (
        this.email !== '' &&
        this.password !== '' &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.username !== ''
      ) {
        //
        this.error = false;
        this.errorMsg = '';

        const created = await createFirebaseUser(this.email, this.password);
        await addUser({
          firstName: this.firstName,
          email: this.email,
          lastName: this.lastName,
          username: this.username,
          id: created.user.uid
        });

        this.$router.push({ name: 'Home' });
        return;
      }
      this.error = true;
      this.errorMsg = 'Please fill out all the fields!';
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
