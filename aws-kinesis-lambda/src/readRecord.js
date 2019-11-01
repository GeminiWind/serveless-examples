const readRecord = (event, _, callback) => {
    const kinesisRecords = event.Records || [];

    if (kinesisRecords) {
      console.log('Retrieved Records', JSON.stringify(kinesisRecords));
  
      callback(null, kinesisRecords);
    }
    
    callback(null);
}

export default readRecord;
