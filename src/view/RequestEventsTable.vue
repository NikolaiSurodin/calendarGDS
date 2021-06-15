<template>
  <div>
    <template>
      <b-button v-if="pendingEvents.length"
                v-b-toggle.sidebar-right
                variant="outline-warning"
      >
        Новые заявки ({{ pendingEvents.length }})
      </b-button>
      <b-sidebar id="sidebar-right" title="Заявки" right shadow width="34%">
        <div class="px-3 py-2">
          <div>
            <b-table
                :items="pendingEvents"
                :fields="fields"
                striped responsive="sm">
              <template #cell(show_details)="row">
                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                <b-form-checkbox
                    v-model="row.detailsShowing"
                    @change="row.toggleDetails">
                  <b-icon icon="eye"></b-icon>
                </b-form-checkbox>
              </template>

              <template #row-details="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b></b></b-col>
                    <b-col><b>{{ row.item.username }} {{ row.item.user_last_name }}</b></b-col>
                    <b-col><b> {{ row.item.state }}</b></b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Связь</b></b-col>
                    <b-col><input type="text" class="form-control" disabled v-model="row.item.busy"></b-col>
                  </b-row>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Описание</b></b-col>
                    <b-col>
                      <b-textarea type="text" class="row-cols-sm-3 control-label" disabled
                                  v-model="row.item.comment"></b-textarea>
                    </b-col>
                  </b-row>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Статус</b></b-col>
                    <b-col><input type="text" class="form-control" disabled v-model="row.item.request"></b-col>
                  </b-row>

                  <b-button variant="outline-success"
                            size="sm"
                            class="mr-1"
                            @click="approved(row.item.id, 'success' , 'danger')">
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
  name: "RequestEventsTable",
  data() {
    return {
      activeColor: true,
      eventForm: {},
      eventApp: false,
      fields: ['last_name', 'kind', 'date_from', 'date_to', 'show_details']
    }
  },
  methods: {
    approved(id, success = null) {
      this.$store.dispatch('approveEvent', {
        value: {
          status: 'approved'
        },
        id: id
      })
          .then(() => {
            this.$bvToast.toast('Заявка одобрена!', {
              variant: success,
              solid: true
            })
          })
          .catch((error) => {
            this.$bvToast.toast(`${error}`, {
              solid: true
            })
          })
    },
    rejected(id, danger = null) {
      this.$store.dispatch('rejectEvent', {
        value: {
          status: 'rejected'
        },
        id: id
      })
          .then(() => {
            this.$bvToast.toast('Заявка отклонена!', {
              variant: danger,
              solid: true
            })
          })
          .catch((error) => {
            this.$bvToast.toast(`${error}`, {
              solid: true
            })
          })
    }
  },
  computed: {
    pendingEvents() {
      return this.$store.getters.getFilteredEvents.map((r) => ({
        last_name: r.user.profile.last_name,
        kind: r.kind === 'vacation' ? 'Отпуск' : 'Отгул',
        date_from: r.date_from,
        date_to: r.date_to,
        id: r.id,
        busy: r.busy === true ? 'Недоступен для связи' : 'Доступен для связи',
        comment: r.comment,
        status: r.status,
        username: r.user.profile.first_name,
        user_last_name: r.user.profile.last_name,
        state: r.user.profile.state,
        request: r.request === true ? 'Заявка' : 'Планируется...'
      }))
    }
  }
}
</script>

<style scoped>
</style>