<template>
  <div>
    <div>
      <v-toolbar
          :height="64"
      >
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link type="button" depressed small to="/calendar">
            <span class="material-icons">event</span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn>Link Two</v-btn>
          <v-btn @click="logout">
            Выйти
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <div>
      <div id="events-log">
        <h3>Events</h3>
        <div v-for="(event,id) in events"
        :key="id"
        >{{ event }}</div>
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
                @year-changed="yearChanged"
      >
      </Calendar>
    </div>
    <modal
       :show="show"
       :current-end-date="currentEndDate"
       :current-id="currentId"
       :current-location="currentLocation"
       :current-name="currentName"
       :current-start-date="currentStartDate"
        @saveEvent="saveEvent"
    >

    </modal>
    <v-btn type="button" @click="showProfile = !showProfile">
      <i class="material-icons">account_circle</i>Profile
    </v-btn>
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

console.log(Calendar)
var currentYear = new Date().getFullYear();
export default {
  name: "calendar",
  components: {
    modal,
    Calendar,
    profile,
  },
  props: {},
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
          name: 'Google I/O',
          location: 'San Francisco, CA',
          startDate: new Date(currentYear, 4, 28),
          endDate: new Date(currentYear, 4, 29)
        }],

      contextMenuItems: [
        {
          text: "Update",
          click: evt => {
            this.currentId = evt.id;
            this.currentStartDate = evt.startDate.toISOString().substring(0, 10);
            this.currentEndDate = evt.endDate.toISOString().substring(0, 10);
            this.currentName = evt.name;
            this.currentLocation = evt.location;
            this.show = true;
          }
        },
        {
          text: "Delete",
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
    saveEvent() {
      if (this.currentId == null) {
        // Add event
        var id = Math.max(...this.state.dataSource.map(evt => evt.id)) + 1;

        this.dataSource.push({
          id: id,
          startDate: this.currentStartDate,
          endDate: this.currentEndDate,
          name: this.currentName,
          location: this.currentLocation,
        });
      } else {
        // Update event
        // var index = this.dataSource.findIndex(c => c.id === this.currentId);
        // this.dataSource[i].startDate = this.currentStartDate;
        // this.dataSource[i].endDate = this.currentEndDate;
        // this.dataSource[i].name = this.currentName;
        // this.dataSource[i].location = this.currentLocation;
      }
    }, clickDay(e) {
     let ev = e.events.find((e) => e )
      this.events.push(`В дату: ${e.date.toLocaleDateString()}  - ${ev?.name}`);

    },
    // dayContextMenu(e) {
    //   this.events.push(`Right-click on day: ${e.date.toLocaleDateString()} (${e.events.length} events)`);
    // },
    renderEnd(e) {
      this.events.push(`Render end: ${e.currentYear}`);

    },
    yearChanged(e) {
      this.events.push(`Year changed: ${e.currentYear}`);
    }

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
#events-log {
  display: inline-block;
  vertical-align: top;
  width: 340px;
  background-color: #e5e5e5;
  padding: 10px;
  min-height: 200px;
  border-radius: 10px;
}

#events-log div {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
}
</style>