<template>
  <div class="wrapper">
    <div>
      <div class="block">
        <p>Общее</p>
      </div>
      <form class="form-signin">
        <label for="event-name" class="row-sm-2 control-label m-0">Имя пользователя</label>
        <input type="text"
               id="inputUserName"
               class="form-control"
               placeholder="Имя пользователя"
               required autofocus v-model="user.username"
               :class="$v.user.username.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.username.$dirty && !$v.user.username.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>
        <label for="event-name" class="row-sm-2 control-label m-0">Имя</label>
        <input type="text"
               id="inputName"
               class="form-control"
               placeholder="Имя"
               required v-model="user.profile.first_name"
               :class="$v.user.profile.first_name.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.profile.first_name.$dirty && !$v.user.profile.first_name.required" class="invalid-feedback">
          Обязательное поле</p>
        <p v-if="$v.user.profile.first_name.$dirty && !$v.user.profile.first_name.maxLength" class="invalid-feedback">Не
          более 10
          символов</p>

        <label for="event-name" class="row-sm-2 control-label m-0">Фамилия</label>
        <input type="text"
               id="inputLastName"
               class="form-control"
               placeholder="Фамилия"
               required v-model="user.profile.last_name"
               :class="$v.user.profile.last_name.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.profile.last_name.$dirty && !$v.user.profile.last_name.maxLength" class="invalid-feedback">Не
          более 10
          символов</p>
        <p v-if="$v.user.profile.last_name.$dirty && !$v.user.profile.last_name.required" class="invalid-feedback">
          Обязательное поле</p>

        <label for="event-name" class="row-sm-2 control-label m-0">Почта</label>
        <input type="email"
               id="inputEmail"
               class="form-control"
               placeholder="Email" required autofocus v-model="user.email"
               :class="$v.user.email.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.email.$dirty && !$v.user.email.required" class="invalid-feedback">Обязательное поле</p>
        <p v-if="$v.user.email.$dirty && !$v.user.email.email" class="invalid-feedback">Некорректный email</p>

        <label for="event-name" class="row-sm-2 control-label m-0">Телефон</label>
        <input type="number"
               id="inputMobile"
               class="form-control"
               placeholder="Телефон" required v-model="user.profile.mobile"
               :class="$v.user.profile.mobile.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.profile.mobile.$dirty && !$v.user.profile.mobile.required" class="invalid-feedback">
          Обязательное поле</p>
        <p v-if="$v.user.profile.mobile.$dirty && !$v.user.profile.mobile.minLength" class="invalid-feedback">Минимум 11
          символов</p>
        <p v-if="$v.user.profile.mobile.$dirty && !$v.user.profile.mobile.maxLength" class="invalid-feedback">Максимум
          11 символов</p>

        <label for="event-name" class="row-sm-2 control-label m-0">День Рождения</label>
        <input type="text"
               id="inputBirthday"
               class="form-control"
               placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ" required v-model="user.birthday"
               :class="$v.user.birthday.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.birthday.$dirty && !$v.user.birthday.required" class="invalid-feedback">Обязательное поле</p>
          <label for="event-name" class="row-sm-2 control-label m-0 control-label">Страна</label>
          <input type="text"
                 id="inputCountry"
                 class="form-control"
                 placeholder="Страна" v-model="user.profile.country"
          >
        <div class="btn">
          <b-button variant="light" @click="expandedInfoFields">
            {{ expand ? 'Скрыть' : 'Дополнительная информация' }}
          </b-button>
          <div class="form-signin" v-show="expand">

            <label for="event-name" class="row-sm-2 control-label m-0">Город</label>
            <input type="text"
                   id="inputCity"
                   class="form-control"
                   placeholder="Город" v-model="user.profile.city"
            >

            <label for="event-name" class="row-sm-2 control-label m-0">Должность</label>
            <input type="text"
                   id="inputState"
                   class="form-control"
                   placeholder="Должность" v-model="user.profile.state"
                   :class="$v.user.profile.state.$error ? 'is-invalid' : '' "
            >
            <p v-if="$v.user.profile.state.$dirty && !$v.user.profile.state.required" class="invalid-feedback">
              Обязательное поле</p>

            <label for="event-name" class="row-sm-2 control-label m-0">Описание</label>
            <textarea type="text"
                      id="description"
                      class="form-control"
                      placeholder="Описание" v-model="user.profile.description"
            />
          </div>
          <div class="mt-3">
            <b-button variant="outline-success" @click="updateUser">Отредактировать</b-button>
            <b-button variant="outline-danger" class="mb-3" @click="cancel">Отмена</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
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
      email: {required, email},
      birthday: {required},
      profile: {
        first_name: {required, maxLength: maxLength(10)},
        last_name: {required, maxLength: maxLength(10)},
        mobile: {required, maxLength: maxLength(11), minLength: minLength(11)},
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
  }

}


</script>

<style scoped>
.form-signin {
  max-width: 350px;
  padding: 15px;
  margin: auto;
}

label {
  cursor: default;
  margin-right: 10px;
}

.btn {
  margin-bottom: 15px;
  width: 100%;
}

.block {
  display: block;
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  outline: 0;
  color: black;
  background-color: slategray;
}
</style>