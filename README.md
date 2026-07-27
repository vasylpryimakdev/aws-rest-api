# aws-node-todo

Serverless Node.js TODO API using AWS Lambda and DynamoDB.

This repository contains a Serverless Framework service that deploys a set of Lambda functions to manage TODO items with a DynamoDB table as storage.

## Project overview

- Service name: `aws-node-todo`
- AWS provider runtime: `nodejs24.x`
- Architecture: `arm64`
- DynamoDB table: `todos-table-${sls:stage}`
- Environment variable: `TODO_TABLE`
- CRUD endpoints for TODOs

## API endpoints

The deployed API exposes the following REST routes:

- `POST /todos`
  - Creates a new todo item
  - Request body: `{ "todo": "Buy milk" }`
  - Response: created todo object with `id`, `todo`, `checked`, `createdAt`, `updatedAt`
- `GET /todos/{id}`
  - Retrieves a todo item by ID
- `PUT /todos/{id}`
  - Updates a todo item
  - Request body: `{ "todo": "Buy milk", "checked": true }`
- `DELETE /todos/{id}`
  - Deletes a todo item by ID
- `GET /todos/list`
  - Returns all todo items

## Local setup

Install dependencies:

```bash
npm install
```

## Deployment

Deploy the service using Serverless Framework:

```bash
serverless deploy
```

If you want to deploy to a specific stage, use:

```bash
serverless deploy --stage dev
```

The project uses a parameterized DynamoDB table name, so the deployed table name will be `todos-table-<stage>`.

## Example requests

Create a todo:

```bash
curl -X POST https://<api-id>.execute-api.<region>.amazonaws.com/todos \
  -H "Content-Type: application/json" \
  -d '{"todo":"Write README"}'
```

Get a todo:

```bash
curl https://<api-id>.execute-api.<region>.amazonaws.com/todos/<id>
```

Update a todo:

```bash
curl -X PUT https://<api-id>.execute-api.<region>.amazonaws.com/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"todo":"Write README","checked":true}'
```

Delete a todo:

```bash
curl -X DELETE https://<api-id>.execute-api.<region>.amazonaws.com/todos/<id>
```

List all todos:

```bash
curl https://<api-id>.execute-api.<region>.amazonaws.com/todos/list
```

## Notes

- The DynamoDB table is created as part of the Serverless deployment.
- The Lambda functions use the AWS SDK v3 and DynamoDB Document Client.

## Cleanup

Remove the deployed stack and all resources with:

```bash
serverless remove
```
