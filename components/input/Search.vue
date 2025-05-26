<template>
  <div class="app-search">
    <Icon name="material-symbols:search" size="20px" class="app-search__icon" />
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      class="app-input__text"
      ref="inputSearch"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Enter text",
  },
});
const input = useTemplateRef('inputSearch');

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style lang="scss" scoped>
.app-search {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;

  &:focus-within {
    border-color: chocolate;
  }

  &__icon {
    color: gray;
  }
}
</style>
