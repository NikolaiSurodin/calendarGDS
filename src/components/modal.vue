<template>
  <form class="form-horizontal">
    <div class="form-group row">
      <label for="event-name" class="col-sm-2 control-label">Отупуск/Отгул</label>
      <div class="col-sm-10">
        <b-form-select
            v-model="event.currentKind"
            :options="kindOptions"
            class="mt-2"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
        ></b-form-select>
      </div>
    </div>
    <div class="form-group row">
      <label for="event-description" class="col-sm-2 control-label">Связь</label>
      <div class="col-sm-10">
        <b-form-select
            v-model="event.currentBusy"
            :options="busyOptions"
            class="mt-2"
            value-field="item"
            text-field="name"
            required
        ></b-form-select>
      </div>
    </div>
    <div class="form-group row">
      <label for="event-description" class="col-sm-2 control-label">Описание</label>
      <div class="col-sm-10">
        <input id="event-description" type="text" class="form-control" placeholder="Описание"
               v-model="event.currentDescription"/>
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
        <b-form-checkbox
            class="mt-5"
            v-model="event.currentRequest"
            id="checkbox-1"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
            required="required"
        >
          Отправить заявку
        </b-form-checkbox>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "modal",
  props: ['id', 'startDate', 'endDate', 'name', 'description', 'busy', 'kind', 'request'],
  data() {
    return {
      event: {
        currentId: this.id,
        currentStartDate: this.startDate,
        currentEndDate: this.endDate,
        currentName: this.kind,
        currentDescription: this.description,
        currentBusy: this.busy,
        currentKind: this.kind,
        currentRequest: this.request
      },
      busyOptions: [
        {item: false, name: 'Доступен для связи'},
        {item: true, name: 'Недоступен'},
      ],
      kindOptions: [
        {item: 'vacation', name: 'Отпуск'},
        {item: 'dayoff', name: 'Отгул'},
      ]
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