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
                        <input
                            type="text"
                            placeholder="Title"
                            disabled
                            class="placeholder-slate-900 w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-900 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center"
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            disabled
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center placeholder-slate-900"
                        />
                        <input
                            type="text"
                            placeholder="Status"
                            disabled
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center placeholder-slate-900"
                        />
                        <button class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-white">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            placeholder="e.g. Pemweb dapet A"
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="..."
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="..."
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                        />
                        <button
                            @click="addTask"
                            class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all"
                        >
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
                            class="w-5/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            <!-- {{ task.timestamp_date }} -->
                        </p>
                        <p
                            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            <!-- {{ task.timestamp_time }} -->
                        </p>
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                        />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                        />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                        />
                        <button
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                        >
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
                            class="w-5/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            <!-- {{ task.timestamp_date }} -->
                        </p>
                        <p
                            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            <!-- {{ task.timestamp_time }} -->
                        </p>
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                        />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                        />
                        <input
                            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                        />
                        <button
                            class="text-white text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                        >
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
            categoryName: '',
            categoryTaskCount: 0,
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
        // alternatif function ini bisa pake axios, jangan lupa diimport dulu tapi
        async getAllTodos() {
            await fetch('http://localhost:3000/api/todo')
                .then((response) => response.json())
                .then((data) => {
                    this.todos = data.docs.map((todo) => todo.name);
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
                publishedDate: new Date().toISOString(),
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
        setInterval(this.updateTime, 1000); // update every 1 second
    },
};
</script>
