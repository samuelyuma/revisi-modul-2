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
                        <!-- dropdown category selction -->
                        <div class="relative w-full">
                            <button
                                class="w-full active:border-2 focus:border-slate-400 border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-left relative"
                                @click="isCategoryOptionsExpanded = !isCategoryOptionsExpanded"
                                @blur="isCategoryOptionsExpanded = false"
                            >
                                {{ selectedCategory }}
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
                                        v-for="(category, index) in categoryOptions"
                                        :key="index"
                                        class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
                                        @mousedown.prevent="setCategory(category)"
                                    >
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
                                @blur="isStatusOptionsExpanded = false"
                            >
                                {{ selectedStatus }}
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ease-in-out"
                                    :class="isStatusOptionsExpanded ? 'rotate-180' : 'rotate-0'"
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
                                    v-show="isStatusOptionsExpanded"
                                    class="absolute left-0 right-0 mt-2 bg-white border border-slate-400 rounded-lg shadow-lg overflow-hidden"
                                >
                                    <li
                                        v-for="(status, index) in statusOptions"
                                        :key="index"
                                        class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
                                        @mousedown.prevent="setStatus(status)"
                                    >
                                        {{ status }}
                                    </li>
                                </ul>
                            </transition>
                        </div>

                        <button
                            @click="addTask"
                            class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all"
                        >
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                </form>
            </section>

            <!-- On Going Tasks -->
            <section class="flex flex-col gap-4 mt-16">
                <h2 class="font-semibold text-2xl">On-going Tasks</h2>
                <div class="flex-row gap-96">
                    <div class="flex items-center gap-2 mb-2" v-for="task in filteredUnfinishedTodo" :key="task.id">
                        <p
                            class="w-1/2 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.timestamp_date }}
                        </p>
                        <p
                            class="w-3/2 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.timestamp_time }}
                        </p>
                        <div v-if="!task.editing" class="w-full">
                            <div class="w-full flex gap-2">
                                <p
                                    class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                                >
                                    {{ task.title }}
                                </p>
                                <p
                                    class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                                >
                                    {{ task.category }}
                                </p>
                                <p
                                    class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                                >
                                    {{ task.status }}
                                </p>
                                <button
                                    class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all"
                                    @click="tandaiSebagaiSelesai(task)"
                                >
                                    <font-awesome-icon icon="fa-solid fa-check" />
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="flex">
                                <input
                                    class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                                    type="text"
                                    v-model="task.title"
                                />
                                <select
                                    v-model="task.category"
                                    class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                                >
                                    <option value="pendidikan">Pendidikan</option>
                                    <option value="kesehatan">Kesehatan</option>
                                </select>
                                <p
                                    class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                                >
                                    <select v-model="task.status">
                                        <option value="not started">Not Started</option>
                                        <option value="on progress">On Progress</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <button
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover-bg-red-600 transition-all"
                            @click="removeTask(task._id)"
                        >
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                        <button
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all"
                            @click="task.editing ? saveTask(task) : editTask(task)"
                        >
                            {{ task.editing ? 'Save' : 'Edit' }}
                        </button>
                    </div>
                    <div class="font-medium text-lg text-gray-600" v-if="filteredUnfinishedTodo.length === 0">
                        There's no task at the moment, santai dulu ga sih :V
                    </div>
                </div>
            </section>

            <!-- Completed Tasks -->

            <section class="flex flex-col gap-5 mt-16">
                <h2 class="font-semibold text-2xl">Completed Tasks</h2>
                <div class="flex-row gap-3">
                    <div class="font-medium text-lg text-gray-600">There's no completed task at the moment.</div>
                    <div class="flex items-center gap-2 mb-2" v-for="task in completedTodo" :key="task.id">
                        <p
                            class="w-5/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.timestamp_date }}
                        </p>
                        <p
                            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.timestamp_time }}
                        </p>
                        <p
                            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.title }}
                        </p>
                        <p
                            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center"
                        >
                            {{ task.category }}
                        </p>
                        <p
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all"
                        >
                            {{ task.status }}
                        </p>
                        <button
                            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                            @click="removeCompletedTask(task._id)"
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
import api from '../../api/api';

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
            content_input: '',
            categoryName: 'pendidikan',
            status: 'not started',
            // filteredUnfinishedTodo: [], // Initialize an empty array for filtered unfinished tasks
        };
    },
    computed: {
        completedTodo() {
            return this.filteredUnfinishedTodo.filter(
                (task) => task.status === 'done' && task.category === this.categoryName
            );
        },
        unfinishedTodo() {
            return this.filteredUnfinishedTodo.filter(
                (task) => task.status === 'not started' && task.category === this.categoryName
            );
        },
    },
    methods: {
        async fetchDataFromBackend() {
            try {
                const todoList = await api.getTodoList();
                this.todo = todoList;
            } catch (error) {
                console.error('Failed to fetch todo list:', error);
            }
        },

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
                    console.log(this.categoryOptions);
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

            const newTaskData = {
                title: this.content_input,
                category: this.categoryName,
                status: this.status,
            };

            try {
                const response = await api.addTask(newTaskData);
                if (response) {
                    const current_date = new Date();
                    const timestamp_date = current_date.toDateString();

                    const timestamp_time =
                        this.zeroPadding(current_date.getHours(), 2) +
                        ':' +
                        this.zeroPadding(current_date.getMinutes(), 2) +
                        ':' +
                        this.zeroPadding(current_date.getSeconds(), 2);

                    const newTask = {
                        title: this.content_input,
                        category: this.categoryName,
                        status: this.status,
                        timestamp_date: timestamp_date,
                        timestamp_time: timestamp_time,
                    };

                    this.todo.push(newTask);

                    if (this.status === 'not started' || this.status === 'on progress') {
                        this.filteredUnfinishedTodo.push(newTask);
                    }

                    this.content_input = '';
                    window.location.reload();
                }
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        },

        async removeTask(id) {
            try {
                await api.deleteTask(id);
                const taskIndex = this.todo.findIndex((task) => task.id === id);

                if (taskIndex !== -1) {
                    this.todo.splice(taskIndex, 1);
                    this.filteredUnfinishedTodo = this.filteredUnfinishedTodo.filter((task) => task.id !== id);
                }
                window.location.reload();
            } catch (error) {
                console.error('Failed to remove task:', error);
            }
        },

        async removeCompletedTask(taskId) {
            try {
                await api.deleteTask(taskId);
                const taskIndex = this.completedTodo.findIndex((task) => task.id === taskId);

                if (taskIndex !== -1) {
                    this.completedTodo.splice(taskIndex, 1);
                }
                window.location.reload();
            } catch (error) {
                console.error('Failed to remove completed task:', error);
            }
        },

        editTask(task) {
            task.editing = true;
            task.backupTitle = task.title;
            task.backupCategory = task.category;
            task.backupStatus = task.status;
        },

        async saveTask(task) {
            task.editing = false;
            try {
                const updatedData = {
                    title: task.title,
                    category: task.category,
                    status: task.status,
                };

                await api.updateTask(task._id, updatedData);

                const current_date = new Date();
                task.timestamp_date = current_date.toDateString();
                task.timestamp_time =
                    this.zeroPadding(current_date.getHours(), 2) +
                    ':' +
                    this.zeroPadding(current_date.getMinutes(), 2) +
                    ':' +
                    this.zeroPadding(current_date.getSeconds(), 2);
            } catch (error) {
                console.error('Gagal menyimpan tugas:', error);
            }
        },

        async tandaiSebagaiSelesai(task) {
            try {
                task.status = 'completed';
                await api.updateTask(task._id, {
                    title: task.title,
                    category: task.category,
                    status: task.status,
                    status: 'completed',
                });
            } catch (error) {
                console.error('Gagal menandai tugas sebagai selesai:', error);
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
        this.fetchDataFromBackend();
        setInterval(this.updateTime, 1000); // update every 1 second
    },
};
</script>
