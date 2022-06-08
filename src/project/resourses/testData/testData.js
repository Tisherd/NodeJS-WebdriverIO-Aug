const configData = require("../../../framework/configData/configData");
const Random = require("../../../framework/utils/random/random");

const newProjectName = 'ProjectName'

module.exports = {
    variant: '2',
    domain: 'localhost:8080/web',
    login: 'login',
    password: 'password',
    cookieName: 'token',
    projectName: 'Nexage',
    image1: configData.cachePath + '/scrsht.png',
    projectId: '1',
    startIndex: 3,
    contentTypeIsPng: "image/png",
    newProjectName: newProjectName,
    addTestData: {
        sid: "sid",
        projectName: newProjectName,
        testName: Random.generateString(8),
        methodName: Random.generateString(8),
        env: "env"
    }
}
