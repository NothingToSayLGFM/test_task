export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER_DATA(state, data) {
    state.user = data;
  },
  LOGOUT(state) {
    state.user = null;
  },
};

export const actions = {
  async auth({ commit }, data) {
    const { type, ...body } = data;

    this.$axios.setHeader("Client-Device", navigator.userAgent);
    this.$axios.setHeader(
      "Client-Timezone-Name",
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const res = await this.$axios.$post(`auth/${type}`, body);
    if (res) {
      commit("SET_USER_DATA", res);
      this.$cookies.set("token", res.token);
    }
  },
  async logout({ commit }) {
    await this.$axios.$post("auth/logout");
    this.$cookies.remove("token");
    commit("LOGOUT");
  },
  async authByToken({ commit }) {
    const res = await this.$axios.get("auth/init");
    commit("SET_USER_DATA", res);
  },
};
