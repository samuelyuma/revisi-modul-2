<template>
  <NavbarComponent />
  <main class="mx-32 mt-24 font-poppins">
    <section>
      <h1 class="font-bold text-slate-800 text-4xl pb-8">
        Anggota Kelompok P09 :
      </h1>
      <ul class="font-medium text-slate-600 text-2xl">
        <li>1. Siti Nur Ellyzah - 5027221014</li>
        <li class="py-1">2. Samuel Yuma Krismata - 5027221029</li>
        <li>3. Jacinta Syilloam - 5027221036</li>
      </ul>
    </section>
  </main>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  components: {
    NavbarComponent,
  },
};
</script>
