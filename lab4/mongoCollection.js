/**
 * Created by yangyang on 9/29/17.
 */
const dbConnection = require('./mongoConnection')

let _col = undefined

async function getCollectionFn () {
  if (!_col) {
    const db = await dbConnection()
    _col = await db.collection('todoItems')
  }
  return _col
}

module.exports = getCollectionFn
