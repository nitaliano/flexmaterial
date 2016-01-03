var webpack = require('webpack');
var config = require('./webpack.config.js');
var argv = require('yargs').argv;
var gutil = require('gulp-util');

module.exports = function (cb) {
   var compiler = webpack(config);
   var compilerCompleted = false;

   if (argv.watch) {
       var watcher = compiler.watch(200, run);

       process.on('SIGTERM', function () {
           watcher.close();
       });
   } else {
       compiler.run(run);
   }

   function run(err, stats) {
       if (err) {
           throw new gutil.PluginError('webpack', err);
       }

       console.log(stats.toString({
           hash: true,
           version: true,
           timings: true,
           chunks: true,
           chunkModules: true
       }));

       if (!compilerCompleted) {
           compilerCompleted = true;
           cb();
       }
   }
};