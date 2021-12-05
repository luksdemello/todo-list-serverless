import { APIGatewayEvent } from "aws-lambda";
import { document } from "../../utils/document";

import { v4 as uuid } from "uuid"

export const handle = async (event: APIGatewayEvent) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body); 

  const todoId = uuid();

  await document.put({
    TableName: 'todo_list',
    Item: {
      id: todoId,
      user_id,
      title,
      done: false,
      deadline
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created successfully',
      todo: {
        id: todoId,
        user_id,
        title,
        done: false,
        deadline
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}