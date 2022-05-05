<template>
  <div class="color-bg">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "default",
  components: { Header },
  async asyncData({ store, redirect }) {
    try {
      await store.dispatch("auth/authByToken");
    } catch (e) {
      redirect("/login/");
    }
  },
};
</script>

<style></style>
