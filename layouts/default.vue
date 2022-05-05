<template>
  <div class="color-bg">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: { Header },
  async asyncData({ store }) {
    await store.dispatch("auth/authByToken");
  },
};
</script>

<style></style>
