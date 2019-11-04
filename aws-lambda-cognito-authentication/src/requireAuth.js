const requireAuth = (event, context, callback) => {
  callback(null, {
      statusCode: 200,
      body: JSON.stringify({
          message: "This is private, which need authentication"
      }),
      headers: {
          'Content-Type': 'application/json'
      },
      isBase64Encoded: false
  })
}

export default requireAuth;
