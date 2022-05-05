<template>
  <div>
    <main>
      <LoginForm />
    </main>
  </div>
</template>

<script>
import LoginForm from "../components/auth/LoginForm.vue";
import Header from "../components/Header.vue";
export default {
  components: { LoginForm, Header },
  name: "IndexPage",
  layout: "auth",
};
</script>

<style></style>
