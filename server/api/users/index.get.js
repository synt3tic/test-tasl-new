export default defineEventHandler(async (event) => {
  return await $fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});
