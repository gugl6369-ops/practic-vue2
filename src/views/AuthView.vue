<script setup>
</script>
<template>
  <main id="login-form">
    <router-view></router-view>
  </main>
</template>
<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 94vh;
  width: 100%;
  padding: 20px;
  background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}
</style>