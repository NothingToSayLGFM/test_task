<template>
  <section class="auth">
    <form class="auth__form" @submit.prevent="auth">
      <div class="auth__form--title">
        <img src="@/assets/images/quwi-logo.png" alt="image" />
        <p>quwi</p>
      </div>
      <div class="auth__form--fields">
        <input
          v-show="actionType == 'signup'"
          type="text"
          placeholder="name"
          v-model="name"
        />
        <input type="email" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <div class="auth-errors" v-show="error">
        <span class="error">{{ error }}</span>
      </div>
      <button class="auth__form--submit" :disabled="loading">
        <ButtonLoader v-show="loading" />
        <span v-else>{{ buttonText }}</span>
      </button>
      <nuxt-link
        v-show="actionType == 'login'"
        to="signup"
        class="auth__form--forget"
        >Forgot Password?</nuxt-link
      >
    </form>
  </section>
</template>

<script>
import ButtonLoader from "./share/ButtonLoader.vue";

export default {
  components: { ButtonLoader },
  props: {
    actionType: {
      type: String,
    },
  },
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
      if (this.actionType == "login") {
        if (!this.email || !this.password) {
          return;
        }
        formData.email = this.email;
        formData.password = this.password;
        await this.authHandler(formData, this.actionType);
      } else {
        if (!this.name || !this.password || !this.email) {
          return;
        }
        formData.email = this.email;
        formData.password = this.password;
        formData.name = this.name;
        await this.authHandler(formData, this.actionType);
      }
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
    buttonText() {
      return this.actionType == "login" ? "login" : "done";
    },
  },
};
</script>

<style lang="scss">
.auth {
  width: 440px;
  margin: auto;
  &__form {
    background-color: $white;
    border: 1px solid rgba(0, 0, 0, 0.11);
    box-shadow: 0 0 12px rgb(0 0 0 / 25%);
    border-radius: 15px;
    align-items: center;
    padding: 25px 40px 25px;
    &--title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 26px;
      img {
        max-width: 40px;
        max-height: 40px;
      }
      p {
        margin-left: 14px;
        color: $black;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 24px;
      }
    }
    &--fields {
      input {
        display: block;
        width: 100%;
        margin-bottom: 14px;
        border: 1px solid $space-gray;
        padding: 15px;
        border-radius: 5px;
        &:focus-visible {
          outline: none;
        }
      }
    }
    &--submit {
      background-color: $blue;
      font-size: 18px;
      border-radius: 9px;
      font-weight: 400;
      border: none;
      display: block;
      width: 100%;
      color: $white;
      margin-top: 31px;
      margin-bottom: 17px;
      height: 52px;
      text-transform: capitalize;
      &:hover {
        opacity: 0.7;
      }
      &:disabled {
        cursor: not-allowed;
        &:hover {
          opacity: 1;
        }
      }
    }
    &--forget {
      text-align: center;
      width: 100%;
      display: block;
      color: $space-blue;
      font-size: 14px;
    }
  }
  .auth-errors {
    font-size: 14px;
    color: $red;
  }
}
</style>
