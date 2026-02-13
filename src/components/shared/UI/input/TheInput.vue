<script setup>
defineProps({
  type: 'text' || 'password' || 'email' || 'tel',
  required: Boolean,
})

const model = defineModel()
</script>

<template>
  <label>
    <slot></slot>
    <input :type="type" :required="required" v-model="model">
  </label>
</template>

<style lang="scss" scoped>
label{
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  margin-bottom: 6px;
}
input{
  width: 100%;
  padding: 12px 16px;
  margin-top: 6px;
  border: 2px solid #e0e4e8;
  border-radius: 12px;
  font-size: 15px;
  color: #212529;
  background-color: white;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: #adb5bd;
  }

  &:focus {
    outline: none;
    border-color: #d32f2f;  /* Красный акцент */
    box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.08);
    background-color: #fff9f9;
  }

  &::placeholder {
    color: #adb5bd;
    font-size: 14px;
  }
}
</style>