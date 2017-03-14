const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/kanban')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to DB'))

const kanbanItem = mongoose.Schema({
  name: String
})
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
