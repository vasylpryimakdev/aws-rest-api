const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

exports.createTodo = async (e, ctx) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello" }),
  };
};
