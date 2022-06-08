const Requests = require("../../framework/utils/api/requests");
const apiConfig = require('../resourses/configData/api.config');
class ProjectApi {
    async getToken(variant) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.getToken;
        return Requests.post(url, {
            params: {
                variant: variant
            }
        });
    }

    async getJson(projectId) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.getJson;
        return Requests.post(url, {
            params: {
                projectId: projectId
            }
        });
    }

    async putTest(params) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.putTest;
        return Requests.post(url, {
            params: {
                SID: params.sid,
                projectName: params.projectName,
                testName: params.testName,
                methodName: params.methodName,
                env: params.env
            }
        });
    }

    async putTestAttachment(testId, attachment, contentType) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.putTestAttachment;
        return Requests.post(url, {
            params: {
                testId: testId,
                content: attachment,
                contentType: contentType,
            }
        });
    }

    async putTestLog(testId, content) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.putTestLog;
        return Requests.post(url, {
            params: {
                testId: testId,
                content: content
            }
        });
    }
}

module.exports = new ProjectApi();
