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
      <Calendar language="ru"
                :enable-range-selection="true"
                :data-source="dataSource"
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
             :title="currentId != null ? 'Edit event' : 'Add event'"
             ok-title="Save"
             @ok="fireFormSave">
      <modal
          ref="form"
          :show="true"
          :id="currentId"
          :end-date="currentEndDate"
          :location="currentLocation"
          :start-date="currentStartDate"
          :name="currentName"
          @saveEvent="saveEvent"
      />
    </b-modal>
    <template>
      <profile
          v-if="showProfile"
          @closeProfileInfo="closeProfileInfo"
      >
      </profile>
    </template>
  </div>
</template>

<script>
import Calendar from "v-year-calendar"
import 'v-year-calendar/locales/v-year-calendar.ru'
import profile from "@/view/profile"
import modal from "@/components/modal";
import MyNavbar from "@/components/myNavbar";
import EventsLog from "@/components/eventsLog";

console.log(Calendar)
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
      currentLocation: null,
      events: [],
      dataSource: [
        {
          id: 0,
          name: 'Отпуск Суродин Н.С.',
          location: 'San Francisco, CA',
          startDate: new Date(currentYear, 4, 28),
          endDate: new Date(currentYear, 4, 29)
        },
        {
          id: 1,
          name: 'Отпуск Старкова А.С',
          location: 'San Francisco, CA',
          startDate: new Date(currentYear, 4, 28),
          endDate: new Date(currentYear, 4, 29)
        }
      ],

      contextMenuItems: [
        {
          text: "Редактировать",
          click: evt => {
            console.log(evt.name)
            this.currentId = evt.id;
            this.currentStartDate = evt.startDate.toISOString().substring(0, 10);
            this.currentEndDate = evt.endDate.toISOString().substring(0, 10);
            this.currentName = evt.name;
            this.currentLocation = evt.location;
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
      this.currentLocation = null;
      this.currentStartDate = e.startDate.toISOString().substring(0, 10);
      this.currentEndDate = e.endDate.toISOString().substring(0, 10);
      this.show = true;
    },
    fireFormSave() {
      this.$refs.form.fireSaveEvent()
    },
    saveEvent() {
      if (this.currentId == null) {
        // Add event
        // var id = Math.max(...this.state.dataSource.map(evt => evt.id)) + 1;
        // this.dataSource.push({
        //   id: id,
        //   startDate: this.currentStartDate,
        //   endDate: this.currentEndDate,
        //   name: this.currentName,
        //   location: this.currentLocation,
        this.$store.dispatch('saveRecords', {
          user: this.user.id,
          title: this.currentName,
          comment: this.currentLocation,
          status: 's',
          //тип события (daysoff, vacation)
          kind: 's',
          busy: true,
          request: true,
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
    clickDay(e) {
      let ev = e.events
      this.events = []
      if (!this.events.length) {
        for (let i of ev) {
          this.events.push(`В дату: ${e.date.toLocaleDateString()}  - ${i.name}`)
        }
      }
    },
    renderEnd(e) {
      this.events.push(`Текущий год: ${e.currentYear}`);
    },
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
/*#events-log {*/
/*  display: inline-block;*/
/*  vertical-align: top;*/
/*  width: 340px;*/
/*  background-color: #e5e5e5;*/
/*  padding: 10px;*/
/*  min-height: 200px;*/
/*  border-radius: 10px;*/
/*}*/

/*#events-log div {*/
/*  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;*/
/*  font-size: 14px;*/
/*  line-height: 1.4;*/
/*}*/
</style>