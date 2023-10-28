<!-- Ada beberapa v-model, v-for, dan v v lain yg ak hilangin, buat referensi bisa pake categoryPage.vue ya, thankss -->

<template>
    <section>
        <NavbarComponent />
        <main class="mx-32 my-10 font-poppins">
            <div class="flex items-center justify-between mb-8">
                <div class="flex justify-between items-center">
                    <h1 class="font-bold text-slate-800 text-4xl py-2">To Do List</h1>
                </div>
                <div class="text-black font-medium text-md pt-1 text-right">
                    {{ date }}
                    <br />
                    {{ time }}
                </div>
            </div>

            <section>
                <form @submit.prevent="addTask">
                    <h3 class="mt-2 font-semibold text-2xl mb-3">Add new task:</h3>
                    <div class="flex gap-2 mb-2">
                        <input type="text" placeholder="Title" disabled
                            class="placeholder-slate-900 w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-900 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center" />
                        <input type="text" placeholder="Category" disabled
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center placeholder-slate-900" />
                        <input type="text" placeholder="Status" disabled
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center placeholder-slate-900" />
                        <button class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-white">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <input type="text" placeholder="e.g. Pemweb dapet A"
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400" />
                        <!-- <input type="text" placeholder="category dropdown here"
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400" /> -->

                        <!-- dropdown category selction -->
                        <div class="relative w-full">
                            <button
                                class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-left relative"
                                @click="isCategoryOptionsExpanded = !isCategoryOptionsExpanded"
                                @blur="isCategoryOptionsExpanded = false">
                                {{ selectedCategory }}
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    class="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ease-in-out"
                                    :class="isCategoryOptionsExpanded ? 'rotate-180' : 'rotate-0'">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <transition enter-active-class="transform transition duration-500 ease-custom"
                                enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                leave-active-class="transform transition duration-300 ease-custom"
                                leave-class="translate-y-0 scale-y-100 opacity-100"
                                leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                <ul v-show="isCategoryOptionsExpanded"
                                    class="absolute left-0 right-0 mt-2 bg-white border border-slate-400 rounded-lg shadow-lg overflow-hidden">
                                    <li v-for="(category, index) in categoryOptions" :key="index"
                                        class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
                                        @mousedown.prevent="setCategory(category)">
                                        {{ category }}
                                    </li>
                                </ul>
                            </transition>
                        </div>

                        <!-- <input type="text" placeholder="status dropdown here"
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400" /> -->

                        <!-- dropdown status selction -->
                        <div class="relative w-full">
                            <button
                                class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-left relative"
                                @click="isStatusOptionsExpanded = !isStatusOptionsExpanded"
                                @blur="isStatusOptionsExpanded = false">
                                {{ selectedStatus }}
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    class="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ease-in-out"
                                    :class="isStatusOptionsExpanded ? 'rotate-180' : 'rotate-0'">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <transition enter-active-class="transform transition duration-500 ease-custom"
                                enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                leave-active-class="transform transition duration-300 ease-custom"
                                leave-class="translate-y-0 scale-y-100 opacity-100"
                                leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                <ul v-show="isStatusOptionsExpanded"
                                    class="absolute left-0 right-0 mt-2 bg-white border border-slate-400 rounded-lg shadow-lg overflow-hidden">
                                    <li v-for="(status, index) in statusOptions" :key="index"
                                        class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
                                        @mousedown.prevent="setStatus(status)">
                                        {{ status }}
                                    </li>
                                </ul>
                            </transition>
                        </div>

                        <button @click="addTask"
                            class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                </form>
            </section>
            <section class="flex flex-col gap-4 mt-16">
                <h2 class="font-semibold text-2xl">On-going Tasks</h2>
                <div class="flex-row gap-96">
                    <div class="flex items-center gap-2 mb-2">
                        <p
                            class="w-5/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
                            <!-- {{ task.timestamp_date }} -->
                        </p>
                        <p
                            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
                            <!-- {{ task.timestamp_time }} -->
                        </p>
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text" />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text" />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text" />
                        <button
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </div>
                    <div class="font-medium text-lg text-gray-600">
                        There's no task at the moment, santai dulu ga sih :V
                    </div>
                </div>
            </section>

            <section class="flex flex-col gap-5 mt-16">
                <h2 class="font-semibold text-2xl">Completed Tasks</h2>
                <div class="flex-row gap-3">
                    <div class="font-medium text-lg text-gray-600">There's no completed task at the moment.</div>
                    <div class="flex items-center gap-2 mb-2">
                        <p
                            class="w-5/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
                            <!-- {{ task.timestamp_date }} -->
                        </p>
                        <p
                            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
                            <!-- {{ task.timestamp_time }} -->
                        </p>
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text" />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text" />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text" />
                        <button
                            class="text-white text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    </section>
