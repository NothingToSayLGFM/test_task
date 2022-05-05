<template>
  <div>
    <main>
      <SignupForm />
    </main>
  </div>
</template>

<script>
import SignupForm from "../../components/auth/SignupForm.vue";
import Header from "../../components/Header.vue";
export default {
  components: { SignupForm, Header },
  name: "signup",
  layout: "auth",
};
</script>

<style></style>
