<template>
  <div>
    <b-button v-b-toggle.sidebar-right
              variant="outline-secondary">
      Мои запросы
    </b-button>
    <b-sidebar id="sidebar-right" title="Мои запросы" right shadow width="34%">
      <div class="px-3 py-2">
        <table class="table table-sm">
          <thead>
          <tr>
            <th>Тип</th>
            <th>Даты</th>
            <th>Статус</th>
          </tr>
          </thead>
          <tbody v-for="(event, id) in events" :key="id">
          <tr>
            <th scope="row">{{ event.kind }}</th>
            <td>{{ event.date_from }} - {{ event.date_to }}</td>
            <td :class="{
              approved:event.status === 'approved',
              pending:event.status === 'pending',
              rejected:event.status === 'rejected'
             }">{{ event.status }}
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
  computed: {
    events() {
      return this.$store.getters.getEvents.map((r) => ({
        kind: r.kind === 'vacation' ? 'Отпуск' : 'Отгул',
        date_from: r.date_from,
        date_to: r.date_to,
        status: r.status
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
  color: #d8e900;
}

.rejected {
  color: #d91b29;
}

</style>