import AWS from 'aws-sdk';

const authenticate = async (event, _, callback) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();

    try {
        const payload = JSON.parse(event.body);

        const data = await cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
              USERNAME: payload.email,
              PASSWORD: payload.password,
            },
          }).promise();

        console.log(data);

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            isBase64Encoded: false
        })
    } catch (err) {
        console.log(err);
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(err.stack),
            headers: {
                'Content-Type': 'application/json'
            },
            isBase64Encoded: false
        })
    }
}

export default authenticate;