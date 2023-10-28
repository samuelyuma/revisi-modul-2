<template>
  <div>
    <NavbarComponent />
    <main class="mx-32 my-10 font-poppins">
      <div class="flex items-center justify-between mb-8">
        <div class="flex justify-between items-center">
          <h1 class="font-bold text-slate-800 text-4xl py-2">To-Do List</h1>
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
          <div class="flex gap-2 mb-2 w-full">
            <div class="w-full">
              <h1 class="text-[24px]">Title</h1>
              <input type="text" placeholder="Title" v-model="content_input"
                class="border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-900 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center" />
            </div>
            <div class="w-full">
              <h1 class="text-[24px]">Category</h1>
              <select v-model="categoryName"
                class="border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-900 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center">
                <option value="pendidikan">Pendidikan</option>
                <option value="kesehatan">Kesehatan</option>
              </select>
            </div>
            <div class="w-full">
              <h1 class="text-[24px]">Status</h1>
              <select v-model="status"
                class="border-2 border-slate-400 rounded-xl bg-slate-200 font-semibold text-lg text-slate-900 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400 text-center">
                <option value="not started">Not Started</option>
                <option value="on progress">On Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button type="submit"
              class="text-white font-medium text-lg px-12 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 transition-all">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
          </div>
        </form>
      </section>

      <section class="flex flex-col gap-4 mt-16">
        <h2 class="font-semibold text-2xl">On-going Tasks</h2>
        <div class="flex-row gap-96">
          <div class="flex items-center gap-2 mb-2" v-for="task in filteredUnfinishedTodo" :key="task.id">
            <p
              class="w-3/2 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
              {{ task.timestamp_date }}
            </p>
            <p
              class="w-3/2 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
              {{ task.timestamp_time }}
            </p>
            <div v-if="!task.editing">
              <div class="w-full flex ">
                <p
                  class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
                  {{ task.title }}
                </p>
                <p
                  class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
                  {{ task.category }}
                </p>
                <p
                  class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
                  <select v-model="task.status">
                    <option value="not started">Not Started</option>
                    <option value="on progress">On Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </p>
              </div>
            </div>
            <div v-else>
              <div class="flex">
                <input
                  class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                  type="text" v-model="task.title" />
                <input
                  class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
                  type="text" v-model="task.category" />
              </div>
            </div>
            <button
              class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
              @click="removeTask(filteredUnfinishedTodo.indexOf(task))">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
            <button
              class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all"
              @click="task.editing = !task.editing">
              {{ task.editing ? "Save" : "Edit" }}
            </button>
          </div>
          <div class="font-medium text-lg text-gray-600" v-if="filteredUnfinishedTodo.length === 0">
            There's no task at the moment, santai dulu ga sih :V
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-5 mt-16">
        <h2 class="font-semibold text-2xl">Completed Tasks</h2>
        <div class="flex-row gap-3">
          <div class="font-medium text-lg text-gray-600">There's no completed task at the moment.</div>
          <div class="flex items-center gap-2 mb-2" v-for="task in completedTodo" :key="task.id">
            <p
              class="w-5/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
              {{ task.timestamp_date }}
            </p>
            <p
              class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
              {{ task.timestamp_time }}
            </p>
            <input
              class="w-3/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
              type="text" v-model="task.title" />
            <input
              class="w-3/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
              type="text" v-model="task.category" />
            <input
              class="w-3/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
              type="text" v-model="task.status" />
            <button class="text-white text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
  components: {
    NavbarComponent,
  },
  data() {
    return {
      name: '', // name of the category
      date: '', // initialize empty string for date
      time: '', // initialize empty string for time
      week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      content_input: '',
      categoryName: '',
      status: '',
      todo: [], // initialize empty array for todo list
      filteredUnfinishedTodo: [], // Initialize an empty array for filtered unfinished tasks
    };
  },
  computed: {
    completedTodo() {
      return this.todo.filter((task) => task.status === 'completed');
    },
  },
  methods: {
    async addTask() {
      if (this.content_input.trim() === '') {
        return;
      }

      const current_date = new Date();
      const timestamp_date =
        this.week[current_date.getDay()] +
        ', ' +
        this.zeroPadding(current_date.getDate(), 2) +
        ' - ' +
        this.zeroPadding(current_date.getMonth() + 1, 2) +
        ' - ' +
        this.zeroPadding(current_date.getFullYear(), 4);

      const timestamp_time =
        this.zeroPadding(current_date.getHours(), 2) +
        ':' +
        this.zeroPadding(current_date.getMinutes(), 2) +
        ':' +
        this.zeroPadding(current_date.getSeconds(), 2);

      const newTask = {
        title: this.content_input,
        publishedDate: new Date().toISOString(),
        category: this.categoryName, // Menggunakan nilai dari category
        status: this.status, // Menggunakan nilai dari status
        timestamp_date: timestamp_date,
        timestamp_time: timestamp_time,
      };

      this.todo.push(newTask);

      // Jika tugas ditambahkan dan memiliki status 'not started' atau 'on progress', tambahkan ke filteredUnfinishedTodo.
      if (this.status === 'not started' || this.status === 'on progress') {
        this.filteredUnfinishedTodo.push(newTask);
      }

      this.content_input = '';
    },
    removeTask(index) {
      // Hapus tugas dari todo dan filteredUnfinishedTodo
      this.todo.splice(index, 1);
      this.filteredUnfinishedTodo = this.filteredUnfinishedTodo.filter((task, i) => i !== index);
    },
    updateTime() {
      const current_date = new Date();
      this.date =
        this.week[current_date.getDay()] +
        ', ' +
        this.zeroPadding(current_date.getDate(), 2) +
        ' - ' +
        this.zeroPadding(current_date.getMonth() + 1, 2) +
        ' - ' +
        this.zeroPadding(current_date.getFullYear(), 4);

      this.time =
        this.zeroPadding(current_date.getHours(), 2) +
        ':' +
        this.zeroPadding(current_date.getMinutes(), 2) +
        ':' +
        this.zeroPadding(current_date.getSeconds(), 2);
    },
    zeroPadding(num, digit) {
      let zero = '';
      for (let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
  },
  mounted() {
    this.updateTime();
    // setInterval(this.updateTime, 1000);
  },
};
</script>
