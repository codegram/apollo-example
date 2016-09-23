const express = require('express');
const bodyParser = require('body-parser');

const { apolloExpress, graphiqlExpress } = require('apollo-server');
const Schema = require('./schema');
const Resolvers = require('./resolvers');

const GRAPHQL_PORT = 3000;

const cors = require('express-cors');

var graphQLServer = express();

graphQLServer.use(cors({
    allowedOrigins: [
        'localhost:8080'
    ]
}));

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: Schema
}));

graphQLServer.use('/graphiql', bodyParser.json(), graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));