<template>
  <form class="form-horizontal">
    <div class="form-group row">
      <label for="event-name" class="col-sm-2 control-label">Name</label>
      <div class="col-sm-10">
        <input id="event-name" type="text" class="form-control" v-model="ev.currentName"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="event-location" class="col-sm-2 control-label">Location</label>
      <div class="col-sm-10">
        <input id="event-location" type="text" class="form-control" v-model="ev.currentLocation"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="min-date" class="col-sm-2 control-label">Dates</label>
      <div class="col-sm-10">
        <div class="input-group input-daterange">
          <input id="min-date" type="date" class="form-control" v-model="ev.currentStartDate"/>
          <div class="input-group-prepend input-group-append">
            <div class="input-group-text">to</div>
          </div>
          <input type="date" class="form-control" v-model="ev.currentEndDate"/>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "modal",
  props: ['id', 'startDate', 'endDate', 'name', 'location'],
  data() {
    return {
      ev : {
        currentId: this.id,
        currentStartDate: this.startDate,
        currentEndDate: this.endDate,
        currentName: this.name,
        currentLocation: this.location,
      },

    }
  },
  methods: {
    fireSaveEvent() {
      this.$emit('saveEvent', this.ev )
    }
  }
}
</script>

<style scoped>

</style>