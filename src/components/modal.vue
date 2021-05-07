<template>
  <form class="form-horizontal">
    <div class="form-group row">
      <label for="event-name" class="col-sm-2 control-label">ФИО Отупуск/Отгул</label>
      <div class="col-sm-10">
        <input id="event-name" type="text" class="form-control" placeholder="ФИО: Отупуск/Отгул" v-model="event.currentName"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="event-location" class="col-sm-2 control-label">Описание</label>
      <div class="col-sm-10">
        <input id="event-location" type="text" class="form-control" placeholder="Описание" v-model="event.currentDescription"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="min-date" class="col-sm-2 control-label">Даты</label>
      <div class="col-sm-10">
        <div class="input-group input-daterange">
          <input id="min-date" type="date" class="form-control" v-model="event.currentStartDate"/>
          <div class="input-group-prepend input-group-append">
            <div class="input-group-text">До</div>
          </div>
          <input type="date" class="form-control" v-model="event.currentEndDate"/>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "modal",
  props: ['id', 'startDate', 'endDate', 'name', 'description'],
  data() {
    return {
      event: {
        currentId: this.id,
        currentStartDate: this.startDate,
        currentEndDate: this.endDate,
        currentName: this.name,
        currentDescription: this.description,
      },
    }
  },
  methods: {
    fireSaveEvent() {
      this.$emit('saveEvent', this.event)
    }
  }
}
</script>

<style scoped>

</style>