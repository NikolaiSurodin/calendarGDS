<template>
  <div>
    <div class="px-3 py-2">
      <div class="filtered px-lg-5 py-2">
        <p class="mr-2">Одобренные</p>
        <b-form-checkbox v-model="eventsOfStatus"
                         id="check1"
                         value="Одобрено"
                         name="check-button"
                         switch>

        </b-form-checkbox>
        <p class="mr-2">Прошлый год</p>
        <b-form-checkbox v-model="eventsOfStatus"
                         id="check2"
                         :value="date"
                         name="check-button"
                         switch>

        </b-form-checkbox>
        <p class="mr-2">Отказано</p>
        <b-form-checkbox v-model="eventsOfStatus"
                         id="check3"
                         value="Отклонено"
                         name="check-button"
                         switch>

        </b-form-checkbox>
      </div>
      <table class="table table-sm">
        <thead>
        <tr>
          <th>Тип</th>
          <th>Даты</th>
          <th>Статус</th>
          <th></th>
        </tr>
        </thead>
        <tbody v-for="(event, id) in filteredEventsOfStatus" :key="id">
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
            <b-icon icon="x-circle" scale="2" variant="danger" class="icon" @click="deleteEvent(event.id)"></b-icon>
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
      eventsOfStatus: [],
      date:new Date().getFullYear() - 1

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
    filteredEventsOfStatus() {
      let filteredEvents = []
      // если есть выбранные чекбоксы
      if (this.eventsOfStatus.length) {
        //фильтруем данные
        filteredEvents = this.events.filter((el) => new Date(el.date_from).getFullYear() === this.date )
        filteredEvents = this.events.filter((el) => this.eventsOfStatus.indexOf(el.status) !== -1)
      }
       else {
        //иначе отдаем все данные из массива
        filteredEvents = this.events
      }
      return filteredEvents
    },
    events() {
      return this.$store.getters.getEvents.map((r) => ({
        id: r.id,
        kind: r.kind === 'vacation' ? 'Отпуск' : 'Отгул',
        date_from: new Date(r.date_from).toLocaleDateString('ru-RU'),
        date_to: new Date(r.date_to).toLocaleDateString('ru-RU'),
        status: (r.status === 'approved') ? 'Одобрено' : (r.status === 'pending') ? 'На рассмотрении' : (r.status === 'rejected') ? 'Отклонено' : ''
      }))
    }
  },
  mounted() {
    let a = this.events.filter((el) => new Date(el.date_from).toLocaleDateString('ru-RU') > new Date().toLocaleDateString('ru-RU'))
    console.log(a)
   console.log(new Date().toLocaleDateString('ru-RU'))
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
  display: flex;
  padding: 1px;

}

.icon {
  cursor: pointer;
  height: 30px;
}

</style>