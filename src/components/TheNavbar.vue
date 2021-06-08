<template>
  <div>
    <template>
      <b-navbar type="dark" variant="dark" class="fixed-top">
        <b-navbar-nav>
          <b-nav-item class="mr-auto" @click="toCalendar">Календарь</b-nav-item>
          <b-nav-item-dropdown text="Профиль" right>
            <b-dropdown-item>{{ user.username }}</b-dropdown-item>
            <b-dropdown-item @click="toEditProfile">
              Настройки
              <b-icon size="sm" icon="gear-fill" aria-hidden="true"></b-icon>
            </b-dropdown-item>
            <b-dropdown-item v-if="isSuperUser"
                             @click="toAllUsersList"
            >
              Мои сотрудники
            </b-dropdown-item>
            <b-dropdown-item @click="logout">
              Выйти
              <b-icon icon="power" aria-hidden="true"></b-icon>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </template>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      date:''
    }
  },
  methods: {
    toEditProfile() {
      this.$router.push(`/edit_profile/${this.user.id}`)
    },
    toCalendar() {
      this.$emit('toCalendar')
    },
    toAllUsersList() {
      this.$router.push('/all_users')
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