<template>
      <form class="form" @submit.prevent="updateUser">
        <label for="inputUserName" class="row-sm-2 control-label m-0">Имя пользователя</label>
        <input type="text"
               id="inputUserName"
               class="form-control"
               placeholder="Имя пользователя"
               required
               autofocus
               v-model="user.username"
               :class="$v.user.username.$error ? 'is-invalid' : '' "
        >
        <label for="inputName" class="row-sm-2 control-label m-0">Имя</label>
        <input type="text"
               id="inputName"
               class="form-control"
               placeholder="Имя"
               required
               v-model="user.profile.first_name"
               :class="$v.user.profile.first_name.$error ? 'is-invalid' : '' "
        >
        <p v-if="!isValidName" class="invalid-feedback">Не более 10 символов</p>

        <label for="inputLastName" class="row-sm-2 control-label m-0">Фамилия</label>
        <input type="text"
               id="inputLastName"
               class="form-control"
               placeholder="Фамилия"
               required
               v-model="user.profile.last_name"
               :class="$v.user.profile.last_name.$error ? 'is-invalid' : '' "
        >
        <p v-if="!isValidLastName" class="invalid-feedback">Не более 10 символов</p>

        <label for="inputEmail" class="row-sm-2 control-label m-0">Почта</label>
        <input type="email"
               id="inputEmail"
               class="form-control"
               placeholder="Email"
               required autofocus
               v-model="user.email"
               :class="$v.user.email.$error ? 'is-invalid' : '' "
        >

        <p v-if="!isValidEmail" class="invalid-feedback">Некорректный email</p>

        <label for="inputMobile" class="row-sm-2 control-label m-0">Телефон</label>
        <input type="number"
               id="inputMobile"
               class="form-control"
               placeholder="Телефон"
               required
               v-model="user.profile.mobile"
               :class="$v.user.profile.mobile.$error ? 'is-invalid' : '' "
        >
        <p v-if="!isValidMobile" class="invalid-feedback">Неверный номер</p>

        <label for="inputBirthday" class="row-sm-2 control-label m-0">День Рождения</label>
        <input type="text"
               id="inputBirthday"
               class="form-control"
               placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ"
               required
               v-model="user.birthday"
               :class="$v.user.birthday.$error ? 'is-invalid' : '' "
        >

          <label for="inputCountry" class="row-sm-2 control-label m-0 control-label">Страна</label>
          <input type="text"
                 id="inputCountry"
                 class="form-control"
                 placeholder="Страна"
                 v-model="user.profile.country"
          >
        <div class="btn">
          <b-button variant="light" @click="expandedInfoFields">
            {{ expand ? 'Скрыть' : 'Дополнительная информация' }}
          </b-button>
          <div v-show="expand">

            <label for="inputCity" class="row-sm-2 control-label m-0">Город</label>
            <input type="text"
                   id="inputCity"
                   class="form-control"
                   placeholder="Город"
                   v-model="user.profile.city"
            >

            <label for="inputState" class="row-sm-2 control-label m-0">Должность</label>
            <input type="text"
                   id="inputState"
                   class="form-control"
                   placeholder="Должность"
                   v-model="user.profile.state"
                   :class="$v.user.profile.state.$error ? 'is-invalid' : '' "
            >
            <p v-if="!isValidState" class="invalid-feedback">Обязательное поле</p>

            <label class="row-sm-2 control-label m-0">Описание</label>
            <textarea type="text"
                      id="description"
                      class="form-control"
                      placeholder="Описание"
                      v-model="user.profile.description"
            />
          </div>
          <div class="mt-3">
            <b-button variant="outline-success" type="submit">Отредактировать</b-button>
            <b-button variant="outline-danger" class="mb-3" type="button" @click="cancel">Отмена</b-button>
          </div>
        </div>
      </form>

</template>

<script>

import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: "formUser",
  props: {
    userName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    userBirthday: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userMobile: {
      type: String,
      required: true
    },
    userCity: {
      type: String,
      required: true
    },
    userState: {
      type: String,
      required: true
    },
    userDescription: {
      type: String,
      required: true
    },
    userCountry: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      expand: false,
      user: {
        username: this.userName,
        birthday: this.userBirthday,
        email: this.userEmail,
        profile: {
          mobile: this.userMobile,
          last_name: this.lastName,
          first_name: this.firstName,
          country: this.userCountry,
          description: this.userDescription,
          city: this.userCity,
          state: this.userState,
        }
      }
    }
  },
  validations: {
    user: {
      username: {required},
      email: {email},
      birthday: {required},
      profile: {
        first_name: {maxLength: maxLength(10)},
        last_name: { maxLength: maxLength(10)},
        mobile: { maxLength: maxLength(11), minLength: minLength(11)},
        state: {required}
      }
    }
  },
  methods: {
    expandedInfoFields() {
      this.expand = !this.expand
    },
    updateUser() {
      this.$v.user.$touch()
      if (!this.$v.$error) {
        this.$emit('updateUser', this.user)
      }
    },
    cancel() {
      this.$emit('cancel')
    }
  },
  computed:{
    isValidName($v) {
      return $v.user.profile.first_name.$dirty && !$v.user.profile.first_name.maxLength
    },
    isValidLastName($v) {
      return $v.user.profile.last_name.$dirty && !$v.user.profile.last_name.maxLength
    },
    isValidEmail($v) {
      return $v.user.email.$dirty && !$v.user.email.email
    },
    isValidMobile($v) {
      return $v.user.profile.mobile.$dirty && !$v.user.profile.mobile.maxLength && !$v.user.profile.mobile.minLength
    },
    isValidState($v) {
      return $v.user.profile.state.$dirty && !$v.user.profile.state.required
    }
  }

}


</script>

<style scoped>
.form {
  max-width: 350px;
  padding: 15px;
  margin: auto;
  margin-top: 50px;
}
.btn {
  margin-bottom: 15px;
  width: 100%;
}

</style>