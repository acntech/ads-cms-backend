var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('./config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});

var app = express();
app.use('/', express.static(__dirname + '/'));  
require('./config/express')(app, config);
require('./config/routes')(app);
require('./config/testdata')(app);

app.listen(config.port, function () {
    console.log('Express server listening on port ' + app.get('port'));
});

