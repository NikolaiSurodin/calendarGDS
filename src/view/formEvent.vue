<template>
  <div class="wrapper">
    <template>
      <my-navbar/>
    </template>

    <template>
      <div class="block mb-3">
        <h2> Заявка от : {{ event.title }}</h2>
      </div>
      <form class="form-signin">
        <label>Тип</label>
        <input type="text"
               class="form-control"
               disabled
               v-model="formRus.kind"
        >

        <label>Начало</label>
        <input type="text"
               class="form-control"
               disabled
               v-model="event.date_from"
        >
        <label>Конец</label>
        <input type="text"
               class="form-control"
               disabled
               v-model="event.date_to"
        >
        <label>Связь</label>
        <input type="text"
               v-model="formRus.busy"
               class="form-control"
               disabled
        >
        <label>Комментарий</label>
        <input type="text"
               v-model="event.comment"
               class="form-control"
               disabled
        >
        <label>Статус</label>
        <input type="text"
               class="form-control"
               disabled
               v-model="formRus.status"
        >
        <div class="btn">
          <div class="mt-5">
            <b-button variant="outline-success" @click="isOk" :disabled="disabledApproved()">Подтвердить</b-button>
            <b-button variant="outline-danger" @click="isCancel" :disabled="disabledRejected()">Отклонить</b-button>
            <b-button variant="outline-secondary" @click="toCalendar">Вернуться</b-button>
          </div>
        </div>
      </form>
    </template>
    <template>
      <my-footer/>
    </template>
  </div>
</template>

<script>
import MyNavbar from "@/components/myNavbar";
import MyFooter from "@/components/myFooter";

export default {
  name: "formEvent",
  components: {MyFooter, MyNavbar},
  data() {
    return {}
  },
  methods: {
    disabledApproved() {
      if (this.event.status === 'approved') {
        return true
      }
    },
    disabledRejected() {
      if (this.event.status === 'rejected') {
        return true
      }
    },
    isOk() {
      this.$store.dispatch('updateEvent', {
        value: {
          user: this.event.user.id,
          title: this.event.title,
          comment: this.event.description,
          date_from: this.event.date_from,
          date_to: this.event.date_to,
          busy: this.event.busy,
          kind: this.kind,
          request: this.event.request,
          status: 'approved'
        },
        id: this.event.id
      })
      this.$router.push('/calendar')
    },
    isCancel() {
      this.$store.dispatch('updateEvent', {
        value: {
          user: this.event.user.id,
          title: this.event.title,
          comment: this.event.description,
          date_from: this.event.date_from,
          date_to: this.event.date_to,
          busy: this.event.busy,
          kind: this.kind,
          request: this.event.request,
          status: 'rejected'
        },
        id: this.event.id
      })
      this.$router.push('/calendar')
    },
    toCalendar() {
      this.$router.push('/calendar')
    }
  },
  computed: {
    event() {
      return this.$store.getters.calendarState.find((e) => e.id === this.$route.params.id)
    },
    formRus() {
      return {
        busy: this.event.busy === true ? 'Не доступен' : 'Доступен для связи',
        kind: this.kind === 'vacation' ? 'Отпуск' : 'Отгул' ,
        request: this.event.request ,
        status: this.event.status === 'rejected' ? 'Отклонено' : 'Подтверждено'
      }
    }
  },

}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

form {
  display: block;
  margin-top: 0em;
}

.text-center {
  text-align: center !important;
}

h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

label {
  display: inline-block;
  margin-bottom: .5rem;
}

label {
  cursor: default;
}

.text-center {
  text-align: center !important;
}

.btn {
  margin-bottom: 20px;
  width: 100%;
}
</style>