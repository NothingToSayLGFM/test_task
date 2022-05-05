<template>
  <section class="auth">
    <form class="auth__form" @submit.prevent="auth">
      <div class="auth__form--title">
        <img src="@/assets/images/quwi-logo.png" alt="image" />
        <p>quwi</p>
      </div>
      <div class="auth__form--fields">
        <input type="text" placeholder="name" v-model="name" />
        <input type="email" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <div class="auth-errors" v-if="error">
        <span class="error">{{ error }}</span>
      </div>
      <button class="auth__form--submit" :disabled="loading">
        <ButtonLoader v-show="loading" />
        <span v-show="!loading">signup</span>
      </button>
    </form>
  </section>
</template>

<script>
import ButtonLoader from "../share/ButtonLoader.vue";

export default {
  components: { ButtonLoader },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async auth() {
      const formData = {};

      if (!this.name || !this.password || !this.email) {
        return;
      }
      formData.email = this.email;
      formData.password = this.password;
      formData.name = this.name;
      await this.authHandler(formData, "signup");

      if (this.user) {
        this.$router.push("/");
      }
    },
    async authHandler(body, type) {
      this.error = null;
      this.loading = true;
      try {
        await this.$store.dispatch("auth/auth", { ...body, type });
      } catch (e) {
        for (const [key, value] of Object.entries(
          e.response.data.first_errors
        )) {
          this.error = `${key}: ${value}`;
        }
      }
      this.loading = false;
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style lang="scss">
@import "./form";
</style>
