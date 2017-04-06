const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql')

const Item = require('./types/item')
const Stage = require('./types/stage')
const Task = require('./types/task')
const Subtask = require('./types/subtask')
const { getStages, getTasks, getSubtasks, getItems, saveItem } = require('../lib/db')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getItems: {
      type: new GraphQLList(Item),
      description: 'Get items from the server',
      resolve: () => getItems()
    },
    getStages: {
      type: new GraphQLList(Stage),
      description: 'Get stages from the server',
      resolve: () => getStages()
    },
    getTasks: {
      type: new GraphQLList(Task),
      description: 'Get tasks from the server',
      resolve: () => getTasks()
    },
    getSubtasks: {
      type: new GraphQLList(Subtask),
      description: 'Get subtasks from the server',
      resolve: () => getSubtasks()
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    saveItem: {
      type: Item,
      description: 'Save item',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args) => saveItem(args.name)
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})
