<template>
  <div class="max-w-md mx-auto bg-green-300 p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">
      {{ isEditing ? 'Edit Task' : 'Create Task' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Enter title"
          required
          class="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="form.description"
          placeholder="What's your plan"
          class="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="form.completed"
              :value="false"
              class="form-radio"
            />
            <span class="ml-2">Todo</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              v-model="form.completed"
              :value="true"
              class="form-radio"
            />
            <span class="ml-2">Completed</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        :disabled="isEditing && !hasChanges"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ isEditing ? 'Update Task' : 'Create Task' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        title: '',
        description: '',
        completed: false
      },
      originalTask: null // Store the original task data for comparison
    }
  },
  computed: {
    isEditing () {
      return !!this.task
    },
    hasChanges () {
      if (!this.isEditing) return true // Always enable the button for "Create Task"
      return (
        this.form.title !== this.originalTask.title ||
        this.form.description !== this.originalTask.description ||
        this.form.completed !== this.originalTask.completed
      )
    }
  },
  watch: {
    task: {
      handler (newVal) {
        if (newVal) {
          // If task is provided, populate the form with its data
          this.form = { ...newVal }
          this.originalTask = { ...newVal } // Store the original task data
        } else {
          // If task is null, reset the form
          this.resetForm()
        }
      },
      immediate: true // Trigger the handler immediately when the component is created
    }
  },
  methods: {
    handleSubmit () {
      if (this.isEditing) {
        this.$store.dispatch('updateTask', {
          id: this.task.id,
          updates: this.form
        })
      } else {
        this.$store.dispatch('createTask', this.form)
      }
      this.resetForm()
    },
    resetForm () {
      this.form = {
        title: '',
        description: '',
        completed: false
      }
      this.originalTask = null // Reset the original task data
      this.$emit('submitted')
    }
  }
}
</script>
