const koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');

const { apolloKoa, graphiqlKoa } = require('apollo-server');

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

const myGraphQLSchema = require('./schema');
const myGraphQLResolvers = require('./resolvers');

app.use(koaBody());

router.post('/graphql', apolloKoa({ 
  pretty: true,
  schema: myGraphQLSchema,
  resolvers: myGraphQLResolvers
}));
router.get('/graphiql', graphiqlKoa({ 
  endpointURL: '/graphql' 
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

console.log(`Listening on port ${PORT}...`);