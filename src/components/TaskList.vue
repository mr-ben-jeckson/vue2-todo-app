<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="flex justify-between p-4 border-b bg-green-300">
        <h3 class="text-lg font-bold">Task Lists</h3>
        <div class="space-x-2">
          <button
            @click="filter = 'all'"
            :class="[
              'px-3 py-1 rounded',
              filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            ]"
          >
            All
          </button>
          <button
            @click="filter = 'pending'"
            :class="[
              'px-3 py-1 rounded',
              filter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            ]"
          >
            Todo
          </button>
          <button
            @click="filter = 'completed'"
            :class="[
              'px-3 py-1 rounded',
              filter === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200'
            ]"
          >
            Completed
          </button>
        </div>
      </div>

      <ul class="divide-y divide-gray-200">
        <li v-for="task in filteredTasks" :key="task.id" class="p-4">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h4 class="text-lg font-semibold">{{ task.title }}</h4>
              <p
                class="text-gray-600"
                :class="{ 'line-through': task.completed }"
              >
                {{ task.description }}
              </p>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  task.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ task.completed ? 'Completed' : 'Todo' }}
              </span>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editTask(task)"
                class="px-2 py-1 rounded text-blue-600 hover:text-blue-800 bg-gray-200 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                @click="deleteTask(task.id)"
                class="px-2 py-1 rounded text-white bg-red-600 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TaskList',
  data () {
    return {
      filter: 'all'
    }
  },
  computed: {
    ...mapGetters(['allTasks', 'completedTasks', 'pendingTasks']),
    filteredTasks () {
      switch (this.filter) {
        case 'completed':
          return this.completedTasks
        case 'pending':
          return this.pendingTasks
        default:
          return this.allTasks
      }
    }
  },
  methods: {
    editTask (task) {
      this.$emit('edit', task)
    },
    deleteTask (taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.$store.dispatch('deleteTask', taskId)
        this.$emit('delete', taskId)
      }
    }
  }
}
</script>
