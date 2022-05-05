export const actions = {
  nuxtServerInit(_, { redirect }) {
    if (this.$cookies.get("token")) {
      redirect({ name: "index" });
    } else {
      redirect({ name: "login" });
    }
  },
};
