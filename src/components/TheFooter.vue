<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">© GDS - 2021</span>
    </div>
  </footer>
</template>

<script>
export default {
name: "AppFooter"
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;

  background-color: #f5f5f5;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
div {
  display: block;
}
</style>