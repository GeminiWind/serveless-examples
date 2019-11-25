const AWS = require('aws-sdk');
const SFTPClient = require('ssh2-sftp-client');
const config = require('./config');

const syncSFTPFileToS3 = async (event, _, callback) => {
    const s3 = new AWS.S3();
    if (event.Records && event.Records.length > 0) {
        let client = new SFTPClient();
        await client.connect(config.sftpConfig);

        await Bluebird.map(event.Records, async (record) => {
            const body = JSON.parse(record.body);

            const buf = new Buffer();
            await sftp.get(`${config.sftpDir}/${body.mappedKey}`, buf);

            await s3.upload({
                Body: buf,
                Key: body.mappedKey,
                Bucket: config.s3Bucket,
                Metadata: {
                    Synced: "true"
                }
            }).promise();
        });

        await client.end();

    }
    callback(null, 'Done');
}

module.exports = syncSFTPFileToS3;
