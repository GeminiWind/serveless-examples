import AWS from 'aws-sdk';

export const handler = (event, context, callback) => {
  const sns = new AWS.SNS();
  
  const params = {
    Message: event.body,
    TopicArn: process.env.TOPIC_ARN
  }

  sns.publish(params, (err, data) => {
    if (err) {
      console.log(err);

      callback(null, {
        statusCode: 500,
        body: JSON.stringify(err.stack),
        headers: {},
        isBase64Encoded: false,
      })
    }

     callback(null, {
        statusCode: 201,
        body: event.body,
        headers: {},
        isBase64Encoded: false
      })
  })
};
