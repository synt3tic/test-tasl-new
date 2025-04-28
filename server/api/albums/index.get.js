export default defineEventHandler(async (event) => {
  return await $fetch("https://jsonplaceholder.typicode.com/albums", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});
