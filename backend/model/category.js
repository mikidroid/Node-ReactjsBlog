const mongoose = require('../config/db')
const {Schema} = mongoose

const CategorySchema = new Schema({
  title: {
    type:String,
    required:[true, "Title is required!"],
    unique:[true, "Title already exists!"]
  },
  description: {
    type: String,
    required:[true, "Description is required!"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('category',CategorySchema)