import stream from 'stream';
import AWS from 'aws-sdk';
import SFTPClient from 'ssh2-sftp-client';
import config from './config';

const syncSFTPFileToS3 = async (event, _, callback) => {
    const s3 = new AWS.S3();

    if (event.Records && event.Records.length > 0) {
        let client = new SFTPClient();
        await client.connect(config.sftpConfig);

        await Bluebird.map(event.Records, async (record) => {
            const body = JSON.parse(record.body);

            const dstStream = new stream.PassThrough();
            await client.get(`${config.sftpDir}/${body.mappedKey}`, dstStream);

            await s3.upload({
                Body: dstStream,
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

export default syncSFTPFileToS3;
