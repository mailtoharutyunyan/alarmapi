const mongoose = require("mongoose");

const AlarmSchema = mongoose.Schema({
    hour: {type: Number},
    minute: {type: Number},
    isActive: {type: Boolean},
    days: [Number]
}, {
        toJSON: {
            transform(doc, ret) {
                Reflect.deleteProperty(ret, '_id');
                Reflect.deleteProperty(ret, '__v');
                Reflect.deleteProperty(ret, '__t');
                ret.id = doc._id;
                ret.fullName = doc.fullName;
            }
        }
    }
);


const Alarm = mongoose.model('Alarm', AlarmSchema);

module.exports = Alarm;

