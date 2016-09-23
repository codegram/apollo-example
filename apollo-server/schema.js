const superagent = require('superagent');

const { makeExecutableSchema } = require('graphql-tools');
const { addResolveFunctionsToSchema } = require('graphql-tools');

const logger = { log: (e) => console.log(e) };

const typeDefs = [`
  schema {
    query: RootQuery
  }

  type RootQuery {
    dogs(ids: [Int]): [Dog]
  }

  type Dog {
    id: Int,
    name: String
    age: Int,
    friends: [Dog]
  }
`];

const connectors = {
  Dog: {
    findAll({ ids }) {
      return new Promise ((resolve, reject) => {
        superagent
          .get(`http://dogs-api:4000/dogs?ids=${ids}`)
          .end(function (err, res) {
            resolve(JSON.parse(res.text).dogs);
          });
      });
    },
    findFriends({ id }) {
      return new Promise ((resolve, reject) => {
        superagent
          .get(`http://dogs-api:4000/dogs/${id}/friends`)
          .end(function (err, res) {
            resolve(JSON.parse(res.text).dogs);
          });
      });
    }
  }
};

const resolvers = {
  RootQuery: {
    dogs(root, { ids }) {
      return connectors.Dog.findAll({ ids });
    }
  },
  Dog: {
    friends(dog) {
      return connectors.Dog.findFriends(dog);
    }
  }
};



const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger
});

module.exports = jsSchema;