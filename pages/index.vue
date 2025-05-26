<template>
  <div class="home-page">
    <InputSearch v-model="search" placeholder="Enter text" ref="inputSearch" />
    <div class="home-page__users-list">
      <UserCard v-for="user in filteredList" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script setup>
const search = ref("");

const { data: users } = useFetch('/api/users');

const inputSearch = useTemplateRef('inputSearch');

const filteredList = computed(() => {
  if (search.value.length < 3) {
    return users.value;
  }

  return users.value.filter(user => {
    const searchStr = search.value.toLowerCase();
    const emailStr = user.email.toLowerCase();
    const nameStr = user.name.toLowerCase();

    return emailStr.includes(searchStr) || nameStr.includes(searchStr)
  })
});

onMounted(() => {
  inputSearch.value?.$refs.inputSearch.focus();
});

const PAGE_TITLE = "Home Page";

definePageMeta({
    title: PAGE_TITLE,
})

useHead({
  title: PAGE_TITLE,
  meta: [
    {
      name: "description",
      content: "This is the home page of the application.",
    },
  ],
});
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;

  &__users-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}
</style>
