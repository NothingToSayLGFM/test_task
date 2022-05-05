<template>
  <main class="main">
    <section class="projects" v-show="projects.length">
      <div
        class="project"
        v-for="item in projects"
        :key="item.id"
        :data-id="item.id"
        @click="toggleModal(item.id)"
      >
        <img :src="item.logo_url" />
        <p>{{ item.is_active > 0 ? "active" : "no active" }}</p>
        <p>{{ item.name }}</p>
      </div>
    </section>
    <h2 v-show="!projects.length && !error">Nothing Found</h2>
    <h2 v-show="error">Something went wrong, check internet connection</h2>
    <EditModal
      @toggleModal="toggleModal"
      :openModal="openModal"
      :activeItemId="activeItemId"
    />
  </main>
</template>

<script>
import DataLoader from "../components/share/DataLoader.vue";
import EditModal from "../components/share/EditModal.vue";

export default {
  data() {
    return {
      openModal: false,
      activeItemId: null,
    };
  },
  components: { DataLoader, EditModal },
  async asyncData({ store }) {
    try {
      await store.dispatch("projects/getProjects");
      return { error: false };
    } catch (e) {
      return { error: true };
    }
  },
  methods: {
    toggleModal(id = null) {
      this.activeItemId = id;
      this.openModal = !this.openModal;
    },
  },
  computed: {
    projects() {
      return this.$store.state.projects.projectsData;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  .loader {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  h2 {
    text-align: center;
    display: block;
    width: 100%;
  }
  .projects {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    align-items: center;
    .project {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 50%;
      background-color: $white;
      border: 1px solid rgba(0, 0, 0, 0.11);
      box-shadow: 0 0 12px rgb(0 0 0 / 25%);
      border-radius: 15px;
      overflow: hidden;
      padding: 15px;
      min-height: 182px;
      cursor: pointer;
      margin: 15px 0;
      @media screen and (max-width: 662px) {
        flex-direction: column;
      }
    }
  }
}
</style>
