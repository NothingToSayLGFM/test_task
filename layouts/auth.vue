<template>
  <div class="image-bg">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: { Header },
  fetch() {},
};
</script>

<style scoped lang="scss">
.image-bg {
  background-image: url(https://quwi.com/img/backgrounds/gray_blur.png);
  background-size: contain;
}
</style>
