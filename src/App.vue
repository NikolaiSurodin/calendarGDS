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
      .catch(() => {
        this.$router.push('/')
      })
    }
  },
  beforeMount() {
    this.check()
  },
  mounted() {
    this.check()
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8rem;
}
</style>
