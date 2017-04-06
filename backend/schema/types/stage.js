const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Stage',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    order: { type: new GraphQLNonNull(GraphQLInt) },
    stageSlug: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLString }
  }
})
