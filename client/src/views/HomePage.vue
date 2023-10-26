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
        <form class="flex flex-col gap-5" @submit.prevent="createCategory">
            <h3 class="mt-12 font-semibold text-2xl">Add new categories:</h3>
            <div class="flex gap-4">
                <!-- Input bindings ✅ v-model: automatically update variable theNewCategory to user input -->
                <input
                    type="text"
                    v-model="new_category"
                    class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                />

                <!-- Event handling ✅ v-on (@): calls method when button is clicked -->
                <button
                    type="submit"
                    @click="addCategory"
                    class="text-white font-medium text-lg px-12 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition-all"
                >
                    Add
                </button>
            </div>
        </form>

        <h3 class="mt-12 mb-7 font-semibold text-2xl">Categories:</h3>
        <section
            class="grid grid-cols-1 gap-4 xl:grid-cols-4 xl:gap-10 lg:grid-cols-3 lg:gap-8 md:grid-cols-2 md:gap-6 transition-all"
        >
            <!-- List rendering ✅ v-for: render array -->
            <div v-for="category in categories" :key="category" class="relative">
                <!-- Emit ✅ -->
                <CategoryCard
                    :categories="category"
                    @add-note="redirectToCategory(category)"
                    @remove-category="removeCategory(category)"
                />
                <!-- Dynamic routing ✅ -->
                <router-link
                    :to="{
                        name: 'category',
                        params: { categoryName: category ? category.toString() : '' },
                    }"
                >
                </router-link>
            </div>
        </section>
    </main>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue';
import NavbarComponent from '../components/NavbarComponent.vue';
import axios from 'axios';

export default {
    components: {
        CategoryCard,
        NavbarComponent,
    },
    data() {
        return {
            new_category: '',
            categories: [],
        };
    },
    methods: {
        addCategory() {
            // makes sure the inputted category is not empty and haven't been made
            if (this.theNewCategory.trim() === '' || this.categories.includes(this.theNewCategory.trim())) {
                return;
            }

            // insert inputted category to array if it matches the requirement
            this.categories.push(this.theNewCategory.trim());

            // make theNewCategory empty again
            this.theNewCategory = '';
        },
        removeCategory(category) {
            // take index of the selected category
            const index = this.categories.indexOf(category);
            if (index !== -1) {
                // check if category exists
                this.categories.splice(index, 1); // remove one category
            }
        },
        redirectToCategory(category) {
            // dynamic routing ✅
            this.$router.push({
                name: 'category',
                params: { categoryName: category },
            });
        },
        async showCategories() {
            await fetch('http://localhost:3000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    this.categories = data.docs.map((category) => category.name);
                    console.log(this.categories);
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },
        async createCategory() {
            try {
                const newCategory = {
                    name: this.new_category, // ambil dari v-modelnya input
                };

                const response = await axios.post('http://localhost:3000/api/categories', newCategory);

                console.log(response.data);
                alert(`${newCategory.name} category added successfully!`);

                this.showCategories(); // nampilin data di konsol setelah nambah
            } catch (error) {
                console.log(error.message);
                alert('An error occurred while adding a category: ' + error.message);
            }
        },
    },
    mounted() {
        this.showCategories();
    },
};
</script>
