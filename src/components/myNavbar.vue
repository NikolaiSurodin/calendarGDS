<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#" class="mr-auto">Home</b-nav-item>
        <b-nav-item-dropdown text="Профиль" right>
          <b-dropdown-item @click="toProfile">{{ user.username }}</b-dropdown-item>
          <b-dropdown-item @click="toEditProfile">Настройки</b-dropdown-item>
          <b-dropdown-item v-if="isSuperUser" to="/userList">Мои сотрудники</b-dropdown-item>
          <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "myNavbar",
  data() {
    return {}
  },
  methods: {
    toProfile() {
      this.$emit('toProfile')
    },
    toEditProfile(){
      this.$router.push(`/edit_profile/${this.user.id}`)
    },
    logout() {
      this.$root.$emit('logout')
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    isSuperUser() {
      return this.$store.getters.isSuperUser
    }
  }
}
</script>

<style scoped>

</style>