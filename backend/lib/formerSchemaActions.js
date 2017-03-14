const { getItems, saveItem } = require('./db')
const { buildSchema } = require('graphql')

exports.querySchema = buildSchema(`
  type Item {
    name: String,
    _id: String
  }
  type Query {
    getItems: [Item]
  }
  type Mutation {
    saveItem(name: String): Item
  }
`)

exports.routeActions = {
  getItems: () => getItems(),
  saveItem: ({name}) => saveItem(name)
}
