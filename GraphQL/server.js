var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var axios = require('axios');
const cors = require('cors')
const expressPlayground = require("graphql-playground-middleware-express").default;
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();



// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    symbol: String
  }
`);
 
// The root provides a resolver function for each API endpoint
var root = {
  symbol: async () => {
    let symbol;
    await axios
    .get(" https://rywvls44b9.execute-api.us-east-2.amazonaws.com/default/TypingAPI")
      .then(response => {
        symbol = response.data
        console.log(response)
        console.log(response.data)
        console.log(typeof(response.data))
    })
    .catch(() => {
      return "error"
    }); 
   return symbol 
  },
};
 


var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
const api = functions.https.onRequest(app);
module.exports = { api };
// const port = 80;
// app.listen(80);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');