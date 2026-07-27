const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

module.exports.listTodos = async () => {
  const params = {
    TableName: TODO_TABLE,
  };

  try {
    const data = await docClient.send(new ScanCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not retrieve todos",
      }),
    };
  }
};
