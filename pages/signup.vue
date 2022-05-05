<template>
  <div>
    <main>
      <AuthForm actionType="signup" />
    </main>
  </div>
</template>

<script>
import AuthForm from "../components/AuthForm.vue";
import Header from "../components/Header.vue";
export default {
  components: { AuthForm, Header },
  name: "IndexPage",
  layout: "auth",
};
</script>

<style></style>
