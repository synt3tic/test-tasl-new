<template>
  <main class="layout-default">
    <CommonHeader class="--app-width" />
    <div class="layout-default__content --app-width">
      <slot />
    </div>
    <CommonFooter class="--app-width" />
  </main>
</template>

<script setup>
</script>

<style scoped lang="scss">
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
    display: flex;
    padding-top: 40px;
  }

  .--app-width {
    width: 100%;
    max-width: 1640px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
