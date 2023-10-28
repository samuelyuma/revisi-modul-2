<template>
    <section>
        <NavbarComponent />
        <main class="mx-32 mt-24 font-poppins">
            <section>
                <h1 class="font-bold text-slate-800 text-4xl pb-8">Anggota Kelompok P09 :</h1>
                <ul class="font-medium text-slate-600 text-2xl">
                    <li>1. Siti Nur Ellyzah - 5027221014</li>
                    <li class="py-1">2. Samuel Yuma Krismata - 5027221029</li>
                    <li>3. Jacinta Syilloam - 5027221036</li>
                </ul>
            </section>
        </main>
    </section>
</template>

// referensi drop down nitip
<!-- 
<template>
    <div
      id="app"
      class="flex items-center justify-center bg-gray-100 min-h-screen"
    >
      <div class="relative text-lg w-48">
        <button
          class="flex items-center justify-between px-3 py-2 bg-white w-full border border-gray-500 rounded-lg"
          @click="isOptionsExpanded = !isOptionsExpanded"
          @blur="isOptionsExpanded = false"
        >
          <span>{{ selectedOption }}</span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
            :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <transition
          enter-active-class="transform transition duration-500 ease-custom"
          enter-class="-translate-y-1/2 scale-y-0 opacity-0"
          enter-to-class="translate-y-0 scale-y-100 opacity-100"
          leave-active-class="transform transition duration-300 ease-custom"
          leave-class="translate-y-0 scale-y-100 opacity-100"
          leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
        >
          <ul
            v-show="isOptionsExpanded"
            class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
          >
            <li
              v-for="(option, index) in options"
              :key="index"
              class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
              @mousedown.prevent="setOption(option)"
            >
              {{ option }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOptionsExpanded: false,
        selectedOption: "1x",
        options: ["1x", "2x", "3x", "4x or more"]
      };
    },
    methods: {
      setOption(option) {
        this.selectedOption = option;
        this.isOptionsExpanded = false;
      }
    }
  };
  </script>
  
  <style>
  .ease-custom {
    transition-timing-function: cubic-bezier(.61,-0.53,.43,1.43);
  }
  </style> -->
  

<script>
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
    components: {
        NavbarComponent,
    },
    // belajar ngefetch 😭 biarin dulu plz ntar kalo dh jadi buang aj
    // methods: {
    //     async categoriesAPI() {
    //         try {
    //             const response = await fetch('http://localhost:3000/api/todo');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok.');
    //             }
    //             const data = await response.json();
    //             this.todo = data;
    //             console.log(data);
    //         } catch (error) {
    //             console.error('An error occurred:', error);
    //         }
    //     },
    //     async catAPI() {
    //         try {
    //             const response = await fetch('https://catfact.ninja/breeds');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok.');
    //             }
    //             const data = await response.json();
    //             console.log(data);
    //         } catch (error) {
    //             console.error('An error occurred:', error);
    //         }
    //     },
    // },
    // mounted() {
    //     this.categoriesAPI();
    //     this.catAPI();
    // },
};
</script>
