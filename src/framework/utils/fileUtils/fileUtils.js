const fs = require('fs/promises');
const configData = require('../../configData/configData');
const Logger = require('../logger/logger');


class FileUtils {
    static async readFile(file) {
        Logger.info(`${file} - read`);
        return fs.readFile(file)
    }

    static async makeDir(path) {
        Logger.info(`${path} - make dir`);
        return fs.mkdir(path, { recursive: true }, err => {
            if (err) Logger.error(`Error to make ${path}`);
        });
    }

    static async removeDir(path) {
        Logger.info(`${path} - remove dir`);
        return fs.rm(path, { recursive: true }, err => {
            if (err) Logger.error(`Error to remove ${path}`);
        });
    }

    static async createCacheDir() {
        const cachePath = configData.cachePath;
        Logger.info(`${cachePath} - create cache`);
        try {
            await fs.access(cachePath);
        }
        catch {
            Logger.warn(`${cachePath} - cache exists`);
            FileUtils.removeDir(cachePath);
        }
        await FileUtils.makeDir(cachePath);
    }

    static async removeCacheDir() {
        const cachePath = configData.cachePath;
        Logger.info(`${cachePath} - delete cache`);
        await FileUtils.removeDir(cachePath);
    }
}

module.exports = FileUtils;
