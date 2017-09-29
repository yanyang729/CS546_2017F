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

  let todoItems = await getCollectionFn()
  const insertInfo = await todoItems.insert(todoItem)

  if (insertInfo.insertedCount === 0) throw 'failed to add a new todo item'

  return await getTask(newId)

}

async function getAllTasks () {
  return todoItems
}

async function getTask (id) {
  if (!id) throw 'no id provided'

  let todoItems = await getCollectionFn()
  const todoItem = await todoItems.findOne({_id: id})
  if (todoItems === null) throw 'no todo item given this id'

  return todoItem
}

async function completeTask (taskId) {
  if (!taskId) throw 'no id provided'
}

async function removeTask (id) {

}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  completeTask,
  removeTask
}