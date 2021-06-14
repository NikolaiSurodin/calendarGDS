<template>
  <div>
    <div>
      <the-navbar
      @toCalendar="toCalendar"
      />
    </div>
    <h3 class="title">Сотрудники компании.</h3>
    <img class="mb-4"
         src="../assets/logoGDS.png"
         alt width="240"
         height="105">
    <hr>
    <div class="overflow-auto">
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
      ></b-pagination>

      <p class="mt-3">Страница: {{ currentPage }}</p>

      <b-table
          :items="users"
          :per-page="perPage"
          :current-page="currentPage"
          small
      ></b-table>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar"

export default {
  name: "userList",
  components: {TheNavbar},
  data() {
    return {
      perPage: 5,
      currentPage: 1,
    }
  },
  methods: {

    toCalendar() {
      this.$router.push('/calendar')
    },
    logout(){
      this.$root.$emit('logout')
    }
  },
  computed: {
    users() {
     return this.$store.getters.users.map((u) => ({
       user:u.username,
       name:u.profile?.first_name,
       last_name:u.profile?.last_name,
       mobile:u.profile?.mobile,
       city:u.profile?.city,
       country:u.profile?.country
     }))
    },
    rows() {
      return this.users.length
    }
  },
  mounted() {
    this.$store.dispatch('allUsers')
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 40px;
}
</style>
