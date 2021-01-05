var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var axios = require('axios');
const { response } = require('express');

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
    .get(" https://em7p0wkwy2.execute-api.us-east-2.amazonaws.com/default/typing")             //リクエストを飛ばすpath
      .then(response => {
        symbol = response.data.data
        console.log(response.data)
        console.log(response.data.data)
        console.log(typeof(response.data.data))
    })
    .catch(() => {
      return "error"
    });                 
   return symbol 
  },
};
 


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');