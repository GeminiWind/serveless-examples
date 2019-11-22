import AWS from 'aws-sdk';
import SFTPClient from 'ssh2-sftp-client';
import moment from 'moment';
import listSFTPFiles from './helpers/listSFTPFiles';
import config from './config';

const listSFTPFilesToBeSynced = async (event, context, cb) => {
    const s3 = new AWS.S3();
    const sqs = new AWS.SQS();

    let s3Objs;
    try {
        // max to 1000 objs
        const objs = await s3.listObjectsV2({
            Bucket: config.s3Bucket
        }).promise();
        s3Objs = objs.Contents
    } catch (err) {
        console.log('Error in listing objects', err);
        cb(err);
    }

    let sftpFiles;
    try {
        let client = new SFTPClient();
        await client.connect(config.sftpConfig);
        
        sftpFiles = await listSFTPFiles(client);
        
        await client.end();
    } catch (err) {
        console.log('Error in listing key in SFTP', err);
        cb(err);
    }

    // filter file exist in SFTP but not in S3
    const s3Keys = s3Objs.map(obj => obj.Key);
    const notSyncedFiles = sftpFiles.filter(sftpFile => !s3Keys.includes(sftpFile.mappedKey));
    if (notSyncedFiles && notSyncedFiles.length > 0) {
        console.log(`Found ${notSyncedFiles.length} files has not been synced`);
    }

    // filter mismatched file content
    const mismatchFiles = sftpFiles.filter((sftpFile) => {
        const mappedS3Object = s3Objs.find(s3Obj => s3Obj.Key === sftpFile.mappedKey);

        if (moment(sftpFile.modifyTime).diff(moment(mappedS3Object.LastModified), 'minutes') > 15) {
            return true;
        }

        return false;
    });

    if (mismatchFiles && mismatchFiles.length > 0) {
        console.log(`Found ${mismatchFiles.length} files has mismatched`);
    }

    // TODO: filter file < 512MB because Lambda temporary file max is 512MB
    const entries = [...notSyncedFiles, ...mismatchFiles]
        .map(sftpFile => ({
            Id: sftpFile.mappedKey,
            MessageBody: JSON.stringify({
                mappedKey: sftpFile.mappedKey,
            })
         }))

    await sqs.sendMessageBatch({
        QueueUrl: process.env.QUEUE_URL,
        Entries: entries,
    }).promise();

    cb(null, 'Done');
}

export default listSFTPFilesToBeSynced;
