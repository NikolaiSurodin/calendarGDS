<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    check() {
      this.$store.dispatch('checkAuth')
          .then(() => {
          })
          .catch((err) => {
            console.log(err)
            this.$router.push('/')
          })
    }
  },
  beforeMount() {
    this.check()
  },
  mounted() {
    this.$root.$on('logout', () => {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
    })
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
