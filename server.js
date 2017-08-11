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


// ************* Integration Testing Server ****************

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  console.log(databaseUrl);
  return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve(server);
        }).on('error', err => {
          mongoose.disconnect();
          reject(err)
      });   
    });
  });
};

function closeServer() {
  return mongoose.disconnect().then(() =>{
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  });
};

// this is to create a distinction for running servers between
// testing or for production
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};