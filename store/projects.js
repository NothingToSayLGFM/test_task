export const state = () => ({
  projectsData: [],
  activeProject: null,
});

export const mutations = {
  SET_PROJECTS(state, data) {
    state.projectsData = [...data];
  },
  SET_ACTIVE_PROJECT(state, data) {
    state.activeProject = data;
  },
  SET_NEW_NAME(state, data) {
    state.activeProject.name = data;
  },
};

export const actions = {
  async getProjects({ commit }) {
    const res = await this.$axios.get("projects-manage/index");
    commit("SET_PROJECTS", res.data.projects);
  },
  async getProjectById({ commit }, id) {
    const res = await this.$axios.get(`projects-manage/${id}`);
    commit("SET_ACTIVE_PROJECT", res.data.project);
  },
  async changeNameOfProject({ dispatch }, data) {
    const { id, ...body } = data;
    await this.$axios.$post(`projects-manage/update?id=${id}`, body);
    await dispatch("getProjects");
  },
};
