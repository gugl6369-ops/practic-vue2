<script setup>

 import {useProductStore} from "@/stores/productStor.js";
 import {onMounted} from "vue";
 import CardItem from "@/components/shared/card/CardItem.vue";


 const cards = useProductStore()


 onMounted(async () => {
   cards.productsList()
 })

</script>

<template>
  <main>
    <p>каталог</p>
    <div class="card_list">
      <template v-for="card in cards.list" :key="card.id" >
        <card-item  :card></card-item>
      </template>

    </div>
  </main>
</template>
<style scoped>
.card_list{
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  gap: 25px
}
</style>