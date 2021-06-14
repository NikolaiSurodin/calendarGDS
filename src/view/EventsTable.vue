<template>
  <div>
    <div class="px-3 py-2">
      <div class="filtered">
        <p class="mr-2">Одобренные</p>
        <b-form-checkbox v-model="approve" name="check-button" switch>

        </b-form-checkbox>
        <p class="mr-2">Прошлый год</p>
        <b-form-checkbox v-model="lastYear" name="check-button" switch>

        </b-form-checkbox>
        <p class="mr-2">Отказано</p>
        <b-form-checkbox v-model="reject" name="check-button" switch>

        </b-form-checkbox>
      </div>
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
            <b-button type="submit"
                      variant="light"
                      @click="deleteEvent(event.id)">
              <b-icon icon="x-circle" scale="1" variant="danger"></b-icon>
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "EventsTable",
  data() {
    return {
      approve: false,
      reject: false,
      lastYear: false
    }
  },
  methods: {
    deleteEvent(id) {
      this.$store.dispatch('deleteRecords', {id: id})
          .catch((error) => {
            this.$bvToast.toast('Ошибка! Невозможно удалить событие', {
              title: `${error}`,
              solid: true
            })
          })
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
    },
    approvedEvents() {
      return this.events.filter((el) => el.status === 'Одобрено')
    },
    rejectedEvents() {
      return this.events.filter((el) => el.status === 'Отказано')
    },
    eventLastYear() {
      return this.events.filter((el) => new Date(el.date_from).getFullYear() < new Date().getFullYear())
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

.filtered {
  text-align: left;
  display: flex;
  padding: 1px;
}
</style>