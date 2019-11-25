module.exports = {
  sftpConfig: {
    host: process.env.SFTP_HOST,
    port: 22,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD
  },
  sftpDir: process.env.SFTP_DIR,
  s3Bucket: process.env.S3_SYNCED_BUCKET
}