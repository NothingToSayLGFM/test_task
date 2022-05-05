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
    console.log(1);
    try {
      await store.dispatch("auth/authByToken");
    } catch (e) {
      redirect({ name: "login" });
    }
  },
};
</script>

<style></style>
