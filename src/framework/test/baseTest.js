const Logger = require('../utils/logger/logger');
const Browser = require('../browser/browser');
const FileUtils = require('../utils/fileUtils/fileUtils');


beforeEach(async function () {
    Logger.info("++++++++++++++++++++++++++++++++++++++++++++");
    await FileUtils.createCacheDir();
    Logger.info("TestCase: start");
    await Browser.setTimeout();
    await Browser.maximize();
});

afterEach(async function () {
    Logger.info("TestCase: end");
    await FileUtils.removeCacheDir();
    Logger.info("--------------------------------------------");
});
