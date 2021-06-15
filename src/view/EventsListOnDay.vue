<template>
  <div id="events-log">
    <div class="ml-3">
      <img src="../assets/logoGDS.png" height="70" width="150"/>
    </div>

    <div class="ml-3">
      <b>{{ date }}</b>
    </div>
    <div class="ml-3"
         v-for="(event,idx) in events"
         :key="idx"
    >

      <div class="event-block table-hover event-list">{{ event }}</div>
    </div>
    <div>
      <div class="button-list">
        <request-events-table v-if="!isSuperUser"/>
        <div class="p-0">
        <b-button variant="outline-success" type="button" @click="addEvent">
          Создать
          <b-icon icon="circle-fill" animation="throb" font-scale="1"></b-icon>
        </b-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import RequestEventsTable from "@/view/RequestEventsTable";

export default {
  name: "EventsListOnDay",
  components: {RequestEventsTable},
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
  methods: {
    addEvent() {
      this.$emit('addEvent')
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
  },
  computed:{
    isSuperUser() {
      return this.$store.getters.isSuperUser
    }
  }

}
</script>

<style scoped>
#events-log div {
  font-size: 14px;
  line-height: 1.1;
  max-width: 200px;
  padding: 10px;
}

.event-block {
  background-color: #cacef3;
}

.button-list {
  background: #fff;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  border-radius: 8px;

  text-align: center;
  width: 200px;
}
.event-list{
  background: #fff;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  border-radius: 8px;
}
</style>