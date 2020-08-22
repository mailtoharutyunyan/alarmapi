const ResponseManager = require("../manager/ResponseManager");
const AlarmService = require('../service/AlarmService');
const Alarm = require("../model/Alarm");

class AlarmController {
    static async getAllAlarms(req, res) {

        const responseHandler = ResponseManager.getResponseHandler(res);
        try {
            const alarms = await Alarm.find()
            res.status(200).json(alarms);
            // await AlarmService.getAllAlarms(responseHandler);

        } catch (e) {
            responseHandler.onError(e);
        }
    }

    static async createAlarm(req, res) {
        // const responseHandler = ResponseManager.getResponseHandler(res);
        const alarmModel = req.body;
        const newAlarm = new Alarm({
            hour: alarmModel.hour,
            minute: alarmModel.minute,
            isActive: alarmModel.isActive,
            days: alarmModel.days
        });
        try {
            await newAlarm.save();
            res.status(201).json(newAlarm);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async deleteAlarm(req, res) {
        try {
            const alarm = await Alarm.findById({_id: req.params.id})
            res.status(200).json(alarm);
            await Alarm.findByIdAndDelete({_id: req.params.id});
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async getAlarmById(req, res) {
        const responseHandler = ResponseManager.getResponseHandler(res);
        try {
            const alarm = await Alarm.findById({_id: req.params.id})
            if (alarm) {
                res.status(200).json(alarm);
            } else {
                res.status(200).json("Alarm Not Found");
            }
        } catch (e) {
            responseHandler.onError(e)
        }
    }

    static async updateAlarm(req, res) {
        try {
            const alarm = await Alarm.findOne({_id: req.params.id}).exec();
            const alarmModel = req.body;
            if (alarm) {
                alarm.hour = alarmModel.hour
                alarm.minute = alarmModel.minute
                alarm.isActive = alarmModel.isActive
                alarm.days = alarmModel.days
                const iAlarm = await alarm.save();
                res.status(200).json(iAlarm);
            } else {
                res.status(500).json("Alarm not found for update");
            }
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = AlarmController;
