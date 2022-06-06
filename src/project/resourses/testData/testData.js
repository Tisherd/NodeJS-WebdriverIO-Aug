const Random = require("../../../framework/utils/random/random");

module.exports = {
    variant: '2',
    domain: 'localhost:8080/web',
    login: 'login',
    password: 'password',
    cookieName: 'token',
    projectName: 'Nexage',
    newProjectName: Random.generateString(10)
}