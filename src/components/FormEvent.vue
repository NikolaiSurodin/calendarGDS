<template>
  <form class="form-horizontal" @submit="fireSaveEvent">
    <div class="form-group row required">
      <label for="event-name" class="col-sm-2 control-label">Вид</label>
      <div class="col-sm-10">
        <b-form-select
            v-model="event.currentKind"
            :options="kindOptions"
            class="mt-2"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
            required="required"
        ></b-form-select>
      </div>
    </div>
    <div class="form-group row required">
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
      <label for="min-date" class="col-sm-2 control-label">Даты</label>
      <div class="col-sm-10">
        <div class="input-group input-daterange">
          <input id="min-date"
                 type="date"
                 class="form-control"
                 v-model="event.currentStartDate"

          />
          <div class="input-group-prepend input-group-append">
            <div class="input-group-text">До</div>
          </div>
          <input type="date"
                 class="form-control"
                 v-model="event.currentEndDate"/>
        </div>
        <div class="form-group row mt-5 ">
          <label for="event-description" class="col-sm-2 control-label">Комментарий</label>
          <div class="col-sm-12">
            <b-textarea id="event-description"
                        v-model="event.currentDescription"
            >
            </b-textarea>
          </div>
        </div>
        <b-form-checkbox
            class="mt-5"
            v-model="event.currentRequest"
            value="true"
            unchecked-value="false"
        >
          Отправить заявку
        </b-form-checkbox>
        <p class="small">Вы подтверждаете, что даты определены точно</p>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: "FormEvent",
  props: {
    id: {
      required: true
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    busy: {
      type: Boolean,
      default: true
    },
    kind: {
      type: String,
    },
    request: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: false,
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
        {item: true, name: 'Недоступен для связи'},
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
.form-group.required .control-label:after {
  content:"*";
  color:red;
}
</style>