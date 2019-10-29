const handler = (event, context, callback) => {
  const messages = event.Records || [];
  
  if (messages) {
    console.log(JSON.stringify(messages));
    
    callback(null, messages);
  } else {
    callback("No message retreived.");
  }
};

export { handler };