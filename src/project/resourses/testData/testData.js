const Random = require("../../../framework/utils/random/random");

const newProjectName = 'Semi'

module.exports = {
    variant: '2',
    domain: 'localhost:8080/web',
    login: 'login',
    password: 'password',
    cookieName: 'token',
    projectName: 'Nexage',
    projectId: '1',
    startIndex: 3,
    newProjectName: newProjectName,
    addTestData: {
        sid: "sid",
        projectName: newProjectName,
        testName: Random.generateString(8),
        methodName: Random.generateString(8),
        env: "env"
    }
}