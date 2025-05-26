<template>
  <div class="user">
    <h1 class="user__name">
      {{ user?.name }}
    </h1>

    <p class="user__username">
      {{ user?.username }}
    </p>

    <a :href="userEmailLink">{{ user?.email }}</a>

    <p class="user__address">{{ userAddressString }}</p>

    <a :href="userPhoneLink">{{ user?.phone }}</a>

    <a v-if="user?.website" :href="user.website" target="_blank">{{ user.website }}</a>

    <div v-if="albums" class="albums">
      <details v-for="album in albums" class="albums__album">
        <summary>{{ album.title }}</summary>
      </details>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const { data: user } = useFetch(`/api/users/${route.params.id}`);
const { data: albums } = useFetch(`/api/albums/${route.params.id}`);
const { data: photos } = useFetch(`/api/albums/${route.params.id}/photos`);

const userEmailLink = computed(() => `mailto:${user.value?.email}`);
const userPhoneLink = computed(() => `tel:${user.value?.phone}`);
const userAddressString = computed(() => {
  if (!user.value) {
    return '';
  }

  const keys = ['city', 'street', 'suite', 'zipcode'];

  return keys.reduce((acc, key) => {
    acc += `${user.value.address[key]}, `;

    return acc;
  }, '');
})
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__name {
    font-size: 1.2rem;
  }

  &__username, &__email {
    font-size: 1rem;
  }

  &__email {
    color: darkblue;
  }

  &__address {
    font-size: .8rem;
    color: gray;
  }
}

.albums {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.albums__album {
  padding: 1rem;
  border: 1px solid gray;
}
</style>
