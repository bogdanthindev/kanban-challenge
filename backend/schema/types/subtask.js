const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Subtask',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    done: { type: new GraphQLNonNull(GraphQLBoolean) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
})
