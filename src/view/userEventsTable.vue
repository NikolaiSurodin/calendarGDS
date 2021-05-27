<template>
  <div>
    <b-button  v-b-toggle.sidebar-right
               variant="outline-secondary"
    >Мои отпуска</b-button>
    <b-sidebar id="sidebar-right" title="Заявки" right shadow width="34%">
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
            <td>{{ event.date_to }} - {{ event.date_from }}</td>
            <td :class="{
              approved:event.status === 'approved',
              pending:event.status === 'pending',
              rejected:event.status === 'rejected'
             }">{{ event.status }}
            </td>
          </tr>
          <tr>
          </tr>
          <tr>

          </tr>
          </tbody>
        </table>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "userEventsTable",
  data() {
    return {

    }
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
  },
}
</script>

<style scoped>
.approved {
  color: #05f110;
}

.pending {
  color: #a6f1ab;
}
.rejected{
  color: #d91b29;
}

</style>