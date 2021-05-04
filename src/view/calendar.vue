<template>
  <div>
    <div>
      <my-navbar
          :user="user.username"
          @toProfile="showProfile = !showProfile"
      />
    </div>
    <div>
      <div>
        <events-log
            :events="events"
        />
      </div>
      <Calendar v-if="loggedIn"
                language="ru"
                :enable-range-selection="true"
                :data-source="getEvents"
                :enable-context-menu="true"
                :context-menu-items="contextMenuItems"
                @select-range="selectRange"
                id="calendar"
                @click-day="clickDay"
                @render-end="renderEnd"
      >
      </Calendar>
    </div>
    <b-modal v-model="show"
             :title="currentId != null ? 'Редактировать событие' : 'Добавьте событие'"
             ok-title="Сохранить"
             cancel-title="Отмена"
             @ok="fireFormSave">
      <modal
          :show="true"
          :id="currentId"
          :end-date="currentEndDate"
          :location="currentDescription"
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
import modal from "@/components/modal";
import MyNavbar from "@/components/myNavbar";
import EventsLog from "@/components/eventsLog";

var currentYear = new Date().getFullYear();
export default {
  name: "calendar",
  components: {
    EventsLog,
    MyNavbar,
    modal,
    Calendar,
    profile,
  },
  data() {
    return {
      showProfile: false,
      show: false,
      currentId: null,
      currentStartDate: null,
      currentEndDate: null,
      currentName: null,
      currentDescription: null,
      events: [],
      dataSource: [
        {
          id: 0,
          name: 'Отпуск Суродин Н.С.',
          description: 'San Francisco, CA',
          startDate: new Date(currentYear, 4, 28),
          endDate: new Date(currentYear, 4, 29)
        },
        {
          id: 1,
          name: 'Отпуск Старкова А.С',
          description: 'San Francisco, CA',
          startDate: new Date(currentYear, 4, 28),
          endDate: new Date(currentYear, 4, 29)
        }
      ],
      contextMenuItems: [
        {
          text: "Редактировать",
          click: evt => {
            this.currentId = evt.id;
            this.currentStartDate = evt.startDate.toISOString().substring(0, 10);
            this.currentEndDate = evt.endDate.toISOString().substring(0, 10);
            this.currentName = evt.name;
            this.currentDescription = evt.description;
            this.show = true;
          }
        },
        {
          text: "Удалить",
          click: evt => {
            this.dataSource = this.dataSource.filter(item => item.id !== evt.id);
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
      if (this.currentId == null) {
        // Добавление события
        this.$store.dispatch('saveRecords', {
          user: this.user.id,
          title: event.currentName,
          comment: event.currentDescription,
          busy: true,
          date_from: this.currentStartDate,
          date_to: this.currentEndDate,
        })
      } else {
        // Update event
        // var index = this.dataSource.findIndex(c => c.id === this.currentId);
        // this.dataSource[i].startDate = this.currentStartDate;
        // this.dataSource[i].endDate = this.currentEndDate;
        // this.dataSource[i].name = this.currentName;
        // this.dataSource[i].location = this.currentLocation;
      }
    },
    //event - объект - событие
    clickDay(event) {
      let ev = event.events
      this.events = []
      if (!this.events.length) {
        for (let i of ev) {
          this.events.push(`В дату: ${event.date.toLocaleDateString()}  - ${i.name}`)
        }
      }
    },
    renderEnd(event) {
      this.events.push(`Текущий год: ${event.currentYear}`);
    },
    getEvents() {
      this.$store.dispatch('getRecords')
          .then(res => {
            const events = res.data.data
            if (events){
              return events.map(r => ({
                startDate: r.date_to,
                endDate: r.date_from,
                name: r.title,
                details: r.comment
              }))
            }
          })

    },
    //автор :
    // getDataSource: function (year) {
    //   return fetch(`https://api.github.com/search/issues?q=repo:Paul-DS/bootstrap-year-calendar%20created:${year}-01-01..${year}-12-31`)
    //       .then(result =>
    //
    //           console.log(result.json()))
    //       .then(result => {
    //         if (result.items) {
    //           return result.items.map(r => ({
    //             startDate: new Date(r.created_at),
    //             endDate: new Date(r.created_at),
    //             name: '#' + r.number + ' - ' + r.title,
    //             details: r.comments + ' comments'
    //           }));
    //         }
    //         return [];
    //       });
    // }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    loggedIn() {
      return this.$store.getters.isLoggedIn
    },
    superUser() {
      return this.$store.getters.isSuperUser
    },
  },
  mounted() {
    this.$store.dispatch('infoUser')
    this.$root.$on('save', () => {
      this.$store.dispatch('infoUser')
    })
  },

  beforeMount() {

    this.$store.dispatch('isSuperUser')
  },
}
</script>


<style scoped>

</style>