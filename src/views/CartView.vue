<script setup>
import {useProductStore} from "@/stores/productStor.js";
import {onMounted} from "vue";

const cards = useProductStore()


onMounted(async () => {
  cards.cartList()
})
</script>

<template>
  <p>корзина</p>
</template>

<style scoped>

</style>