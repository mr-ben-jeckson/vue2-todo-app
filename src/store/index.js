import Vue from 'vue'
import Vuex from 'vuex'
import { getFunctions, httpsCallable } from 'firebase/functions' // Import from modular Firebase v9
import { firebaseApp } from '../firebase/config' // Ensure this is your initialized Firebase app

Vue.use(Vuex)

// Initialize Firebase Functions
const functions = getFunctions(firebaseApp)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK (state, task) {
      state.tasks.unshift(task) // Adding at the start of array
    },
    UPDATE_TASK (state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
      }
    },
    DELETE_TASK (state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
    }
  },
  actions: {
    async fetchTasks ({ commit }) {
      try {
        const getTasks = httpsCallable(functions, 'getTasks') // Use modular httpsCallable
        const result = await getTasks()
        commit('SET_TASKS', result.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },
    async createTask ({ commit }, taskData) {
      try {
        const createTask = httpsCallable(functions, 'createTask') // Use modular httpsCallable
        const result = await createTask(taskData)
        commit('ADD_TASK', result.data)
      } catch (error) {
        console.error('Error creating task:', error)
      }
    },
    async updateTask ({ commit }, { id, updates }) {
      try {
        const updateTask = httpsCallable(functions, 'updateTask') // Use modular httpsCallable
        const result = await updateTask({ id, updates })
        commit('UPDATE_TASK', result.data)
      } catch (error) {
        console.error('Error updating task:', error)
      }
    },
    async deleteTask ({ commit }, taskId) {
      try {
        const deleteTask = httpsCallable(functions, 'deleteTask') // Use modular httpsCallable
        await deleteTask({ id: taskId })
        commit('DELETE_TASK', taskId)
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  },
  getters: {
    allTasks: state => state.tasks,
    completedTasks: state => state.tasks.filter(task => task.completed),
    pendingTasks: state => state.tasks.filter(task => !task.completed)
  }
})
