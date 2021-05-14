<template>
  <div>
    <b-button v-b-toggle.sidebar-right variant="outline-info">Заявки</b-button>
    <b-sidebar id="sidebar-right" title="Заявки" right shadow width="30%">
      <div class="px-3 py-2">
        <table class="table">
          <thead>
          <tr>
            <th>ФИО</th>
            <th>Заявка</th>
            <th>Даты</th>
            <th>Связь</th>
            <th>Автор</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(e,idx) in events"
              :key="idx"

          >
            <td >
              <b-button :to="`event/${e.id}`">
                {{ e.title }}
              </b-button>
            </td>
            <td>{{ e.kind }}</td>
            <td>с: {{ e.date_from }} по: {{ e.date_to }}</td>
            <td>{{ e.busy }}</td>
            <td>{{ e.user }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-sidebar>
  </div>
</template>

<script>

export default {
  name: "eventsTable",
  data() {
    return {
      activeColor: '#131311'
    }
  },
  computed: {
    events() {
      return this.$store.getters.calendarState.map((e) => ({
        title: e.title,
        kind: e.kind === 'vacation' ? 'Отпуск' : 'Отгул',
        date_from: e.date_from,
        date_to: e.date_to,
        busy: e.busy === true ? 'ОК' : 'X',
        user: e.user.username,
        id: e.id,
        status:e.status
      }))
    },

  },
  mounted() {
    this.$store.dispatch('allUsers')
  }
}
</script>

<style scoped>

</style>