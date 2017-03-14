const Hapi = require('hapi')
const Good = require('Good')
const GraphQL = require('hapi-graphql')
const kanbanSchema = require('./schema/index')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.file('./index.html')
  })
})

server.register({
  register: GraphQL,
  options: {
    query: {
      schema: kanbanSchema,
      graphiql: true
    },
    route: {
      path: '/api',
      config: {}
    }
  }
})

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) {
    throw err // something bad happened loading the plugin
  }

  server.start((err) => {
    if (err) {
      throw err
    }
    server.log('info', 'Server running at: ' + server.info.uri)
  })
})
