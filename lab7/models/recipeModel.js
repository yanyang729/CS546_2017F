/**
 * Created by yangyang on 10/21/17.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceiptSchema = new Schema({
  _id:String,
  title: String,
  ingredients: [
    {
      name: String,
      amount: String
    }
  ],
  steps: [String],
  comments: [
    {
      _id: String,
      poster: String,
      comment: String
    }
  ]
})

const RecipetModel = mongoose.model('ReceiptSchema',ReceiptSchema)

module.exports = RecipetModel
