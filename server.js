var express = require('express');
var app = express();

//app.get should be before app.use

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

module.exports = {app};