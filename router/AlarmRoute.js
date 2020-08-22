const alarmRoute = require("express").Router();
const AlarmController = require('../controller/AlarmController');


alarmRoute.get('/alarm', AlarmController.getAllAlarms);
alarmRoute.get('/alarm/:id', AlarmController.getAlarmById)

alarmRoute.post('/alarm', AlarmController.createAlarm);
alarmRoute.delete('/alarm/:id', AlarmController.deleteAlarm)

alarmRoute.put('/alarm/:id', AlarmController.updateAlarm);

module.exports = alarmRoute;
