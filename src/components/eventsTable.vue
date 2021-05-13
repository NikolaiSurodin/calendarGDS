<template>
  <div>
    <b-button v-b-toggle.sidebar-right>Заявки</b-button>
    <b-sidebar id="sidebar-right" title="Заявки" right shadow width="25%">
      <div class="px-3 py-2">
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
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
            <th scope="row">{{ idx + 1 }}</th>
            <td>{{ e.title }}</td>
            <td>{{ e.kind === 'vacation' ? 'Отпуск' : 'Отгул' }}</td>
            <td>{{ e.date_from }} - {{ e.date_to }}</td>
            <td>{{ e.busy === true ? 'ОК' : 'X' }}</td>
            <td v-for="(u, idx) in users"
            :key="idx"
            >{{u.id === e.user ? `${u.username}`: ''}}</td>
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
      author: '',
      id: [],
      us: []
    }
  },
  methods: {
    auhor() {

    }
  },
  computed: {
    events() {
      return this.$store.getters.calendarState
    },
    users() {
      return this.$store.getters.users
    }
  },
  mounted() {
    this.auhor()
    this.$store.dispatch('allUsers')
  }
}
</script>

<style scoped>

</style>