<script setup>
import {computed, onMounted} from "vue";
import {useUsersStore} from "@/stores/userStor.js";
import CardItem from "@/components/shared/card/CardItem.vue";

const cardsBasket = useUsersStore()


  onMounted(async () => {
    cardsBasket.cartList()
  })

  const removeCard = async () => {
    await cardsBasket.cartList()
  }

  const uniqueItems = computed(() => {
    const map = new Map()
    cardsBasket.list.forEach(item => {
      const key = item.product_id
      if (map.has(key)) {
        map.get(key).count++
      } else {
        map.set(key, { ...item, count: 1 })
      }
    })
    return Array.from(map.values())
  })

</script>

<template>
  <h1>Корзина</h1>
  <div v-if="uniqueItems.length" class="card_list">
    <CardItem
        v-for="item in uniqueItems"
        :key="item.id"
        :card="item"
        :count="item.count"
    />
  </div>
  <div v-else>
    <h2>Нет в корзине ничего</h2>
  </div>
</template>

<style>
.card_list{
  padding: 50px 100px;
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  gap: 25px
}
h1{
  text-align: center;
  font-size: 50px;
  color: #ff3b30;
  font-weight: bold;
  text-shadow: 0px 5px 15px rgba(243, 48, 48, 0.56);
}
h2{
  padding-top: 150px;
  text-align: center;
  font-size: 24px;
  color: #ff3b30;
  font-weight: bold;
  text-shadow: 0px 5px 15px rgba(243, 48, 48, 0.56);

}

</style>