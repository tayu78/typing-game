const functions = require('firebase-functions');
const express = require("express");
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var axios = require('axios');
const cors = require('cors')



// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Result {
    AverageKeyNumber: String
    CorrectRate: String
  }
  type Query {
    symbol: String
    result(ElappsedTime: String, QuestionNumber: Int, IncorrectNumber: Int): Result
  }
`);
// const elappsedTime = 18.6;
// The root provides a resolver function for each API endpoint
var root = {
  symbol: async () => {
    let symbol;
    await axios
      .get(
        "https://sdd7o4ga3g.execute-api.us-east-2.amazonaws.com/default/symbols"
      )
      .then((response) => {
        symbol = response.data;
        console.log(response);
        console.log(response.data);
        console.log(typeof response.data);
      })
      .catch(() => {
        return "error";
      });
    return symbol;
  },
  result: async ({ ElappsedTime, QuestionNumber, IncorrectNumber }) => {
    // let averageKeyNumber;
    // let correctRate;
    let data;
    await axios
      .get(
        `https://m430j3cfe8.execute-api.us-east-2.amazonaws.com/default/results?ElappsedTime=${ElappsedTime}&QuestionNumber=${QuestionNumber}&IncorrectNumber=${IncorrectNumber}`
      )
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        // console.log(typeof response.data.AverageKeyNumber);
        // console.log(typeof response.data.CorrectRate);
        // averageKeyNumber = response.data.AverageKeyNumber;
        // correctRate = response.data.CorrectRate;
        data = response.data;
      });
    return data;
  },
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
const api = functions.https.onRequest(app);
module.exports = { api };