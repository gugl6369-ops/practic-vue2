<script setup>

import TheInput from "@/components/shared/UI/input/TheInput.vue";
import TheButton from "@/components/shared/UI/button/theButton.vue";
import {reactive} from "vue";
import {accountService} from "@/utilites/API/account.service.js";

const userRegisterForm = reactive({
  fio: "",
  email: "",
  password: "",
})

const registerUser = () => {
  accountService.register(userRegisterForm)
}

</script>

<template>
  <div class="login-form">
    <form class="login-form" @submit.prevent="registerUser">
      <p class="title">Регистрация</p>
      <div class="form-group">
        <the-input type="text" required v-model="userRegisterForm.fio">
          ФИО
        </the-input>
      </div>
      <div class="form-group">
        <the-input type="email" required v-model="userRegisterForm.email">
          Почта
        </the-input>
      </div>
      <div class="form-group">
        <the-input type="password" required v-model="userRegisterForm.password">
          Пароль
        </the-input>
      </div>
      <the-button type="submit" >
        Зарегистрироваться
      </the-button>
      <div class="to-register">
        <p>У вас есть аккаунт?</p>
        <form></form>
        <router-link to="/auth/login" class="link">Войти</router-link>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
input{
  border: 1px solid #b52e2e;
  border-radius: 20px;
  transition: 0.3s ease-in-out;
  color: #2c3e50;

  :focus{
    background-color: rgba(186, 40, 40, 0.33);
  }
}
.link{
  color: #b52e2e;
  text-decoration: none;
}
.to-register{
  display: flex;
  gap: 10px;
}

.login-form form {
  width: 100%;
  max-width: 380px;
  padding: 40px 32px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05), 0 6px 12px rgba(0, 0, 0, 0.02);
}

.title {
  margin: 0 0 32px 0;
  font-size: 28px;
  font-weight: 600;
  color: #1a1e24;
  text-align: center;
  letter-spacing: -0.3px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group input

.form-group input

.login-form .additional-links {
  margin-top: 28px;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
}
</style>