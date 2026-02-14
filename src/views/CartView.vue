<script setup>
import {onMounted} from "vue";
import {useUsersStore} from "@/stores/userStor.js";
import CardItem from "@/components/shared/card/CardItem.vue";

const cardsBasket = useUsersStore()


onMounted(async () => {
  cardsBasket.cartList()
})
</script>

<template>
  <p>корзина</p>
  <div v-if="cardsBasket.list.length > 1" class="card_list">
    <template v-for="card in cardsBasket.list" :key="card.id">
      <card-item :card></card-item>
    </template>
  </div>
  <div v-else>
    <p>нет в корзине ничего</p>
  </div>
</template>

<style scoped>
.card_list{
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  gap: 25px
}
</style>