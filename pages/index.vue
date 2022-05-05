<template>
  <main class="main">
    <div class="main-wrap" v-show="!loading">
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
      <h2 v-show="!projects.length">Nothing Found</h2>
    </div>
    <div v-show="loading" class="loader">
      <DataLoader />
    </div>
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
      loading: true,
      error: false,
      openModal: false,
      activeItemId: null,
    };
  },
  components: { DataLoader, EditModal },
  async mounted() {
    this.error = false;
    this.loading = true;
    try {
      await this.$store.dispatch("projects/getProjects");
    } catch (e) {
      this.error = true;
    }
    this.loading = false;
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
  .main-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  h2 {
    text-align: center;
  }
  .projects {
    display: flex;
    justify-content: center;
    width: 100%;
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
      cursor: pointer;
    }
  }
}
</style>
