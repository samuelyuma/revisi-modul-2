<template>
  <main class="mx-32 my-20 font-poppins">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-slate-800 text-4xl py-2">{{ name }}</h1>

      <!-- Routing ✅ -->
      <router-link to="/"><button
          class="text-white font-medium text-md px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all">
          Back to home
        </button></router-link>
    </div>
    <div class="text-black font-medium text-md pt-1">
      {{ date }}
      <br>
      {{ time }}
    </div>
    <section>
      <!-- Event handling ✅ v-on (@submit.prevent): prevent reload -->
      <form @submit.prevent="addTask">
        <h3 class="mt-12 font-semibold text-2xl mb-3">Add new task:</h3>
        <div class="flex gap-2">

          <!-- Input bindings ✅ v-model: automatically update variable content_input to user input -->
          <input type="text" v-model="content_input" placeholder="e.g. pemweb dapet A"
            class="w-full border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400" />

          <!-- Event handling ✅ v-on (@): calls method when button is clicked -->
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
        <!-- List rendering ✅ v-for: render array -->
        <div v-for="task in unfinishedTodo" :key="task.title"
          :class="`todo-item ${task.status === 'done' ? 'done' : ''}`" class="flex items-center gap-2 mb-2">

          <!-- Render task details as before -->
          <p
            class="w-5/12 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
            {{ task.timestamp_date }}
          </p>
          <p
            class="w-1/6 border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 text-center">
            {{ task.timestamp_time }}
          </p>
          <input
            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
            type="text" v-model="task.title" />
          <label class="relative">
            <input class="appearance-none bg-slate-200 py-5 px-6 rounded-xl cursor-pointer" type="checkbox"
              v-model="task.status" />
            <span
              class="text-lg absolute inset-0 flex items-center justify-center bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-600 transition-all">
              <font-awesome-icon icon="fa-solid fa-check" />
            </span>
          </label>
          <button @click="removeToDo(task)"
            class="text-white font-medium text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>

        <!-- Conditional rendering ✅ v-if: only render if there's no task to do -->
        <div v-if="unfinishedTodo.length === 0" class="font-medium text-lg text-gray-600">
          There's no task at the moment, santai dulu ga sih :V
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-5 mt-16">
      <h2 class="font-semibold text-2xl">Completed Tasks</h2>
      <div class="flex-row gap-3">

        <!-- Conditional rendering ✅ v-if: only render if there's no completed task -->
        <div v-if="completedTodo.length === 0" class="font-medium text-lg text-gray-600">
          There's no completed task at the moment.
        </div>
        <div v-for="task in completedTodo" :key="task.title"
          :class="`todo-item ${task.status === 'done' ? 'done' : ''}`" class="flex items-center gap-2 mb-2">

          <!-- Render task details as before -->
          <p
            class="w-5/12 text-center border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2">
            {{ task.timestamp_date }}
          </p>
          <p
            class="w-1/6 text-center border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2">
            {{ task.timestamp_time }}
          </p>
          <input
            class="w-screen border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-lg text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
            type="text" v-model="task.title" />
          <label class="relative">
            <input class="appearance-none py-5 px-6 rounded-xlcursor-pointer" type="checkbox" v-model="task.status" />
            <span
              class="text-lg absolute inset-0 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-xl cursor-pointer transition-all">
              <font-awesome-icon icon="fa-solid fa-x" />
            </span>
          </label>
          <button @click="removeToDo(task)"
            class="text-white text-lg px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 transition-all">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      todo: [], // initialize empty array for todo list
      content_input: '', // initialize empty string for todo content
      date: '', // initialize empty string for date
      time: '', // initialize empty string for time
      week: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      name: '', // name of the category
      categoryName: '',
      categoryTaskCount: 0,
    };
  },
  computed: {
    completedTodo() {
      return this.todo.filter(
        (task) => task.status === 'done' && task.category === this.categoryName
      );
    },
    unfinishedTodo() {
      return this.todo.filter(
        (task) => task.status !== 'done' && task.category === this.categoryName
      );
    },
    categoryTaskCount() {
      return this.todo.filter(
        (task) => task.category === this.categoryName
      ).length;
    },
  },

  methods: {
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
    zeroPadding(num, digit) { // formatting leading zeros
      let zero = '';
      for (let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit); // ensure has requested digits
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000); // update every 1 second  
  },
  created() {
    this.categoryName = this.$route.params.categoryName;
    this.name = this.categoryName;
  },
};
</script>
