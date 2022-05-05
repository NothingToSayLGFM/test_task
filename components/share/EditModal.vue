<template>
  <transition name="fade">
    <div class="edit-modal-overlay" v-show="openModal">
      <div class="edit-modal">
        <div v-show="!loading">
          <div class="edit-modal__field">
            <input placeholder="name" v-model="activeProjectName" />
          </div>
          <div class="edit-modal__buttons">
            <button @click="toggleModal" class="edit-modal__buttons--button">
              Close
            </button>
            <button
              @click="editProjectName"
              class="edit-modal__buttons--button"
            >
              Edit
            </button>
          </div>
        </div>
        <div class="loader" v-else>
          <DataLoader />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DataLoader from "./DataLoader.vue";
export default {
  components: { DataLoader },
  name: "EditModal",
  props: {
    openModal: {
      type: Boolean,
    },
    activeItemId: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    async openModal() {
      if (this.openModal) {
        this.loading = true;
        try {
          await this.$store.dispatch(
            "projects/getProjectById",
            this.activeItemId
          );
        } catch (e) {
          this.$emit("toggleModal");
        }
        this.loading = false;
      }
    },
  },
  computed: {
    activeProjectName: {
      get() {
        return this.$store.state.projects.activeProject?.name;
      },
      set(value) {
        this.$store.commit("projects/SET_NEW_NAME", value);
      },
    },
  },

  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
    async editProjectName() {
      if (!this.activeProjectName) {
        return;
      }
      this.loading = true;
      const formData = {
        name: this.activeProjectName,
        id: this.activeItemId,
      };
      try {
        await this.$store.dispatch("projects/changeNameOfProject", formData);
        this.$emit("toggleModal");
      } catch (e) {
        this.$emit("toggleModal");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-modal-overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: red;
  top: 0;
  left: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  .edit-modal {
    position: relative;
    z-index: 501;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 20px 32px;
    max-width: 20rem;
    width: 100%;
    padding: 1.5rem 0.625rem 0.625rem 0.625rem;
    &__field {
      margin-bottom: 20px;
      input {
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
    &__buttons {
      display: flex;
      justify-content: space-between;
      &--button {
        padding: 10px;
        border: none;
        background-color: $blue;
        font-size: 18px;
        border-radius: 9px;
        font-weight: 400;
        color: $white;
        min-width: 80px;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    .loader {
      display: flex;
      justify-content: center;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
