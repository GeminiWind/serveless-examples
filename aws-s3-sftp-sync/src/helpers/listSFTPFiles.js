import Bluebird from 'bluebird';
import flatten from 'lodash.flatten';
import config from '../config';

const listSFTPFiles = async (sftp, dir = config.sftpConfig) => {
    const list = await sftp.list(dir);

    const result = await Bluebird.map(list, async (e) => {
        if (e.type === '-') {
            let mappedKey;
            if (dir === config.sftpDir) {
                mappedKey = e.name;
            } else {
                mappedKey = `${dir}/${e.name}`.substr(config.sftpConfig.length -1);
            }
            return {
                name: e.name,
                size: e.size,
                modifyTime:  e.modifyTime,
                accessTime: e.accessTime,
                mappedKey,
            }
        }

        // directory
        if (e.type === 'd') {
            const files = await getFileInfoFromDir(sftp, `${dir}/${e.name}`);

            return files
        } 
    })

    return flatten(result, true);
}

export default listSFTPFiles;
