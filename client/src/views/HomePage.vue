<template>
  <NavbarComponent />
  <main class="mx-32 my-10 font-poppins">
    <section class="flex">

      <!-- Input bindings ✅ v-model: automatically update variable name to user input -->
      <input
        type="text"
        placeholder="Your name here"
        v-model="name"
        class="py-2 px-2 border-b-2 border-slate-800 mr-4 focus:outline-none text-4xl font-bold w-3/12 text-slate-800"
      />
      <h2 class="font-bold text-slate-800 text-4xl py-2">'s To-Do-List</h2>
    </section>
    <section class="flex flex-col gap-5">
      <h3 class="mt-12 font-semibold text-2xl">Add new categories:</h3>
      <div class="flex gap-4">

      <!-- Input bindings ✅ v-model: automatically update variable category_custom to user input -->
        <input
          type="text"
          v-model="category_custom"
          class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
        />

      <!-- Event handling ✅ v-on (@): calls method when button is clicked -->
        <button
          @click="addCategory"
          class="text-white font-medium text-lg px-12 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition-all"
        >
          Add
        </button>
      </div>
    </section>

    <h3 class="mt-12 mb-7 font-semibold text-2xl">Categories:</h3>
    <section
      class="grid grid-cols-1 gap-4 xl:grid-cols-4 xl:gap-10 lg:grid-cols-3 lg:gap-8 md:grid-cols-2 md:gap-6 transition-all"
    >
      <!-- List rendering ✅ v-for: render array -->
      <div v-for="category in categories" :key="category" class="relative"> 
      <!-- Emit ✅ -->
        <CategoryCard
          :categories="category"
          @add-note=redirectToCategory(category)
          @remove-category=removeCategory(category)
        />
      <!-- Dynamic routing ✅ -->
        <router-link
          :to="{ name: 'category', params: { categoryName: category } }"
        >
        </router-link>
      </div>
    </section>
  </main>
</template>

<script> // 404 Not Found ✅
import CategoryCard from '../components/CategoryCard.vue';
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  components: {
    CategoryCard,
    NavbarComponent,
  },
  data() {
    return {
      name: '', // initialize empty string for variable name
      category_custom: '', // initialize empty string for variable category_custom
      categories: ['Daily', 'Work'], // initialize empty array for categories
    };
  },
  methods: {
    addCategory() {
      // makes sure the inputted category is not empty and haven't been made
      if (
        this.category_custom.trim() === '' ||
        this.categories.includes(this.category_custom.trim())
      ) {
        return;
      }

      // insert inputted category to array if it matches the requirement
      this.categories.push(this.category_custom.trim());

      // local storage ✅
      localStorage.setItem('categories', JSON.stringify(this.categories));

      // make category_custom empty again 
      this.category_custom = '';
    },
    removeCategory(category) {
      // take index of the selected category 
      const index = this.categories.indexOf(category);
      if (index !== -1) { // check if category exists
        this.categories.splice(index, 1); // remove one category 
        localStorage.setItem('categories', JSON.stringify(this.categories));  // update local storage
      }
    },
    redirectToCategory(category) {
      // dynamic routing ✅
      this.$router.push({
        name: 'category',
        params: { categoryName: category },
      });
    },
  },
  mounted() {
    // local storage ✅
    this.name = localStorage.getItem('name');

    // local storage ✅
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (Array.isArray(storedCategories)) { 
      this.categories = storedCategories;
    }
  },
};
</script>
