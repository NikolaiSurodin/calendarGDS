<template>
  <div>
    <template>
      <b-button v-b-toggle.sidebar-right variant="outline-info">Заявки</b-button>
      <b-sidebar id="sidebar-right" title="Заявки" right shadow width="30%">
        <div class="px-3 py-2">
          <div class="px-3 py-2" v-if="eventApp">
            <event-popup
                @close="close"
            >
              <form class="form-signin">

                <label>Связь</label>
                <input type="text"
                       class="form-control"
                       disabled
                       v-model="eventForm.busy"
                >
                <label>Комментарий</label>
                <input type="text"
                       class="form-control"
                       disabled
                       v-model="eventForm.comment"
                >
                <label>Статус</label>
                <input type="text"
                       class="form-control"
                       disabled
                       v-model="eventForm.status"
                >
              </form>
            </event-popup>
          </div>
          <table class="table">
            <thead>
            <tr>
              <th>Имя</th>
              <th>Заявка</th>
              <th>Даты</th>
              <th>Показать</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(e,idx) in events"
                :key="idx"
            >

              <td class="text-left">
                {{ e.first_name }} {{ e.last_name }}
              </td>

              <td>{{ e.kind }}</td>

              <td>с: {{ e.date_from }} по: {{ e.date_to }}</td>

              <td>
                <b-button @click="visiblePopupEvent(e.id)">Просмотр</b-button>
              </td>
            </tr>
            </tbody>

          </table>
        </div>
      </b-sidebar>
    </template>
  </div>
</template>

<script>

import eventPopup from "@/view/eventPopup";

export default {
  name: "eventsTable",
  components: {eventPopup},
  data() {
    return {
      activeColor: '#131311',
      eventForm: {},
      eventApp: false
    }
  },
  methods: {
    close() {
      this.eventApp = false
    },
    visiblePopupEvent(id) {
      this.eventApp = true
      this.eventForm = this.events.find((e) => e.id === id)
    }
  },
  computed: {
    events() {
      return this.$store.getters.calendarState.map((e) => ({
        first_name: e.user.profile?.first_name,
        last_name: e.user.profile?.last_name,
        kind: e.kind === 'vacation' ? 'Отпуск' : 'Отгул',
        date_from: e.date_from,
        date_to: e.date_to,
        id: e.id,
        status: e.status,
        busy: e.busy === true ? 'Недоступен' : 'Доступен для связи',
        comment: e.comment
      }))
    },
  },
  mounted() {
    this.$store.dispatch('infoUser')
  }
}
</script>

<style scoped>
.alo {
  background-color: #e66465;
}
</style>