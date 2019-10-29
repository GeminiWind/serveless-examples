import AWS from 'aws-sdk';

const handler = (event, context, callback) => {
  const sqs = new AWS.SQS();

  const params = {
    QueueUrl: process.env.QUEUE_URL,
    Entries: [
      {
        Id: '1',
        MessageBody: 'Test Message 1',
      },
      {
        Id: '2',
        MessageBody: 'Test Message 2',
      }
    ]
  }

  sqs.sendMessageBatch(params, (error, data) => {
    if (error) {
      console.log(error);
      callback(error, error.stack)
    };
    callback(null, {
      "statusCode": 201,
      "body": JSON.stringify(params.Entries),
      "headers": {
        "Content-Type": "application/json"
      },
      "isBase64Encoded": false
    });
  })
};

export { handler };