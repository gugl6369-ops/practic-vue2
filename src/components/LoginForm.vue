<script setup>

import TheButton from "@/components/shared/UI/button/theButton.vue";
import TheInput from "@/components/shared/UI/input/TheInput.vue";
import {reactive} from "vue";
import {accountService} from "@/utilites/API/account.service.js";
import {useUsersStore} from "@/stores/userStor.js";

const loginUserForm = reactive({
  email: "",
  password: "",
})

 const userStor = useUsersStore()

const loginUser =  async () => {
  const token = await accountService.login(loginUserForm)
  userStor.setUserToken(token.user_token)
}

</script>

<template>
  <div class="login-form">
    <form class="login-form" @submit.prevent="loginUser()">
      <p class="title">Авторизация</p>
      <div class="form-group">
        <label for="email">
          Почта
          <the-input type="email" required v-model="loginUserForm.email" />
        </label>
      </div>
      <div class="form-group">
        <label for="password">
          Пароль
          <the-input type="password" required v-model="loginUserForm.password" />
        </label>
      </div>
      <the-button type="submit" >
        Войти
      </the-button>
      <div class="to-register">
        <p>У вас нет аккаунта?</p>
        <router-link to="/auth/register" class="link">Зарегистрироваться</router-link>
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