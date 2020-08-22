const ResponseManager = require("../manager/ResponseManager");
const AlarmService = require('../service/AlarmService');

class AlarmController {
    static async getAllAlarms(req, res) {

        const responseHandler = ResponseManager.getResponseHandler(res);
        try {
            await AlarmService.getAllAlarms(responseHandler);

        } catch (e) {
            responseHandler.onError(e);
        }
    }

    static async createAlarm(req, res) {
        const responseHandler = ResponseManager.getResponseHandler(res);
        try {
            await AlarmService.createAlarm(req.body, responseHandler);

        } catch (e) {
            responseHandler.onError(e);
        }
    }

    static async deleteAlarm(req, res) {
        const responseHandler = ResponseManager.getResponseHandler(res);
        try {
            await AlarmService.deleteAlarm(req.params.id, responseHandler);
        } catch (e) {
            responseHandler.onError(e)
        }
    }

    static async getAlarmById(req, res) {
        const responseHandler = ResponseManager.getResponseHandler(res);
        try {
            await AlarmService.getAlarmById(req.params.id, responseHandler);
        } catch (e) {
            responseHandler.onError(e)
        }
    }

    static async updateAlarm(req, res) {
        const responseHandler = ResponseManager.getResponseHandler(res);
        try {
            await AlarmService.updateAlarmById(req.params.id, req.body, responseHandler);
        } catch (e) {
            responseHandler.onError(e)
        }
    }
}

module.exports = AlarmController;
