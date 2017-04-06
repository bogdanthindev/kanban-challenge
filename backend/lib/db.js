const mongoose = require('mongoose')
const { stageSchema, taskSchema, subtaskSchema } = require('./dbSchema')

mongoose.connect('mongodb://localhost/kanban')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to DB'))

const kanbanItem = mongoose.Schema({
  name: String
})

const Stage = mongoose.model('stage', stageSchema)
const Task = mongoose.model('task', taskSchema)
const Subtask = mongoose.model('subtask', subtaskSchema)
const Item = mongoose.model('item', kanbanItem)

exports.saveItem = (name) => {
  const item = new Item({name})
  return new Promise((resolve, reject) => {
    item.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        resolve(item)
      }
    })
  })
}

exports.getItems = () => {
  return new Promise((resolve, reject) => {
    Item.find((err, items) => {
      if (err) {
        reject(err)
      } else {
        resolve(items)
      }
    })
  })
}

exports.getStages = () => {
  return new Promise((resolve, reject) => {
    Stage.find((err, stages) => {
      if (err) {
        reject(err)
      } else {
        resolve(stages)
      }
    })
  })
}

exports.getTasks = () => {
  return new Promise((resolve, reject) => {
    Task.find((err, tasks) => {
      if (err) {
        reject(err)
      } else {
        resolve(tasks)
      }
    })
  })
}

exports.getSubtasks = () => {
  return new Promise((resolve, reject) => {
    Subtask.find((err, subtasks) => {
      if (err) {
        reject(err)
      } else {
        resolve(subtasks)
      }
    })
  })
}
