export const handler = (event, context, callback) => {
  const retrieveMessages = event.Records || [];

  if (retrieveMessages) {
    console.log('Retrieve Messages', JSON.stringify(retrieveMessages));

    callback(null, retrieveMessages);
  }
  
  callback(null);
};
