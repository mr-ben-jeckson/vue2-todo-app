<template>
  <div class="w-full">
    <div class="w-full bg-white flex justify-center items-center my-5">
      <div class="mb-2">
        <h1 class="text-2xl font-bold text-center text-blue-600">
          To Do App - Vue 2 Application
        </h1>
      </div>
    </div>
    <div class="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <!-- Left Column: Task Form -->
        <div class="w-full lg:w-1/2">
          <task-form :task="selectedTask" @submitted="handleFormSubmit" />
        </div>

        <!-- Right Column: Task List -->
        <div class="w-full lg:w-1/2">
          <task-list @edit="handleEdit" @delete="handleFormSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList
  },
  data () {
    return {
      selectedTask: null
    }
  },
  created () {
    // Set document title
    document.title = 'To Do App'

    // Set Meta Tags
    const metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    metaDescription.content =
      'To Do App is developed by Ben. Test Objective from Codeboxx.Co,Ltd'
    document.head.appendChild(metaDescription)

    const metaAuthor = document.createElement('meta')
    metaAuthor.name = 'author'
    metaAuthor.content = 'Ben'
    document.head.appendChild(metaAuthor)

    // Fetch tasks
    this.$store.dispatch('fetchTasks')
  },
  methods: {
    handleEdit (task) {
      this.selectedTask = task
    },
    handleFormSubmit () {
      this.selectedTask = null
    }
  }
}
</script>
