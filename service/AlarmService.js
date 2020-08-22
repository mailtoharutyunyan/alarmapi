const Alarm = require("../model/Alarm");

class AlarmService {
    static async getAllAlarms(callback) {
        const alarms = await Alarm.find()
        callback.onSuccess(
            alarms,
            'List of Alarms',
            200);
    }

    static async createAlarm(alarmModel, callback) {
        const newAlarm = new Alarm({
            hour: alarmModel.hour,
            minute: alarmModel.minute,
            isActive: alarmModel.isActive,
            days: alarmModel.days
        });
        try {
            await newAlarm.save();
            callback.onSuccess(newAlarm, 'Alarm successfully created', 201);
        } catch (e) {
            callback.onError(e, {})
        }
    }

    static async deleteAlarm(id, callback) {
        try {
            const alarm = await Alarm.findById({_id: id})
            callback.onSuccess(alarm, `Alarm with ${id} id deleted successfully`, 200);
            await Alarm.findByIdAndDelete({_id: id});
        } catch (e) {
            callback.onError(e, {})
        }
    }

    static async getAlarmById(id, callback) {
        try {
            const alarm = await Alarm.findById({_id: id})
            if (alarm) {
                callback.onSuccess(alarm, `Alarm with ${id} id successfully retrieved`, 200);
            } else {
                callback.onSuccess({}, `Alarm with ${id} id not found`, 500);
            }
        } catch (e) {
            callback.onError(e, {})
        }
    }

    static async updateAlarmById(id, alarmModel, callback) {
        try {
            const alarm = await Alarm.findOne({_id: id}).exec();
            if (alarm) {
                alarm.hour = alarmModel.hour
                alarm.minute = alarmModel.minute
                alarm.isActive = alarmModel.isActive
                alarm.days = alarmModel.days
                const iAlarm = await alarm.save();
                callback.onSuccess(iAlarm, 'Alarm successfully Updated', 200);
            } else {
                callback.onError({}, 'Alarm not found');
            }
        } catch (e) {
            callback.onError(e);
        }
    }
}

module.exports = AlarmService;


