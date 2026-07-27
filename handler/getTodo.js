const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const TODO_TABLE = process.env.TODO_TABLE;

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

module.exports.getTodo = async (event) => {
  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const data = await docClient.send(new GetCommand(params));

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Todo not found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not retrieve todo",
      }),
    };
  }
};
