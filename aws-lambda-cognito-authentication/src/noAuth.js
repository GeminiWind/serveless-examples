const noAuth = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            message: "This is public API, which no need authentication"
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        isBase64Encoded: false
    })
}

export default noAuth;
