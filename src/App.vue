<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheButton from "@/components/shared/UI/button/theButton.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div>
        <the-button>
          <RouterLink class="link" to="/">Главная</RouterLink>
        </the-button>
        </div>
        <div class="header_auth">
          <the-button>
            <RouterLink class="link" to="/auth/login">Войти</RouterLink>
          </the-button>
          <the-button>
            <RouterLink class="link" to="/auth/register">Зарегистрироваться</RouterLink>
          </the-button>

        </div>
        <div v-show="false">
          <RouterLink to="/cart">Корзина</RouterLink>
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
