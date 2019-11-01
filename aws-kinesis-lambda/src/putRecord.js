import AWS from 'aws-sdk';

const putRecord = async (event, _, callback) => {
    const kinesis = new AWS.Kinesis();

    const params = {
        Data: event.body,
        PartitionKey: 'orders',
        StreamName: process.env.STREAM_NAME,
    }

    try {
        const data = await kinesis.putRecord(params).promise();

        callback(null, {
            statusCode: 201,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            isBase64Encoded: false
          })
        
    } catch (err) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(err.stack),
            headers: {},
            isBase64Encoded: false,
          })
    };


}

export default putRecord;
