const syncS3ToSFTP = require('./syncS3ToSFTP');
const listSFTPFilesToBeSynced = require('./listSFTPFilesToBeSynced');
const syncSFTPFileToS3 = require('./syncSFTPFileToS3');

module.exports = {
    syncS3ToSFTP,
    listSFTPFilesToBeSynced,
    syncSFTPFileToS3,
}