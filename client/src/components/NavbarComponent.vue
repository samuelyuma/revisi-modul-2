<template>
  <section
    class="sticky top-0 py-4 bg-slate-200 justify-between items-center flex px-32 font-poppins"
  >
    <h1 class="text-xl font-bold text-slate-800">To-Do-List ⚡</h1>
    <ul
      class="flex gap-12 text-center justify-center font-medium text-lg text-slate-800 items-center"
    >
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </section>
</template>

<script>
export default {};
</script>
