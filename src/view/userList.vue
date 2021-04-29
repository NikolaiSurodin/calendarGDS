<!--<template>-->
<!--  <div>-->
<!--    <div>-->
<!--      <v-toolbar-->
<!--          :height="64"-->
<!--      >-->
<!--        <v-toolbar-side-icon></v-toolbar-side-icon>-->
<!--        <v-toolbar-title>-->
<!--          <v-btn type="button"depressed small @click="toCalendar">-->
<!--            <span class="material-icons">event</span>-->
<!--          </v-btn>-->
<!--        </v-toolbar-title>-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-toolbar-items class="hidden-sm-and-down">-->
<!--          <v-btn>Link Two</v-btn>-->
<!--          <v-btn @click="logout">-->
<!--            Выйти-->
<!--          </v-btn>-->
<!--        </v-toolbar-items>-->
<!--      </v-toolbar>-->
<!--    </div>-->
<!--    <h3 class="title">Сотрудники компании.</h3>-->
<!--    <hr>-->
<!--    <div>-->
<!--      <v-content>-->
<!--        <v-data-table-->
<!--            :headers="headers"-->
<!--            :items="users"-->
<!--            class="elevation-1"-->
<!--        >-->
<!--          <template slot="items" slot-scope="props"-->
<!--          >-->
<!--            <td class="text-xs-left">{{ props.item.username }}-->
<!--            <td style="color: #19b505">{{ props.item.profile.first_name }} {{ props.item.profile.last_name}}</td>-->
<!--            <td class="text-xs-left"></td>-->
<!--            <td class="text-xs-left"></td>-->
<!--            <td class="text-xs-left">{{ props.item.profile.mobile ? props.item.profile.mobile : '-'}}</td>-->
<!--            <td class="text-xs-left">{{props.item.profile.state ? props.item.profile.state : '-' }}</td>-->
<!--            <td class="text-xs-left">{{props.item.profile.country}} {{props.item.profile.city ? props.item.profile.city : '-'}}</td>-->

<!--          </template>-->
<!--        </v-data-table>-->
<!--      </v-content>-->
<!--    </div>-->
<!--    <v-footer-->
<!--        :height="50"-->
<!--        :fixed="true"-->
<!--        :color="'grey'"-->
<!--    >-->
<!--      <v-flex-->
<!--          primary-->
<!--          lighten-2-->
<!--          py-3-->
<!--          text-xs-center-->
<!--          white&#45;&#45;text-->
<!--          xs12-->
<!--      >-->
<!--        &copy; 2021 — <strong>GDS</strong>-->
<!--      </v-flex>-->
<!--    </v-footer>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: "userList",-->
<!--  data() {-->
<!--    return {-->
<!--      headers: [-->
<!--        {text: 'User name', value: 'username'},-->
<!--        {-->
<!--          text: 'Имя Фамилия',-->
<!--          align: 'left',-->
<!--          sortable: false,-->
<!--          value: 'name'-->
<!--        },-->
<!--        {text: 'Email', value: 'Email'},-->

<!--        {text: 'День рождение', value: 'birthday'},-->
<!--        {text: 'Телефон', value: 'mobile'},-->
<!--        {text: 'Должность', value: 'state'},-->
<!--        {text: 'Страна, город', value: 'country'}-->
<!--      ],-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    toCalendar() {-->
<!--      this.$router.push('/calendar')-->
<!--    },-->
<!--    logout(){-->
<!--      this.$root.$emit('logout')-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    users() {-->
<!--      return this.$store.getters.users-->

<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.$store.dispatch('allUsers')-->

<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.title {-->
<!--  text-align: center;-->
<!--  margin-top: 50px;-->
<!--  margin-bottom: 40px;-->
<!--}-->
<!--</style>-->
