<template>
  <div class="wrapper">
    <template>
      <div class="block mb-3">

      </div>
      <form class="form-signin">

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
            <b-button variant="outline-success" @click="approved" :disabled="disabledApproved()">Подтвердить</b-button>
            <b-button variant="outline-danger" @click="rejected" :disabled="disabledRejected()">Отклонить</b-button>
            <b-button variant="outline-secondary" @click="toCalendar">Вернуться</b-button>
          </div>
        </div>
      </form>
    </template>
  </div>
</template>

<script>

export default {
  name: "formEvent",
  data() {
    return {

    }
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
    approved() {
      this.$store.dispatch('updateEvent', {
        value: {
          status: 'approved'
        },
        id: this.event.id
      })
      this.$router.push('/calendar')
    },
    rejected() {
      this.$store.dispatch('updateEvent', {
        value: {
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
      return this.$store.getters.events.find((e) => e.id === this.$route.params.id)
    },
    formRus() {
      return {
        busy: this.event.busy === true ? 'Недоступен' : 'Доступен для связи',
        kind: this.kind  === 'vacation' ? 'Отгул' : 'Отпуск' ,
        request: this.event.request ,
        status: this.event.status
      }
    }
  }

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
  margin-top: 0;
}

.text-center {
  text-align: center !important;
}

h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0;
  margin-inline-end: 0;
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