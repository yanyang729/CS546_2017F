/**
 * Created by yangyang on 9/28/17.
 */
const todo = require('./todo')
const getDBFn = require('./mongoConnection')


async function main () {
  try{
    // create task
    const createdTask1 = await todo.createTask("Ponder Dinosaurs",
      'Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?')
    console.log('created task:')
    console.log(createdTask1)


    // after log, create a new task
    const createdTask2 = await todo.createTask("Play Pokemon with Twitch TV",
      'Should we revive Helix?')
    console.log('created task:')
    console.log(createdTask2)

    // After the task is inserted, query all tasks and log them
    const allTasks = await todo.getAllTasks()
    console.log('All tasks:')
    console.log(allTasks)

    // After all the tasks are logged, remove the first task
    await todo.removeTask(createdTask1._id)
    console.log('First task removed')

    // Query all the remaining tasks and log them
    const remainingTasks = await todo.getAllTasks()
    console.log('Remaining tasks')
    console.log(remainingTasks)

    // Complete the remaining task and log the task that has been completed with its new value.
    for (let task of remainingTasks) {
      const completedTask = await todo.completeTask(task._id)
      console.log('Completed remaining task:')
      console.log(completedTask)
    }

    const db = await getDBFn()
    await db.close()

    console.log('done')
  } catch (e) {
    throw e
  }
}

main()