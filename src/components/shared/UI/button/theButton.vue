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
  background: #ff3b30;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);

  &:hover{
    background-color: #000000;
    transform: translateY(-5px);
    box-shadow: 2px 2px 4px #ba2828;
    color: white;
  }
}
</style>