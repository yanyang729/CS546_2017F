/**
 * Created by yangyang on 9/28/17.
 */
const todoItems = require('./todo')
const getDBFn = require('./mongoConnection')

async function main () {
  const createdTask = await todoItems.createTask('My First Task', 'This is the first thing I need to do today')
  console.log(createdTask)

  const db = await getDBFn()
  await db.close()

  console.log('done')
}

main()