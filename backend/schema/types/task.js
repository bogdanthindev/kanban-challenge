const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID
} = require('graphql')

const Subtask = require('./subtask')

module.exports = new GraphQLObjectType({
  name: 'Task',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    collapsed: { type: new GraphQLNonNull(GraphQLBoolean) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    subtaskIds: { type: new GraphQLList(Subtask) }
  }
})
