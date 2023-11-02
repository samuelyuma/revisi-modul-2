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
                <form>
                    <h3 class="mt-2 font-semibold text-2xl mb-3">Add new task:</h3>
                    <div class="flex gap-2 mb-2">
                        <p
                            class="w-3/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-900 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center"
                        >
                            Title
                        </p>
                        <p
                            class="w-1/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center"
                        >
                            Category
                        </p>
                        <button class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-white">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>

                    <div class="flex gap-2">
                        <input
                            type="text"
                            v-model="content_input"
                            placeholder="e.g. Pemweb dapet A"
                            class="w-3/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                        />

                        <!-- dropdown category selction -->
                        <div class="relative w-1/4">
                            <button
                                type="button"
                                class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-left relative"
                                @click="isCategoryOptionsExpanded = !isCategoryOptionsExpanded"
                                @blur="isCategoryOptionsExpanded = false"
                            >
                                <!-- {{ selectedCategory ? selectedCategory.name : placeholder_cat }} -->
                                {{ displayCategory }}

                                <!-- {{ selectedCategory.name }} -->
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ease-in-out"
                                    :class="isCategoryOptionsExpanded ? 'rotate-180' : 'rotate-0'"
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
                                    v-show="isCategoryOptionsExpanded"
                                    class="absolute left-0 right-0 mt-2 bg-white border border-slate-400 rounded-lg shadow-lg overflow-hidden"
                                >
                                    <li
                                        v-for="(category, index) in categories"
                                        :key="index"
                                        class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
                                        @mousedown.prevent="setCategory(category)"
                                    >
                                        {{ category.name }}
                                    </li>
                                </ul>
                            </transition>
                        </div>

                        <button
                            type="button"
                            @click="addTask"
                            class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                </form>
            </section>

            <section class="flex flex-col gap-4 mt-8">
                <h2 class="font-semibold text-2xl">Not-started Tasks</h2>
                <div class="flex-row gap-96">
                    <div v-if="unfinished_todo.length === 0" class="font-medium text-lg text-gray-600">
                        There's no task at the moment, santai dulu ga sih :V
                    </div>

                    <div
                        v-for="task in unfinished_todo"
                        :key="task.id"
                        :class="`todo-item ${task.status === 'not started'}`"
                        class="flex items-center gap-2 mb-2"
                    >
                        <input
                            class="w-3/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                            v-model="task.title"
                        />

                        <p
                            class="w-1/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.category }}
                        </p>

                        <label class="relative">
                            <input
                                class="appearance-none bg-slate-200 py-5 px-6 rounded-xl cursor-pointer"
                                type="checkbox"
                                @change="markAsInProgress(task)"
                                v-model="task.markedAsInProgress"
                            />
                            <span
                                class="text-lg absolute inset-0 flex items-center justify-center bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-600 transition-all"
                            >
                                <font-awesome-icon icon="fa-solid fa-check" />
                            </span>
                        </label>

                        <button
                            type="button"
                            @click="removeToDo(task)"
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </div>
                </div>
            </section>

            <section class="flex flex-col gap-4 mt-8">
                <h2 class="font-semibold text-2xl">On-going Tasks</h2>
                <div class="flex-row gap-96">
                    <div v-if="progress_todo.length === 0" class="font-medium text-lg text-gray-600">
                        There's no on going task at the moment, santai dulu ga sih :V
                    </div>

                    <div
                        v-for="task in progress_todo"
                        :key="task.id"
                        :class="`todo-item ${task.status === 'on progress'}`"
                        class="flex items-center gap-2 mb-2"
                    >
                        <input
                            class="w-3/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                            v-model="task.title"
                        />

                        <p
                            class="w-1/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.category }}
                        </p>

                        <label class="relative">
                            <input
                                class="appearance-none bg-slate-200 py-5 px-6 rounded-xl cursor-pointer"
                                type="checkbox"
                                @change="markAsCompleted(task)"
                                v-model="task.markAsCompleted"
                            />
                            <span
                                class="text-lg absolute inset-0 flex items-center justify-center bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-600 transition-all"
                            >
                                <font-awesome-icon icon="fa-solid fa-check" />
                            </span>
                        </label>

                        <button
                            type="button"
                            @click="removeToDo(task)"
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </div>
                </div>
            </section>

            <section class="flex flex-col gap-4 mt-8">
                <h2 class="font-semibold text-2xl">Completed Tasks</h2>
                <div class="flex-row gap-96">
                    <div v-if="completed_todo.length === 0" class="font-medium text-lg text-gray-600">
                        There's no task at the moment, santai dulu ga sih :V
                    </div>

                    <div
                        v-for="task in completed_todo"
                        :key="task.id"
                        :class="`todo-item ${task.status === 'completed'}`"
                        class="flex items-center gap-2 mb-2"
                    >
                        <input
                            class="w-3/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                            type="text"
                            v-model="task.title"
                        />

                        <p
                            class="w-1/4 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.category }}
                        </p>

                        <button
                            type="button"
                            @click="removeToDo(task)"
                            class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
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
            selectedCategory: {},
            categories: [],
            isCategoryOptionsExpanded: false,
            categoryTaskCount: 0,
            unfinished_todo: [],
            completed_todo: [],
            progress_todo: [],
            placeholder_cat: 'Select category',
        };
    },
    methods: {
        setCategory(category) {
            this.selectedCategory = category;
            this.isCategoryOptionsExpanded = false;
        },

        async unfinishedTodo() {
            this.unfinished_todo = this.todo.filter((task) => task.status === 'not started');
        },

        async progressTodo() {
            this.progress_todo = this.todo.filter((task) => task.status === 'on progress');
        },

        async completedTodo() {
            this.completed_todo = this.todo.filter((task) => task.status === 'completed');
        },

        async getAllTodos() {
            this.todo = [];

            await fetch('http://localhost:3000/api/todo')
                .then((response) => response.json())
                .then((data) => {
                    data.docs.forEach((td) => {
                        this.todo.push({ id: td.id, title: td.title, category: td.category.name, status: td.status });
                    });

                    console.log(`DEBUG TODOS ${this.todos}`);
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });

            await this.unfinishedTodo();
            await this.progressTodo();
            await this.completedTodo();

            console.log(`[DEBUG] todo ${this.todos}`);
            console.log(`[DEBUG] unfinished_todo ${this.unfinished_todo}`);
        },
        async getAllCategories() {
            await fetch('http://localhost:3000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    data.docs.forEach((category) => {
                        this.categories.push({ id: category.id, name: category.name });
                    });

                    console.log(`DEBUG CATEGORIES ${this.categories}`);
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },
        async addTask() {
            console.log(`[DEBUG] ADD TASK CLICKED`);
            if (this.content_input.trim() === '') {
                return;
            }

            const newTask = {
                title: this.content_input,
                // publishedDate: new Date().toISOString(),
                category: this.selectedCategory.id,
                status: 'not started',
            };

            console.log(newTask);

            try {
                const response = await fetch('http://localhost:3000/api/todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });

                console.log(JSON.stringify(newTask));

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    // this.todo.push(data);
                    this.content_input = '';
                } else {
                    console.error('Failed to add task:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },

        async removeToDo(task) {
            console.log(`[DEBUG] REMOVE TODO CLICKED`);

            fetch(`http://localhost:3000/api/todo/${task.id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        // Task was successfully deleted from the server, now remove it from the local todo array
                        const index = this.todo.findIndex((item) => item.id === task.id);
                        if (index !== -1) {
                            this.todo.splice(index, 1);
                        }
                    } else {
                        console.error('Failed to delete the task:', response.statusText);
                    }
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },

        async markAsInProgress(task) {
            task.status = 'on progress';

            try {
                const response = await fetch(`http://localhost:3000/api/todo/${task.id}`, {
                    method: 'PATCH', // Use PUT to update the task status
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'on progress' }), // Send the updated status
                });

                if (response.ok) {
                    console.log('[UPDATE] Task status is now on progress');
                } else {
                    console.error('Failed to update task status:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }

            await this.unfinishedTodo();
            await this.progressTodo();
        },

        async markAsCompleted(task) {
            task.status = 'completed';

            try {
                const response = await fetch(`http://localhost:3000/api/todo/${task.id}`, {
                    method: 'PATCH', // Use PUT to update the task status
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'completed' }), // Send the updated status
                });

                if (response.ok) {
                    console.log('[UPDATE] Task status is now completed');
                } else {
                    console.error('Failed to update task status:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }

            await this.unfinishedTodo();
            await this.progressTodo();
            await this.completedTodo();
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
    computed: {
        displayCategory() {
            if (!this.selectedCategory.name) {
                return this.placeholder_cat;
            } else {
                return this.selectedCategory.name;
            }
        },
    },
    mounted() {
        this.updateTime();
        this.getAllTodos();
        this.getAllCategories();
        // setInterval(this.getAllTodos, 1000);
        setInterval(this.updateTime, 1000); // update every 1 second
    },
};
</script>
