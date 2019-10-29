export const handler = (event, context, callback) => {
  if (event) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          type: 'students',
          id: 1,
          attributes: {
            name: 'ThanDV'
          }
        }
      }),
      headers: {},
      isBase64Encoded: false
    })
  }
  
  callback(null);
};
