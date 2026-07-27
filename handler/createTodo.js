const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v1: uuid } = require("uuid");

const TODO_TABLE = process.env.TODO_TABLE;

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

module.exports.createTodo = async (event) => {
  const timestamp = new Date().getTime();

  const data = JSON.parse(event.body);

  if (typeof data.todo !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Validation Failed",
      }),
    };
  }

  const item = {
    id: uuid(),
    todo: data.todo,
    checked: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const params = {
    TableName: TODO_TABLE,
    Item: item,
  };

  try {
    await docClient.send(new PutCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not create todo",
      }),
    };
  }
};
