<template>
  <div class="image-bg">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "auth",
  components: { Header },
  mounted() {
    console.log(1);
  },
  middleware(context) {
    console.log(2);
    if (context.$cookies.get("token")) {
      return context.redirect({ name: "index" });
    }
  },
};
</script>

<style scoped lang="scss">
.image-bg {
  background-image: url(https://quwi.com/img/backgrounds/gray_blur.png);
}
</style>
