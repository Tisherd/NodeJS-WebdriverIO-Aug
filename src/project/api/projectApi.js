const Requests = require("../../framework/utils/api/requests");
const apiConfig = require('../resourses/configData/api.config');

class ProjectApi {
    async getToken(variant){
        const url = apiConfig.baseUrl + apiConfig.urlEnd.getToken;
        return Requests.post(url, {
            params: {
                variant: variant
            }
        })
    }

}

module.exports = new ProjectApi();
