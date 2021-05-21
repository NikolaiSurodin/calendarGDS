<template>
  <div id="events-log">
    <div><b>{{ date }}</b></div>
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
      date: ''
    }
  },
  mounted() {
    setInterval(() => {
      this.date = new Date().toLocaleDateString() + '  ' + new Date().toLocaleTimeString()
    })
  }
}

</script>

<style scoped>
#events-log {
  margin-left: 57%;
  vertical-align: top;
  width: 180px;
  background-color: #e5e5e5;
  padding: 10px;
  min-height: 100px;
  border-radius: 10px;
  position: fixed;

}

#events-log div {
  font-size: 14px;
  line-height: 1.1;
  width: 150px;
  padding: 10px;
}
</style>