</template>

<script>
import axios from 'axios';
// import { mixin as clickaway } from 'vue-clickaway';

import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            todo: [], // initialize empty array for todo list
            content_input: '', // initialize empty string for todo content
            date: '', // initialize empty string for date
            time: '', // initialize empty string for time
            week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            name: '', // name of the category
            selectedCategory: 'Daily',
            categoryOptions: [],
            isCategoryOptionsExpanded: false, // flag for dropdowm
            categoryTaskCount: 0,
            selectedStatus: 'Not Started',
            isStatusOptionsExpanded: false,
            statusOptions: ['Not started', 'On progress', 'Completed'],
        };
    },
    computed: {
        completedTodo() {
            return this.todo.filter((task) => task.status === 'done' && task.category === this.categoryName);
        },
        unfinishedTodo() {
            return this.todo.filter((task) => task.status === 'not started' && task.category === this.categoryName);
        },
        categoryTaskCount() {
            return this.todo.filter((task) => task.category === this.categoryName).length;
        },
    },
    methods: {
        setCategory(category) {
            this.selectedCategory = category;
            this.isCategoryOptionsExpanded = false;
        },

        setStatus(status) {
            this.selectedStatus = status;
            this.isStatusOptionsExpanded = false;
        },

        async getCategory() {
            await fetch('http://localhost:3000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    this.categoryOptions = data.docs.map((category) => category.name);
                    console.log(this.category);
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },

        // JGN HAPUSSS
        // async getStatus() {
        //     await fetch('http://localhost:3000/api/todo')
        //         .then((response) => response.json())
        //         .then((data) => {
        //             this.statusOptions = data.docs.map((todo) => todo.status);
        //             console.log(this.todo);
        //         })
        //         .catch((error) => {
        //             console.error('An error occurred:', error);
        //         });
        // },

        async getAllTodos() {
            await fetch('http://localhost:3000/api/todo')
                .then((response) => response.json())
                .then((data) => {
                    this.todos = data.docs.map((todo) => todo.title);
                    console.log(this.todos);
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },
        // perbaiki function yang ini
        async addTask() {
            if (this.content_input.trim() === '') {
                return;
            }

            const newTask = {
                title: this.content_input,
                category: this.categoryName, // Set the category based on the route parameter
                status: 'not started',
            };

            try {
                const response = await fetch('http://localhost:3000/api/todo', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    this.todo.push(data);
                    this.content_input = '';
                } else {
                    console.error('Failed to add task:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
        updateTime() {
            const current_date = new Date(); // built in from JS
            this.date = // formatting the date
                this.week[current_date.getDay()] + // according to array week
                ', ' +
                this.zeroPadding(current_date.getDate(), 2) +
                ' - ' +
                this.zeroPadding(current_date.getMonth() + 1, 2) + // since January = 0, we add 1
                ' - ' +
                this.zeroPadding(current_date.getFullYear(), 4) +
                ' ';

            this.time = // formatting the time
                this.zeroPadding(current_date.getHours(), 2) +
                ':' +
                this.zeroPadding(current_date.getMinutes(), 2) +
                ':' +
                this.zeroPadding(current_date.getSeconds(), 2);
        },
        zeroPadding(num, digit) {
            // formatting leading zeros
            let zero = '';
            for (let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit); // ensure has requested digits
        },
    },
    mounted() {
        this.updateTime();
        this.getAllTodos();
        this.getCategory();
        // this.getStatus();
        setInterval(this.updateTime, 1000); // update every 1 second
    },
};
</script>
