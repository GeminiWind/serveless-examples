import Bluebird from 'bluebird';
import AWS from 'aws-sdk';
import SFTPClient from 'ssh2-sftp-client';
import get from 'lodash.get';
import config from './config';

const syncS3ToSFTP = async (event, _, callback) => {
    let S3Records
    if (event.Records && event.Records.length > 0 ) {
        S3Records = event.Records.map(r => ({
            Key: r.s3.object.key,
            Bucket: r.s3.bucket.key
         }));
    }

    if (S3Records && S3Records.length > 0) {
        const s3 = new AWS.S3();

        // connecting SFTP Server
        let client = new SFTPClient();
        await client.connect(config.sftpConfig);

        await Bluebird.map(S3Records, async (S3Record) => {
            const objMetaData = await s3.headObject(S3Record).promise();
            if (get(objMetaData, "Metadata.Synced") !== "true") {
                console.log(`Syncing ${S3Record.Key} in bucket ${S3Record.Bucket} to SFTP server...`);
                try {
                    const readStream = s3.getObject(S3Record).createReadStream();
                    await client.put(readStream, `${config.sftpDir}/${S3Record.Key}`);
                } catch (error) {
                    console.log('Error in syncing object to SFTP', err);

                    callback(err);
                }
            }
        });

        // end connection
        await client.end();
    }

    callback(null, 'Done');
}

export default syncS3ToSFTP;