const express = require('express');
const alarmRoute = require("./router/AlarmRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

mongoose.connect(`mongodb://localhost:27017/alarm`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

mongoose.set('useFindAndModify', false);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use('/', alarmRoute);


app.get('/', (req, res) => {
    res.status(200).send('<h1>`Welcome to Arman"s Alarm app`</h1>')
})


app.listen(3001, () => console.log('express started on port 3001'));
