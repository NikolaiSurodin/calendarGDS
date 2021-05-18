<template>
  <div class="wrapper">

    <slot>

    </slot>
    <div class="btn">
      <div class="mt-5">
        <b-button variant="outline-success" @click="approved" :disabled="disabledApproved()">Подтвердить</b-button>
        <b-button variant="outline-danger" @click="rejected" :disabled="disabledRejected()">Отклонить</b-button>
        <b-button variant="outline-secondary" @click="toCalendar">Вернуться</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "eventAppove",
  props:['busy', 'comment', 'status'],
  data() {
    return {

    }
  },
  methods:{
    close() {
      this.$emit('close')
    },
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
      return this.$store.getters.calendarState
    }
  },
  mounted() {
    this.$store.dispatch('getRecords')
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
.wrapper{
  background: rgba(64, 64, 64, .4);
  display: block;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>