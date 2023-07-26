<template>
  <div class="app-wrapper">
    <div class="app">
      <navigation-main></navigation-main>
      <router-view />
      <footer-component></footer-component>
    </div>
  </div>
</template>

<script>
import NavigationMain from './components/NavigationMain.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: { NavigationMain, FooterComponent },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}
</style>
