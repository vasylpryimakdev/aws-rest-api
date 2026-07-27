const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

module.exports.deleteTodo = async (event) => {
  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    await docClient.send(new DeleteCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Deletion successful!",
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not delete todo",
      }),
    };
  }
};
