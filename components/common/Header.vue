<template>
  <div class="app-header">
    <h1>{{ route.meta.title }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  width: 100%;
}
</style>
