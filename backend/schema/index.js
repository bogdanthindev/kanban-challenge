const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql')

const Item = require('./types/item')
const { getItems, saveItem } = require('../lib/db')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getItems: {
      type: new GraphQLList(Item),
      description: 'Get items from the server',
      resolve: () => getItems()
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
