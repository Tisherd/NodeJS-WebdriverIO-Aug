const Logger = require('../utils/logger/logger');
const Browser = require('../browser/browser');


beforeEach(async function () {
    Logger.info("++++++++++++++++++++++++++++++++++++++++++++");
    Logger.info("TestCase: start");
    await Browser.setTimeout();
    await Browser.maximize();
});

afterEach(async function () {
    Logger.info("TestCase: end");
    Logger.info("--------------------------------------------");
});
