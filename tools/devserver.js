var express = require('express');
var path = require('path');
var fs = require('fs');

module.exports = function (cb) {
    var app = express();

    app.engine('hbs', require('express-handlebars')({ defaultLayout: 'master', extname: 'hbs' }));

    app.set('view engine', 'hbs');
    app.set('port', 8888);

    app.use('/static', express.static('dist'));

    // default index
    app.get('/', function (req, res) {
        res.render('home');
    });

    // component routes
    var components = fs.readdirSync(path.join(__dirname, '..', 'src', 'js'));
    components.forEach(function (component) {
       if (component.indexOf('.js') === -1) {
           return;
       }

       var route = component.substring(0, component.length - 3);
       app.get('/' + route, function (req, res) {
           res.render(route);
       });
    });

    app.get('*', function (req, res) {
        res.status(404);
        res.render('404');
    });

    app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
        cb();
    });
};