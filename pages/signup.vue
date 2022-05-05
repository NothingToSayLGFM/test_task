<template>
  <div>
    <main>
      <SignupForm />
    </main>
  </div>
</template>

<script>
import SignupForm from "../components/auth/SignupForm.vue";
import Header from "../components/Header.vue";
export default {
  components: { SignupForm, Header },
  name: "IndexPage",
  layout: "auth",
  middleware: ["auth"],
};
</script>

<style></style>
