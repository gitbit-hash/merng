const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors')
const typeDefs = require('./graghql/typeDefs');
const resolvers = require('./graghql/resolvers');
const { graphqlUploadExpress } = require('graphql-upload');

const mongoose = require('mongoose');
const { MONGODB } = require('./config');

const app = express();

app.use(cors());
app.use(graphqlUploadExpress());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: ({ req }) => ({ req })
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000

mongoose.connect(MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB connected');
    return app.listen({ port: PORT }, () =>
      console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
    )
  })
  .catch(err => {
    console.log(err)
  });

