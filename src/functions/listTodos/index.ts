import { APIGatewayEvent } from "aws-lambda";

import { document } from '../../utils/document';


export const handle = async (event: APIGatewayEvent) => {
  const { user_id } = event.pathParameters;

  const response = await document.query({
    TableName: 'todo_list',
    KeyConditionExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ":user_id" :user_id
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items),
    headers: {
      "Content-Type": "application/json"
    }
  }
}