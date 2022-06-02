const axios = require('axios');
const Logger = require('../logger/logger');

class Requests {
    static async get(url, params={}) {
        try {
            Logger.info(`Send get request to ${url}`);
            const response = await axios.get(url, {params: params});
            return response;

        } catch (e) {
            Logger.error(e.message);
            return e.response;
        }
    }

    static async post(url, requestData) {
        try {
            Logger.info(`Send post request to ${url}`);
            const response = await axios.post(url, requestData);
            return response;

        } catch (e) {
            Logger.error(e.message);
            return e.response;
        }
    }
}

module.exports = Requests;
