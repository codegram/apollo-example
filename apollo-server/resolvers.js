const { Dog } = require('./connectors');

const resolveFunctions = {
  RootQuery: {
    dog() {
      return Dog.find();
    }
  }
};

module.exports = resolveFunctions;