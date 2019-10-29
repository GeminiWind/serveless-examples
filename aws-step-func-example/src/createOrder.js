import AWS from 'aws-sdk';

export const handler = async (order, context, callback) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  
  const params = {
    Item: {
     Id: order.data.id, 
     Content: {
      ...order.data.attributes,
      status: 'created',
     }
    }, 
    TableName: 'order-table'
   };

   try {
     const createdItem = await dynamoDb.put(params).promise();

     console.log(createdItem);

     if(createdItem) callback(null, order);
   } catch (e) {
     console.log(e, e.stack);

     callback(e);
   }
};
