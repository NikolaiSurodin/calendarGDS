<template>
  <div>
    <b-button v-b-toggle.sidebar-variant variant="light">Мои события</b-button>
    <b-sidebar id="sidebar-variant"
               :right=true
               title="Мои события"
               bg-variant="light"
               text-variant="dark" shadow
               width="27%"
    >
      <div class="px-3 py-2">
        <table class="table table-sm">
          <thead>
          <tr>
            <th>Тип</th>
            <th>Даты</th>
            <th>Статус</th>
            <th>Удалить</th>
          </tr>
          </thead>
          <tbody v-for="(event, id) in events" :key="id">
          <tr>
            <th>{{ event.kind }}</th>
            <td>{{ event.date_from }} - {{ event.date_to }}</td>
            <td :class="{
              approved:event.status === 'Одобрено',
              pending:event.status === 'На рассмотрении',
              rejected:event.status === 'Отклонено'
             }">
              {{ event.status }}
            </td>
            <td>
              <b-button @click="deleteEvent(event.id)">Удалить</b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-sidebar>

  </div>
</template>

<script>
export default {
  name: "UserEventsTable",
  data() {
    return {}
  },
  methods: {
    deleteEvent(id) {
      this.$store.dispatch('deleteRecords', {id: id})
    }
  },

  computed: {
    events() {
      return this.$store.getters.getEvents.map((r) => ({
        id: r.id,
        kind: r.kind === 'vacation' ? 'Отпуск' : 'Отгул',
        date_from: new Date(r.date_from).toLocaleDateString('ru-RU'),
        date_to: new Date(r.date_to).toLocaleDateString('ru-RU'),
        status: (r.status === 'approved') ? 'Одобрено' : (r.status === 'pending') ? 'На рассмотрении' : (r.status === 'rejected') ? 'Отклонено' : ''
      }))
    }
  }

}
</script>

<style scoped>
.approved {
  color: #05f110;
}

.pending {
  color: #928b25;
}

.rejected {
  color: #d91b29;
}
</style>