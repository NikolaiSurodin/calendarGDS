<template>
  <div>
    <template>
      <the-navbar
          :user="user.username"
          @toProfile="showProfile = !showProfile"
      />
    </template>
    <div class="mt-5 p-1">
      <template v-if="!isSuperUser">

        <request-events-table/>

      </template>

      <template>

        <user-events-table/>

      </template>
    </div>
    <div class="row">
      <template class="col-md-9">
        <events-list-on-day :events="events"

        >

        </events-list-on-day>
      </template>

      <template>
        <Calendar v-if="loggedIn"
                  id="calendar"
                  language="ru"
                  class="col-md-7 ml-5"
                  :enable-range-selection="true"
                  :data-source="calendarRecords"
                  :enable-context-menu="true"
                  :context-menu-items="contextMenuItems"
                  :display-week-number="displayWeekNumber"
                  :render-style="style"
                  @select-range="selectRange"
                  @render-end="renderEnd"
                  @day-context-menu="dayContextMenu"

        />

      </template>
    </div>
    <b-modal v-model="show"
             :title="titleModalEvent"
             ok-title="Сохранить"
             cancel-title="Отмена"
             @ok="fireFormSave">
      <form-event
          :id="currentId"
          :end-date="currentEndDate"
          :description="currentDescription"
          :start-date="currentStartDate"
          @saveEvent="saveEvent"
          ref="form"
      />
    </b-modal>
    <div>
    </div>
  </div>
</template>

<script>
import Calendar from "v-year-calendar"
import 'v-year-calendar/locales/v-year-calendar.ru'

import FormEvent from "@/components/FormEvent"
import TheNavbar from "@/components/TheNavbar"
import UserEventsTable from "@/view/UserEventsTable"
import RequestEventsTable from "@/view/RequestEventsTable"
import EventsListOnDay from "@/view/EventsListOnDay";


export default {
  name: "AppCalendar",
  components: {
    EventsListOnDay,
    RequestEventsTable,
    UserEventsTable,
    TheNavbar,
    FormEvent,
    Calendar
  },
  data() {
    return {
      style: 'background',
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
        // {
        //   text: "Редактировать",
        //   click: evt => {
        //     this.currentId = evt.id;
        //     this.currentStartDate = evt.startDate.toISOString().substring(0, 10);
        //     this.currentEndDate = evt.endDate.toISOString().substring(0, 10);
        //     this.currentName = evt.name;
        //     this.currentDescription = evt.details;
        //     this.show = true;
        //   }
        // },
        {
          text: "Удалить",
          click: evt => {
            this.$store.dispatch('deleteRecords', {id: evt.id})
                .catch((error) => {
                  this.$bvToast.toast('Ошибка! Невозможно удалить событие', {
                    title: `${error}`,
                    solid: true
                  })
                })
          }
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$root.$emit('logout')
    },
    selectRange(e) {
      this.currentId = null
      this.currentName = null
      this.currentDescription = null
      this.currentStartDate = e.startDate.toISOString().substring(0, 10)
      this.currentEndDate = e.endDate.toISOString().substring(0, 10)
      if (this.currentStartDate >= new Date().toISOString().substring(0, 10)) {
        this.show = true
      } else {
        this.$bvToast.toast('Время прошло.. надо было раньше.. ', {
          title: 'Ошибка',
          solid: true
        })
      }
    },
    fireFormSave() {
      this.$refs.form.fireSaveEvent()
    },
    //event - объект - событие
    saveEvent(event) {
      if (this.currentId === null) {
        // Добавление события
        this.$store.dispatch('saveEvents', {
          //посылаем всего юзера, прям объект
          user: this.user,
          title: event.currentKind,
          comment: event.currentDescription,
          date_from: this.currentStartDate,
          date_to: this.currentEndDate,
          id: event.currentId,
          busy: event.currentBusy,
          kind: event.currentKind,
          request: event.currentRequest
        })
            .then(() => {
              this.$bvToast.toast('Отлично! Ваша заявка принята к рассмотрению', {
                title: 'Принято к рассмотрению',
                solid: true,
              })
            })
            .catch((error, danger = null) => {
              this.$bvToast.toast('Ошибка! Событие не добавлено', {
                title: 'Ошибка',
                variant: danger,
                solid: true
              })
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
            request: event.currentRequest
          },
          id: event.currentId
        })
            .catch((error) => {
              this.$bvToast.toast('Упс.. Событие не обновлено..', {
                title: `${error}`,
                solid: true
              })
            })
      }
    },
    //event - объект - событие
    //метод для показа в evensListOnDay
    dayContextMenu(event) {
      let events = event.events
      this.events = []
      let date = new Date(event.date).toLocaleDateString('ru-RU')
      if (!this.events.length) {
        for (let event of events) {
          this.events.push(` ${date}  - ${event.user} ${event.name} `)
        }
      }
    },
    renderEnd(event) {
      this.events = []
      this.events.push(`Текущий год: ${event.currentYear}`)
    }
  },
  computed: {
    titleModalEvent() {
      return this.currentId !== null ? `Редактировать ${this.currentName}` : 'Оставить заявку'
    },
    calendarRecords() {
      return this.$store.getters.getEvents.map(r => {
        return {
          startDate: new Date(r.date_from),
          endDate: new Date(r.date_to),
          name: r.title === 'vacation' ? 'Отпуск' : 'Отгул',
          details: r.comment,
          id: r.id,
          user: r.user.profile?.last_name,
          status: r.status,
          color: r.status === 'approved' ? '#99f187' : '#cacef3'
        }
      })
    },
    user() {
      return this.$store.getters.user
    },
    loggedIn() {
      return this.$store.getters.isLoggedIn
    },
    isSuperUser() {
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

</style>