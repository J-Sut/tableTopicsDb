const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {DATABASE_URL, PORT} = require('./config');

mongoose.Promise = global.Promise;

const topicsRouter = require('./routers/topics-router');
const usersRouter = require('./routers/users-router');
const clubsRouter = require('./routers/clubs-router');

app.use(bodyParser.json());
app.use(session({
  secret: 'toastmasters',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));

app.use(express.static('public'));

app.use('/topics', topicsRouter);
app.use('/users', usersRouter);
app.use('/clubs', clubsRouter);

mongoose.connect(DATABASE_URL, err => {
    if (err) {
  		console.error('Missed mongoose connected');
    }
    app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
    }).on('error', err => {
        console.error(err);
    });
});

module.exports = {app};