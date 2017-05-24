const express = require('express');
const app = express();
const mongoose = require('mongoose');

const topicsRouter = require('./routers/topics-router');
const usersRouter = require('./routers/users-router');
const clubsRouter = require('./routers/clubs-router');
const profilesRouter = require('./routers/profiles-router');


app.use(express.static('public'));

app.use('/topics', topicsRouter);
app.use('/users', usersRouter);
app.use('/clubs', clubsRouter);
app.use('/profiles', profilesRouter);


app.listen(process.env.PORT || 8080);

module.exports = {app};