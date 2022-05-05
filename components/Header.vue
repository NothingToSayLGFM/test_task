<template>
  <header class="header">
    <div class="header__logo">
      <nuxt-link to="/">
        <img src="@/assets/images/quwi-logo.png" alt="image" />
      </nuxt-link>
    </div>
    <nav class="header__navbar">
      <div class="header__navbar--items">
        <nuxt-link v-show="!token" :to="link">{{ link }}</nuxt-link>
        <div class="home-nav" v-else>
          <nuxt-link to="/">projects</nuxt-link>
          <button @click="logout" class="logout-btn">logout</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  computed: {
    link() {
      return this.$route.name == "login" ? "signup" : "login";
    },
    token() {
      return this.$cookies.get("token") || null;
    },
  },
};
</script>

<style lang="scss">
.header {
  background-color: $white;
  box-shadow: 0 0 5px rgb(0 0 0 / 25%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 46px;
  &__logo {
    img {
      max-height: 25px;
      max-width: 25px;
    }
  }
  &__navbar {
    height: 100%;
    display: flex;
    .home-nav {
      height: 100%;
      display: flex;
    }
    &--items {
      height: 100%;
      text-transform: uppercase;
      a {
        height: 100%;
        color: black;
        font-size: 0.8em;
        display: flex;
        align-items: center;
        padding: 0 15px;
        &:hover {
          background-color: $space-white;
          color: $orange;
        }
      }
      .logout-btn {
        display: inline-block;
        background-color: transparent;
        text-transform: uppercase;
        border: none;
        &:hover {
          background-color: $space-white;
          color: $orange;
        }
      }
    }
  }
}
</style>
