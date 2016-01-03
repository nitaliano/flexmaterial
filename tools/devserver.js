var express = require('express');
var path = require('path');

module.exports = function (cb) {
    var app = express();

    app.engine('hbs', require('express-handlebars')({ defaultLayout: 'master', extname: 'hbs' }));

    app.set('view engine', 'hbs');
    app.set('port', 8888);

    app.use('/static', express.static('dist'));

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
        cb();
    });
};