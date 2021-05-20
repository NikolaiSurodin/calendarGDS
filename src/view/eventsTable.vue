<template>
  <div>
    <template>
      <b-button v-b-toggle.sidebar-right
                variant="light"
                class="alo">
        Заявки
        <b-icon v-if="pendingEvents.length" icon="exclamation-circle-fill" variant="warning"></b-icon>
      </b-button>
      <b-sidebar id="sidebar-right" title="Заявки" right shadow width="30%">
        <div class="px-3 py-2">
          <div>
            <b-table :items="pendingEvents" :fields="fields" striped responsive="sm">
              <template #cell(show_details)="row">
                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails(pendingEvents.id)">
                  <b-icon icon="eye"></b-icon>
                </b-form-checkbox>
              </template>

              <template #row-details="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b></b></b-col>
                    <b-col><b>{{ row.item.user.profile.first_name }} {{ row.item.user.profile.last_name }}</b></b-col>
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
      eventForm: {},
      eventApp: false,
      fields: ['kind', 'date_from', 'date_to', 'show_details']
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
      this.$bvToast.toast('Заявка одобрена!', {
        variant: success,
        solid: true
      })
    },
    rejected(id, danger = null) {
      this.$store.dispatch('approveEvent', {
        value: {
          status: 'rejected'
        },
        id: id
      })
      this.$bvToast.toast('Заявка отклонена!', {
        variant: danger,
        solid: true
      })
    },

  },
  computed: {
    pendingEvents() {
      return this.$store.getters.filterEvents
    }
  },
  mounted() {
    this.$store.dispatch('filterEvents')
  }
}
</script>

<style scoped>
.alo {
  margin-left: 10%;
  margin-top: 100px;
  position: fixed;

}

</style>