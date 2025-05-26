export default defineEventHandler(async (event) => {
    return await $fetch(`https://jsonplaceholder.typicode.com/albums/${event.context.params.id}/photos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
});
