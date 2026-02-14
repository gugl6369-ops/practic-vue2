<script setup>
import {RouterLink, RouterView, useRouter} from 'vue-router'
import TheButton from "@/components/shared/UI/button/theButton.vue";
import {computed, onMounted} from "vue";
import {useUsersStore} from "@/stores/userStor.js";
import {accountService} from "@/utilites/API/account.service.js";

const userToken = useUsersStore()


onMounted(() => {
  const token = JSON.parse(localStorage.getItem("token"));
  userToken.setUserToken(token);
})

const logoutUser = async () => {
  await accountService.logout()
  localStorage.removeItem("token")
  userToken.clearUserToken()
  alert('вы вышли из аккакунта успешно!')
}

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div>
          <RouterLink class="link" to="/">
            <the-button>
              Главная
            </the-button>
          </RouterLink>
        </div>
        <div class="header_auth" v-if="!userToken.userToken">
          <RouterLink class="link" to="/auth/login">
            <the-button>
              Войти
            </the-button>
          </RouterLink>
          <RouterLink class="link" to="/auth/register">
            <the-button>
              Зарегистрироваться
            </the-button>
          </RouterLink>

        </div>
        <div v-else class="header_auth">
          <RouterLink class="link" to="/cart">
            <the-button>
              Корзина
            </the-button>
          </RouterLink>
          <the-button @click="logoutUser()">выйти</the-button>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper{
  width: 80%;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Mono;
  padding: 20px 0;
}
.header_auth{
  display: flex;
  gap: 40%;
}


.link{
  color: white;
  text-decoration: none;
}
nav a.router-link-exact-active {
  color: #e3e2e2;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
