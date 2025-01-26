const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

// Get all tasks
exports.getTasks = functions.https.onCall(async (data, context) => {
  try {
    const snapshot = await db
      .collection('tasks')
      .orderBy('createdAt', 'desc')
      .get()

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message)
  }
})

// Create a new task
exports.createTask = functions.https.onCall(async (data, context) => {
  // Extract payload from nested `data` key
  const payload = data.data || data

  // Validate input
  if (!payload.title) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Title is required'
    )
  }

  try {
    const task = {
      title: payload.title,
      description: payload.description || '', // Optional field
      completed: false, // Default value
      createdAt: admin.firestore.FieldValue.serverTimestamp() // Auto-generated timestamp
    }

    const docRef = await db.collection('tasks').add(task)
    return { id: docRef.id, ...task }
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message)
  }
})

// Update an existing task
exports.updateTask = functions.https.onCall(async (data, context) => {
  // Extract payload from nested `data` key
  const payload = data.data || data

  // Validate input
  if (!payload.id || typeof payload.id !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Task ID is required and must be a string'
    )
  }
  if (!payload.updates || typeof payload.updates !== 'object') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Updates must be an object'
    )
  }

  try {
    const taskRef = db.collection('tasks').doc(payload.id)
    const taskDoc = await taskRef.get()

    // Check if the task exists
    if (!taskDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Task not found')
    }

    // Validate updates
    const validUpdates = {}
    if (payload.updates.title && typeof payload.updates.title === 'string') {
      validUpdates.title = payload.updates.title
    }
    if (
      payload.updates.description &&
      typeof payload.updates.description === 'string'
    ) {
      validUpdates.description = payload.updates.description
    }
    if (typeof payload.updates.completed === 'boolean') {
      validUpdates.completed = payload.updates.completed
    }

    await taskRef.update(validUpdates)
    return { id: payload.id, ...validUpdates }
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message)
  }
})

// Delete a task
exports.deleteTask = functions.https.onCall(async (data, context) => {
  // Extract payload from nested `data` key
  const payload = data.data || data

  // Validate input
  if (!payload.id || typeof payload.id !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Task ID is required and must be a string'
    )
  }

  try {
    const taskRef = db.collection('tasks').doc(payload.id)
    const taskDoc = await taskRef.get()

    // Check if the task exists
    if (!taskDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Task not found')
    }

    await taskRef.delete()
    return { success: true }
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message)
  }
})
