import AWS from 'aws-sdk';

export const handler = async (order, _, callback) => {
  const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
  
  const params = {
    TableName: 'order-table',
    Key: {
      Id: order.data.id,
    },
    UpdateExpression: 'set #content.#status = :status',
    ExpressionAttributeNames: {
      '#content' : 'Content',
      '#status': 'status'
    },
    ExpressionAttributeValues: {
      ':status' : 'proccessed',
    },
    ReturnValues: "UPDATED_NEW"
   };

   try {
     const updatedItem = await dynamoDbClient.update(params).promise();

     console.log(updatedItem);

     if(updatedItem) callback(null, order);
   } catch (e) {
     console.log(e, e.stack);

     callback(e);
   }
};
