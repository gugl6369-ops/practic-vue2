<script setup>
defineProps({
  type: 'button' || 'submit' || 'reset'
})

</script>

<template>
 <button :type="type ?? 'button'" class="button">
   <slot></slot>
 </button>
</template>

<style lang="scss" scoped>
button{
  width: 100%;
  padding: 10px 20px;
  border-radius: 15px;
  border: 2px dashed black;
  font-size: 1rem;
  background-color: #ba2828;
  cursor: pointer;
  transition: .3s;
  color: white;

  &:hover{
    background-color: #000000;
    transform: translateY(-5px);
    box-shadow: 2px 2px 4px #ba2828;
    color: white;
  }
}
</style>