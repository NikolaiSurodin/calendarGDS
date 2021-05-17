<template>
  <div>
    <div class="popup_wrapper">
      <div class='popup'>
        <div class="header-content">
          <h1>ERROR</h1>
          <b-icon icon="exclamation-circle" style="width: 120px; height: 120px;"></b-icon>
        </div>
        <div class="popup__header">

        </div>
        <div class="popup__content">
          <div>
            <slot></slot>
          </div>
        </div>
        <div class="popup__footer">
          <div class="container">
            <div>
              <b-button variant="outline-warning" class="mt-5" @click="closePopup"
              > OK
              </b-button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messageError",
  data() {
    return {}
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    }
  }
}
</script>

<style scoped>
.popup_wrapper {
  background: rgba(64, 64, 64, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.popup {
  padding: 150px;
  position: center;
  top: 500px;
  width: 700px;
  background: linear-gradient(#e66465, #9198e5);
  box-shadow: 0 0 17px 0 #e7e7e7;
  z-index: 50;
}

.popup__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup__content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-content {
  text-align: center;
}

</style>