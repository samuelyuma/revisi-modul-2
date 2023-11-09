<template>
    <section class="bg-slate-900 h-screen text-white">
        <NavbarComponent />
        <main class="mx-32 my-10 font-poppins">
            <div class="flex items-center justify-between mb-8">
                <div class="flex justify-between items-center">
                    <h1 class="font-bold text-white text-4xl py-2">Simple ToDoList App</h1>
                </div>
            </div>

            <section>
                <form>
                    <h3 class="mt-2 font-semibold text-2xl mb-3">Add new task:</h3>

                    <div class="flex gap-2">
                        <input
                            type="text"
                            v-model="textInput"
                            placeholder="e.g. Pemweb dapet A"
                            class="placeholder-gray-400 w-3/4 border-2 border-gray-600 rounded-xl bg-gray-700 text-lg text-white px-3 py-2 focus:ring-0 focus:border-blue-500 focus:outline-none"
                        />

                        <!-- dropdown category selction -->
                        <div class="relative w-1/4">
                            <button
                                type="button"
                                class="w-full border-2 border-gray-600 rounded-xl bg-gray-700 font-medium text-lg text-gray-400 px-3 py-2 focus:ring-0 focus:border-gray-600 focus:outline-gray-600 text-left relative"
                                @click="isCategoryOptionsExpanded = !isCategoryOptionsExpanded"
                                @blur="isCategoryOptionsExpanded = false"
                            >
                                <!-- {{ selectedCategory ? selectedCategory.name : categoryPlaceholder }} -->
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
                                    class="absolute left-0 right-0 mt-2 bg-gray-700 border-2 border-gray-600 rounded-lg shadow-lg overflow-hidden"
                                >
                                    <li
                                        v-for="(category, index) in categories"
                                        :key="index"
                                        class="px-3 py-2 text-gray-400 hover:text-white transition-colors duration-300 hover:bg-gray-500 cursor-pointer"
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
                            class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-blue-400 hover:bg-blue-500 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                </form>
            </section>

            <section class="flex flex-col gap-4 mt-8">
                <h2 class="font-semibold text-2xl">Not-started Tasks</h2>
                <div class="flex-row gap-96">
                    <div v-if="unfinishedTask.length === 0" class="font-medium text-lg text-slate-400">
                        There's no task at the moment.
                    </div>

                    <div
                        v-for="task in unfinishedTask"
                        :key="task.id"
                        :class="`todo-item ${task.status === 'not started'}`"
                        class="flex items-center gap-2 mb-2"
                    >
                        <input
                            class="placeholder-gray-400 w-3/4 border-2 border-gray-600 rounded-xl bg-gray-700 text-lg text-white px-3 py-2 focus:ring-0 focus:border-blue-500 focus:outline-none"
                            type="text"
                            v-model="task.title"
                        />

                        <p
                            class="w-1/4 border-2 border-gray-600 rounded-xl bg-gray-700 font-medium text-lg text-white px-3 py-2 text-center"
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
                                class="text-lg absolute inset-0 flex items-center justify-center bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600 transition-all"
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
                    <div v-if="onProgressTask.length === 0" class="font-medium text-lg text-slate-400">
                        There's no on going task at the moment.
                    </div>

                    <div
                        v-for="task in onProgressTask"
                        :key="task.id"
                        :class="`todo-item ${task.status === 'on progress'}`"
                        class="flex items-center gap-2 mb-2"
                    >
                        <input
                            class="placeholder-gray-400 w-3/4 border-2 border-gray-600 rounded-xl bg-gray-700 text-lg text-white px-3 py-2 focus:ring-0 focus:border-blue-500 focus:outline-none"
                            type="text"
                            v-model="task.title"
                        />

                        <p
                            class="w-1/4 border-2 border-gray-600 rounded-xl bg-gray-700 font-medium text-lg text-white px-3 py-2 text-center"
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
                                class="text-lg absolute inset-0 flex items-center justify-center bg-blue-400 text-white rounded-xl cursor-pointer hover:bg-blue-500 transition-all"
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
                    <div v-if="completedTask.length === 0" class="font-medium text-lg text-slate-400">
                        There's no task at the moment.
                    </div>

                    <div
                        v-for="task in completedTask"
                        :key="task.id"
                        :class="`todo-item ${task.status === 'completed'}`"
                        class="flex items-center gap-2 mb-2"
                    >
                        <input
                            class="placeholder-gray-400 w-3/4 border-2 border-gray-600 rounded-xl bg-gray-700 text-lg text-white px-3 py-2 focus:ring-0 focus:border-blue-500 focus:outline-none"
                            type="text"
                            v-model="task.title"
                        />

                        <p
                            class="w-1/4 border-2 border-gray-600 rounded-xl bg-gray-700 font-medium text-lg text-white px-3 py-2 text-center"
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
import NavbarComponent from '@/components/NavbarComponent.vue';
import { watchEffect } from 'vue';

export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            name: '',
            todo: [],
            textInput: '',
            categories: [],
            completedTask: [],
            unfinishedTask: [],
            onProgressTask: [],
            selectedCategory: {},
            categoryTaskCount: 0,
            isFetchingData: false,
            isCategoryOptionsExpanded: false,
            categoryPlaceholder: 'Select category',
        };
    },
    methods: {
        setCategory(category) {
            this.selectedCategory = category;
            this.isCategoryOptionsExpanded = false;
        },

        async unfinishedTodo() {
            this.unfinishedTask = this.todo.filter((task) => task.status === 'not started');
        },

        async progressTodo() {
            this.onProgressTask = this.todo.filter((task) => task.status === 'on progress');
        },

        async completedTodo() {
            this.completedTask = this.todo.filter((task) => task.status === 'completed');
        },

        async getAllTodos() {
            this.todo = [];

            await fetch('http://localhost:3000/api/todo')
                .then((response) => response.json())
                .then((data) => {
                    data.docs.forEach((td) => {
                        this.todo.push({
                            id: td.id,
                            title: td.title,
                            category: td.category.name,
                            status: td.status,
                        });
                    });

                    console.log('[GET] Todo - Successful');
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });

            await this.unfinishedTodo();
            await this.progressTodo();
            await this.completedTodo();
        },
        async getAllCategories() {
            await fetch('http://localhost:3000/api/categories')
                .then((response) => response.json())
                .then((data) => {
                    data.docs.forEach((category) => {
                        this.categories.push({ id: category.id, name: category.name });
                    });

                    console.log('[GET] Categories - Successful');
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        },
        async addTask() {
            if (this.textInput.trim() === '') {
                return;
            }

            const newTask = {
                title: this.textInput,
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
                    this.textInput = '';
                } else {
                    console.error('Failed to add task:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },

        async removeToDo(task) {
            fetch(`http://localhost:3000/api/todo/${task.id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
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
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'on progress' }),
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
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'completed' }),
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
    },
    computed: {
        displayCategory() {
            if (!this.selectedCategory.name) {
                return this.categoryPlaceholder;
            } else {
                return this.selectedCategory.name;
            }
        },
    },
    mounted() {
        this.getAllCategories();

        setInterval(() => {
            if (!this.isFetchingData) {
                this.isFetchingData = true;
                this.getAllTodos().finally(() => {
                    this.isFetchingData = false;
                });
            }
        }, 1000);
    },
};
</script>
