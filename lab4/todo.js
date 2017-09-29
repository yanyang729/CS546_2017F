/**
 * Created by yangyang on 9/28/17.
 */
const uuidv1 = require('uuid/v1')

const getCollectionFn = require('./mongoCollection')

async function createTask (title, description) {
  if (!title) throw 'title is missing'
  if (!description) throw 'description is missing'

  const newId = uuidv1()
  let todoItem = {
    _id: newId,
    title: title,
    description: description,
    completed: false,
    completedAt: null
  }

  let todoItemsCol = await getCollectionFn()
  const insertInfo = await todoItemsCol.insert(todoItem)

  if (insertInfo.insertedCount === 0) throw 'failed to add a new todo item'

  return await getTask(newId)

}

async function getAllTasks () {
  let todoItemsCol = await getCollectionFn()
  const todoItems = await todoItemsCol.find({}).toArray()
  return todoItems
}

async function getTask (id) {
  if (!id) throw 'no id provided'

  let todoItemsCol = await getCollectionFn()
  const todoItem = await todoItemsCol.findOne({_id: id})
  if (todoItem === null) throw 'no todo item given this id'

  return todoItem
}

async function completeTask (taskId) {
  if (!taskId) throw 'no id provided'
  const todoItemsCol = await getCollectionFn()
  let todoItemUpdated = await getTask(taskId)
  todoItemUpdated.completed = true
  todoItemUpdated.completedAt = Date.now()

  const updateInfo = await todoItemsCol.updateOne({_id: taskId}, todoItemUpdated)
  if (updateInfo.modifiedCount === 0) throw `cannot update ${taskId}`

  return await getTask(taskId)
}

async function removeTask (id) {
  if (!id) throw 'no id provided'
  const todoItemsCol = await getCollectionFn()
  const deleteInfo = await todoItemsCol.removeOne({_id: id})
  if (deleteInfo.deletedCount === 0) {
    throw `cannot delete ${id}`
  } else {
    return true
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  completeTask,
  removeTask
}