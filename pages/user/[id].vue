<template>
  <div class="user">
    <template v-if="data">
      <h1 class="user__name">{{ data.user?.name }}</h1>
      <p class="user__username">@{{ data.user?.username }}</p>

      <a class="user__email" :href="userEmailLink">{{ data.user?.email }}</a>
      <p class="user__address">{{ userAddressString }}</p>
      <a class="user__phone" :href="userPhoneLink">{{ data.user?.phone }}</a>

      <a
        v-if="data.user?.website"
        class="user__website"
        :href="`https://${data.user.website}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ data.user.website }}
      </a>

      <section v-if="data.albums?.length" class="albums">
        <h2 class="albums__title">Альбомы</h2>
        <details
          v-for="album in data.albums"
          :key="album.id"
          class="albums__item"
        >
          <summary class="albums__summary">{{ album.title }}</summary>
          <ul class="albums__photos">
            <li
              v-for="photo in data.albumPhotos[album.id]"
              :key="photo.id"
              class="albums__photo"
            >
              <img :src="photo.thumbnailUrl" :alt="photo.title" />
            </li>
          </ul>
        </details>
      </section>
    </template>

    <template v-else>
      <p>Загрузка...</p>
    </template>
  </div>
</template>

<script setup>
import { useAsyncData } from '#app'

const route = useRoute()

const { data } = await useAsyncData('userPage', async () => {
  const [user, albums] = await Promise.all([
    $fetch(`/api/users/${route.params.id}`),
    $fetch(`/api/albums/${route.params.id}`),
  ])

  const albumPhotos = {}

  await Promise.all(
    albums.map(async (album) => {
      albumPhotos[album.id] = await $fetch(`/api/albums/${album.id}/photos`)
    })
  )

  return { user, albums, albumPhotos }
})

const userEmailLink = computed(() =>
  data.value?.user?.email ? `mailto:${data.value.user.email}` : '#'
)
const userPhoneLink = computed(() =>
  data.value?.user?.phone ? `tel:${data.value.user.phone}` : '#'
)
const userAddressString = computed(() => {
  const address = data.value?.user?.address
  return address
    ? `${address.city}, ${address.street}, ${address.suite}, ${address.zipcode}`
    : ''
})
</script>

<style lang="scss" scoped>
.user {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  &__username {
    font-size: 1.1rem;
    color: #666;
  }

  &__email,
  &__phone,
  &__website {
    color: #0056b3;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__address {
    font-size: 0.9rem;
    color: #555;
  }
}

.albums {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__item {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    background: #f9f9f9;

    summary {
      font-weight: bold;
      cursor: pointer;
      margin-bottom: 0.5rem;
    }
  }

  &__photos {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;

    li {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid #ddd;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
