<template>
  <b-modal
      :title="currentId != null ? 'Edit event' : 'Add event'"
      ok-title="Save"
      v-model="show"
      @ok="saveEvent">
    <form class="form-horizontal">
      <div class="form-group row">
        <label for="event-name" class="col-sm-2 control-label">Name</label>
        <div class="col-sm-10">
          <input id="event-name" type="text" class="form-control" v-model="currentName"/>
        </div>
      </div>
      <div class="form-group row">
        <label for="event-location" class="col-sm-2 control-label">Location</label>
        <div class="col-sm-10">
          <input id="event-location" type="text" class="form-control" v-model="currentLocation"/>
        </div>
      </div>
      <div class="form-group row">
        <label for="min-date" class="col-sm-2 control-label">Dates</label>
        <div class="col-sm-10">
          <div class="input-group input-daterange">
            <input id="min-date" type="date" class="form-control" v-model="currentStartDate"/>
            <div class="input-group-prepend input-group-append">
              <div class="input-group-text">to</div>
            </div>
            <input type="date" class="form-control" v-model="currentEndDate"/>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "modal",
  props:{},
  data() {
    return {
      show: true,
      currentId: null,
      currentStartDate: null,
      currentEndDate: null,
      currentName: null,
      currentLocation: null
    }
  },
  methods:{
    saveEvent() {
      this.$emit('saveEvent')
    }
  }
}
</script>

<style scoped>

</style>