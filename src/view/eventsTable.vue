<template>
  <div>
    <template>
      <b-button v-b-toggle.sidebar-right variant="light" class="alo">Заявки</b-button>
      <b-sidebar id="sidebar-right" title="Заявки" right shadow width="30%">
        <div class="px-3 py-2">
          <div>
            <b-table :items="events" :fields="fields" striped responsive="sm">
              <template #cell(show_details)="row">
                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails(eventForm.id)">
                  <b-icon icon="eye"></b-icon>
                </b-form-checkbox>
              </template>

              <template #row-details="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b></b></b-col>
                    <b-col><b>{{ row.item.first_name }} {{ row.item.last_name }}</b></b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Связь:</b></b-col>
                    <b-col><input type="text" class="form-control" disabled v-model="row.item.busy"></b-col>
                  </b-row>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Описание:</b></b-col>
                    <b-col>
                      <b-textarea type="text" disabled v-model="row.item.comment"></b-textarea>
                    </b-col>
                  </b-row>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Статус:</b></b-col>
                    <b-col><input type="text" class="form-control" disabled v-model="row.item.status"></b-col>
                  </b-row>
                  <b-button variant="outline-success"
                            size="sm"
                            class="mr-1"
                            @click="approved(row.item.id, 'success')">
                    Подтвердить
                  </b-button>
                  <b-button
                      variant="outline-danger"
                      size="sm"

                      @click="rejected(row.item.id, 'danger')">
                    Отклонить
                  </b-button>
                </b-card>
              </template>
            </b-table>
          </div>
        </div>
      </b-sidebar>
    </template>
  </div>
</template>

<script>

export default {
  name: "eventsTable",
  data() {
    return {
      activeColor: true,
      detailsShowing:false,
      eventForm: {},
      eventApp: false,
      fields: ['first_name', 'kind', 'date_from', 'date_to', 'show_details']
    }
  },
  methods: {
    approved(id, success = null) {
      this.$store.dispatch('updateEvent', {
        value: {
          status: 'approved'
        },
        id: id
      })
      this.$bvToast.toast('Заявка одобрена!', {
        title: `Variant ${success || 'default'}`,
        variant: success,
        solid: true
      })
    },
    rejected(id, danger = null) {
      this.$store.dispatch('updateEvent', {
        value: {
          status: 'rejected'
        },
        id: id
      })
      this.$bvToast.toast('Заявка отклонена!', {
        title: `Variant ${danger || 'default'}`,
        variant: danger,
        solid: true
      })
    },
    toggleDetails(id) {
      this.events.find((e) => e.id === id)
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
    }
  },
  mounted() {
    this.$store.dispatch('infoUser')
  }
}
</script>

<style scoped>
.alo{
  margin-left: 10%;
  margin-top: 100px;
  position: fixed;

}

</style>