<template>
  <div class="reset-password">
    <ModalComponent v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <LoadingComponent v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <emailImg class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import emailImg from '../assets/Icons/envelope-regular.svg';
import LoadingComponent from '../components/LoadingComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import { resetPassword } from '../firebase/app_auth.js';

export default {
  components: { emailImg, ModalComponent, LoadingComponent },
  namespaced: 'ForgotPassword',
  data() {
    return {
      email: null,
      modalActive: false,
      modalMessage: '',
      loading: null
    };
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = '';
    },
    async resetPassword() {
      this.loading = true;
      await resetPassword(this.email)
        .then(() => {
          this.modalMessage = 'If your account exists, you will receive an email.';
          this.loading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
