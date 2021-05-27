<template>
  <div>
    <div class="popup_wrapper">
      <div class='popup'>
        <div class="header-content">
          <b-avatar size="4em" variant="primary">{{avatarText}}</b-avatar>
          <h1>
            {{ user.profile.first_name }} {{ user.profile.last_name }}
          </h1>
          <h5>{{ user.email }}</h5>
        </div>
        <div class="popup__header">
          <slot></slot>
        </div>
        <div class="popup__content">
          <div>
            <div class="right">
            </div>
          </div>
        </div>
        <div class="popup__footer">
          <div class="container">
            <div class="mb-3">
              <b-button class="mr-2" variant="outline-success" @click="ToUserProfile"
              > Редактировать профиль
              </b-button>
              <b-button variant="outline-dark" @click="closeProfile"
              > Закрыть
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
  name: "profile",
  data() {
    return {
      error: false,
    }
  },
  methods: {
    closeProfile() {
      this.$emit('closeProfileInfo')
    },
    ToUserProfile() {
      this.$router.push(`/edit_profile/${this.user.id}`)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    avatarText() {
      return this.user.AvatarText
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
  position: fixed;
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
  background: whitesmoke;
  box-shadow: 0 0 30px 0 #454343;

  display: inline;
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