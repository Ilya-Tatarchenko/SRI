<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>

    <div class="main">
      <router-link to="/buildings/create">
        <button
          type="button"
          class="btn btn-secondary btn-lg"
          v-if="this.currentUser.roles.includes('ROLE_ADMIN')"
        >
          Add building
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'User',
  data() {
    return {
      content: '',
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style>
.jumbotron {
  margin-top: 50px;
}
</style>
