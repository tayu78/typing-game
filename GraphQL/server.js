var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var axios = require('axios');
const cors = require('cors')
// const { response } = require('express');

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
    .get(" https://rywvls44b9.execute-api.us-east-2.amazonaws.com/default/TypingAPI")             //リクエストを飛ばすpath
      .then(response => {
        symbol = response.data
        console.log(response)
        console.log(response.data)
        console.log(typeof(response.data))
    })
    .catch(() => {
      return "error"
    });                 0
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
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');