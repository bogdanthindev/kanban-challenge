const mongoose = require('mongoose')
exports.stageSchema = mongoose.Schema({
  name: String,
  order: Number,
  stageSlug: String,
  color: String
})

exports.taskSchema = mongoose.Schema({
  name: String,
  description: String,
  collapsed: Boolean,
  stage: String,
  subtaskIds: Array
})

exports.subtaskSchema = mongoose.Schema({
  taskId: String,
  name: String,
  done: Boolean
})
