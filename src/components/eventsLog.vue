<template>
  <div id="events-log">
    <h3>События</h3>
    <div v-for="(event,id) in events"
         :key="id"
    >{{ event }}
    </div>
  </div>
</template>

<script>
export default {
  name: "eventsLog",
  props: ['events'],
  data() {
    return {

    }
  }
}

</script>

<style scoped>
#events-log {
  display: inline-block;
  vertical-align: top;
  width: 340px;
  background-color: #e5e5e5;
  padding: 10px;
  min-height: 200px;
  border-radius: 10px;
}

#events-log div {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
}
</style>