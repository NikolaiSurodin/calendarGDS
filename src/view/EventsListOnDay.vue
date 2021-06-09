<template>
  <div id="events-log">
    <div class="ml-3">
      <img src="../assets/2017679.png" height="70" width="150"/>
    </div>
    <div class="ml-3">
      <b>{{ date }}</b>
    </div>
    <div class="ml-3"
         v-for="(event,idx) in events"
         :key="idx">

      <div class="event-block table-hover">{{ event }}</div>

    </div>
  </div>

</template>

<script>

export default {
  name: "EventsListOnDay",
  props: {
    events: {
      type: Array
    }
  },
  data() {
    return {
      date: ''
    }
  },
  mounted() {
    setInterval(() => {
      this.date = new Date().toLocaleDateString('ru-RU', {
        "day": "numeric",
        "month": "long",
        "year": "numeric"
      }) + '  ' + new Date().toLocaleTimeString('ru-RU')
    })
  }

}
</script>

<style scoped>
#events-log div  {
  font-size: 14px;
  line-height: 1.1;
  width: 200px;
  padding: 10px;


}
.event-block {
  background-color: #cacef3;
}
</style>