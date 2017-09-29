/**
 * Created by yangyang on 9/28/17.
 */
const MongoClient = require('mongodb').MongoClient

let fullMongoUrl = 'mongodb://localhost:27017/Yang_Yang_lab4'

let _connection = undefined

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(fullMongoUrl)
  }

  return _connection
}


