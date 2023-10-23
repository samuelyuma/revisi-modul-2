<template>
  <section class="w-full shadow-xl pb-full rounded-3xl bg-blue-500 px-9 py-7 font-poppins">
    <div class="flex flex-col gap-40">
      <h1 class="text-white text-3xl font-semibold">{{ categories }}</h1>
      <div class="flex items-center justify-between">
        <button @click="removeCategory"
          class=" text-blue-500 bg-white font-semibold text-2xl rounded-full py-2.5 px-4">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
        <button @click="addNote" class="text-blue-500 bg-white font-semibold text-2xl rounded-full py-2.5 px-4">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    categories: String,
    taskCount: Number,
  },
  methods: { // Emit ✅ 
    addNote() {
      this.$emit('add-note'); // Emit event to notify parent component
    },
    removeCategory() { // Emit ✅ 
      this.$emit('remove-category'); // Emit event to notify parent component
    },
  },
};
</script>
