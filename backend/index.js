const Hapi = require('hapi')
const Good = require('Good')
const GraphQL = require('hapi-graphql')
const path = require('path')
const kanbanSchema = require('./schema/index')

// Create a server with a host and port
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(process.cwd(), '../frontend')
      }
    }
  }
})
server.connection({
  host: 'localhost',
  port: 8000
})

// https://www.atroo.de/hapi-js-webpack-and-react-router-with-history-api/
server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }
  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      cors: {
        origin: ['*']
      }
    },
    handler: {
      directory: {
        path: 'build',
        listing: true
      }
    }
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
