<!-- Klo bingung soal v-model bisa ke CategoryPage.vue aja, file aslinya dari situ (file ini hasil rombak file CategoryPage.vue) -->

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
                <!-- Event handling ✅ v-on (@submit.prevent): prevent reload -->
                <form @submit.prevent="addTask">
                    <h3 class="mt-12 font-semibold text-2xl mb-3">Add new task:</h3>
                    <div class="flex gap-2">
                        <!-- Input bindings ✅ v-model: automatically update variable content_input to user input -->
                        <input
                            type="text"
                            v-model="content_input"
                            placeholder="e.g. pemweb dapet A"
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                        />

                        <!-- Event handling ✅ v-on (@): calls method when button is clicked -->
                        <button
                            @click="addTask"
                            class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                </form>
            </section>

            <!-- <section>
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
                            v-model="content_input"
                            placeholder="e.g. Pemweb dapet A"
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="..."
                            disabled
                            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="..."
                            disabled
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
            </section> -->
            <section class="flex flex-col gap-4 mt-16">
                <h2 class="font-semibold text-2xl">Not-started Tasks</h2>
                <div class="flex-row gap-96">
                    <div v-if="unfinishedTodo.length === 0" class="font-medium text-lg text-gray-600">
                        There's no task at the moment, santai dulu ga sih :V
                    </div>
                    <div
                        v-for="task in unfinishedTodo"
                        :key="task.title"
                        :class="`todo-item ${task.status === 'not started'}`"
                        class="flex items-center gap-2 mb-2"
                    >
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
                            @click="removeToDo(task)"
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </div>
                </div>
            </section>

            <section class="flex flex-col gap-4 mt-16">
                <h2 class="font-semibold text-2xl">On-Going Tasks</h2>
                <div class="flex-row gap-96">
                    <div v-if="onGoingTodo.length === 0" class="font-medium text-lg text-gray-600">
                        There's no on-going task at the moment, santai dulu ga sih :V
                    </div>
                    <div
                        v-for="task in onGoingTodo"
                        :key="task.title"
                        :class="`todo-item ${task.status === 'not started'}`"
                        class="flex items-center gap-2 mb-2"
                    >
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
                            @click="removeToDo(task)"
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </div>
                </div>
            </section>

            <section class="flex flex-col gap-5 mt-16">
                <h2 class="font-semibold text-2xl">Completed Tasks</h2>
                <div class="flex-row gap-3">
                    <div v-if="completedTodo.length === 0" class="font-medium text-lg text-gray-600">
                        There's no completed task at the moment.
                    </div>
                    <div
                        v-for="task in completedTodo"
                        :key="task.title"
                        :class="`todo-item ${task.status === 'done'}`"
                        class="flex items-center gap-2 mb-2"
                    >
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
                            @click="removeToDo(task)"
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
        unfinishedTodo() {
            return this.todo.filter((task) => task.status === 'not started' && task.category === this.categoryName);
        },
        onGoingTodo() {
            return this.todo.filter((task) => task.status === 'on going' && task.category === this.categoryName);
        },
        completedTodo() {
            return this.todo.filter((task) => task.status === 'done' && task.category === this.categoryName);
        },
        categoryTaskCount() {
            return this.todo.filter((task) => task.category === this.categoryName).length;
        },
    },
    methods: {
        async getAllTodos() {
            await fetch('http://localhost:3000/api/todo')
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    this.todos = data.docs.map((todo) => todo.title);
                    console.log(this.todos);
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },
        async getAllCategories() {
            await fetch('http://localhost:3000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.categories = data.docs.map((categories) => categories.name);
                    console.log(this.categories);
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },
        async addTask() {
            if (this.content_input.trim() === '') {
                return;
            }

            const newTask = {
                name: this.content_input,
                category: this.categories,
                // publishedDate: new Date().toISOString(),the route parameter
                // status: 'not started',
            };

            const newTodo = {
                title: this.content_input,
            };

            try {
                const response = await fetch('http://localhost:3000/api/todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTodo),
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
        removeToDo(task) {
            fetch(`http://localhost:3000/api/todo/${task.id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    const index = this.todo.indexOf(task);
                    if (index !== -1) {
                        this.todo.splice(index, 1);
                    }
                })
                .catch((error) => {
                    console.error('REMOVE To-do error occured:', error);
                });
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
        this.getAllCategories();
        setInterval(this.updateTime, 1000); // update every 1 second
    },
};
</script>
