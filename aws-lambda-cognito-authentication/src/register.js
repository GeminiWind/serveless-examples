import AWS from 'aws-sdk';

const register = async (event, _, callback) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();

    try {
        const payload = JSON.parse(event.body);

        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Password: payload.password,
            Username: payload.email,
        }

        const data = await cognito.signUp(params).promise();

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

export default register;