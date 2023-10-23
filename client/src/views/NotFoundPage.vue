<template>
  <main class="font-poppins flex items-center justify-center h-screen">
    <div class="mb-6 text-center">
      <h1 class="font-bold text-9xl text-red-600 pb-1">404</h1>
      <h2 class="font-semibold text-3xl text-slate-800 pb-3">
        Page Not Found!
      </h2>
      <p class="font-medium text-xl text-slate-700 pb-10">
        The page you're looking for doesn't exist 😅
      </p>
      <router-link to="/">
        <button
          class="text-white font-medium text-xl px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all"
        >
          Back to home
        </button>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
    name: "NotFoundPage",
}
</script>
