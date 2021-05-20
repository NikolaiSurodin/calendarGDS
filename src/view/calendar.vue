<template>
  <div>
    <template>
      <my-navbar
          :user="user.username"
          @toProfile="showProfile = !showProfile"
      />
    </template>

    <template>
      <events-log
          :events="events"
      />
    </template>
    <template v-if="!superUser">

      <events-table/>

    </template>

    <template>
      <Calendar v-if="loggedIn"
                id="calendar"
                language="ru"
                :enable-range-selection="true"
                :data-source="calendarRecords"
                :enable-context-menu="true"
                :context-menu-items="contextMenuItems"
                :display-week-number="displayWeekNumber"
                @select-range="selectRange"
                @render-end="renderEnd"
                @day-context-menu="dayContextMenu"
                :class="'calendar-center'">

      </Calendar>
    </template>

    <b-modal v-model="show"
             :title="currentId !== null ? 'Редактировать' : 'Оставить заявку на отпуск/отгул'"
             ok-title="Сохранить"
             cancel-title="Отмена"
             @ok="fireFormSave">
      <modal
          :show="true"
          :id="currentId"
          :end-date="currentEndDate"
          :description="currentDescription"
          :start-date="currentStartDate"
          :name="currentName"
          @saveEvent="saveEvent"
          ref="form"
      />
    </b-modal>

    <template>
      <profile
          v-if="showProfile"
          @closeProfileInfo="closeProfileInfo"
      >
      </profile>
    </template>
    <div>
    </div>
  </div>
</template>

<script>
import Calendar from "v-year-calendar"
import 'v-year-calendar/locales/v-year-calendar.ru'
import profile from "@/view/profile"
import modal from "@/components/modal"
import MyNavbar from "@/components/myNavbar"
import EventsLog from "@/components/eventsLog"
import EventsTable from "@/view/eventsTable"

export default {
  name: "calendar",
  components: {
    EventsTable,
    EventsLog,
    MyNavbar,
    modal,
    Calendar,
    profile,
  },
  data() {
    return {
      date: '',
      showProfile: false,
      show: false,
      currentId: null,
      currentStartDate: null,
      currentEndDate: null,
      currentName: null,
      currentBusy: null,
      currentKind: null,
      currentRequest: null,
      currentDescription: null,
      displayWeekNumber: true,
      events: [],
      dataSource: [],
      contextMenuItems: [
        {
          text: "Редактировать",
          click: evt => {
            this.currentId = evt.id;
            this.currentStartDate = evt.startDate.toISOString().substring(0, 10);
            this.currentEndDate = evt.endDate.toISOString().substring(0, 10);
            this.currentName = evt.name;
            this.currentDescription = evt.details;
            this.show = true;
          }
        },
        {
          text: "Удалить",
          click: evt => {
            this.$store.dispatch('deleteRecords', {id: evt.id})
          }
        }
      ]
    }
  },
  methods: {
    closeProfileInfo() {
      this.showProfile = false
    },
    logout() {
      this.$root.$emit('logout')
    },
    selectRange(e) {
      this.currentId = null;
      this.currentName = null;
      this.currentDescription = null;
      this.currentStartDate = e.startDate.toISOString().substring(0, 10);
      this.currentEndDate = e.endDate.toISOString().substring(0, 10);
      this.show = true;
    },
    fireFormSave() {
      this.$refs.form.fireSaveEvent()
    },
    //event - объект - событие
    saveEvent(event) {
      if (this.currentId === null) {
        // Добавление события
        this.$store.dispatch('saveEvents', {
          // посылаем всего юзера, прям объект
          user: this.user,
          title: event.currentKind,
          comment: event.currentDescription,
          date_from: this.currentStartDate,
          date_to: this.currentEndDate,
          id: event.currentId,
          busy: event.currentBusy,
          kind: event.currentKind,
          request:event.currentRequest
        })
      } else {
        // Обновление события
        this.$store.dispatch('updateEvent', {
          value: {
            user: this.user.id,
            title: event.currentKind,
            comment: event.currentDescription,
            date_from: event.currentStartDate,
            date_to: event.currentEndDate,
            busy: event.currentBusy,
            kind: event.currentKind,
            request:event.currentRequest
          },
          id: event.currentId
        })
      }
    },
    //event - объект - событие
    dayContextMenu(event) {
      let ev = event.events
      this.events = []
      if (!this.events.length) {
        for (let i of ev) {
          this.events.push(`В дату: ${event.date.toLocaleDateString()}  - ${i.name} - ${i.user}`)
        }
      }
    },
    renderEnd(event) {
      this.events = []
      this.events.push(`Текущий год: ${event.currentYear}`)
    }
  },
  computed: {
    calendarRecords() {
      return this.$store.getters.events.map(r => {
        return {
          startDate: new Date(r.date_from),
          endDate: new Date(r.date_to),
          name: r.title === 'vacation' ? 'Отпуск' : 'Отгул',
          details: r.comment,
          id: r.id,
          user: r.user.profile?.last_name
        }
      })
    },
    user() {
      return this.$store.getters.user
    },
    loggedIn() {
      return this.$store.getters.isLoggedIn
    },
    superUser() {
      return this.$store.getters.isSuperUser
    }
  },
  mounted() {
    this.$store.dispatch('getRecords')
    this.$store.dispatch('infoUser')
    this.$root.$on('save', () => {
      this.$store.dispatch('infoUser')
    })
  },
  beforeMount() {
    this.$store.dispatch('isSuperUser')
  }
}
</script>


<style scoped>
.calendar-center {
  width: 55%;
  display: block;
  margin-left: 50px;
}

</style>