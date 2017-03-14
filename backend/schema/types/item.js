const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Item',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: new GraphQLNonNull(GraphQLID) }
  }
})
