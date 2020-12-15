const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graghql/typeDefs');
const resolvers = require('./graghql/resolvers')

const mongoose = require('mongoose');
const { MONGODB } = require('./config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

const port = process.env.PORT || 5000

mongoose.connect(MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.log(err)
  });

