var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Static server
gulp.task('server', function(){
  browserSync.init({
    server: './'
  });
});

gulp.task('default', ['server'], function(){
  gulp.watch('*.html').on('change', reload);
  gulp.watch('css/*.css').on('change', reload);

});
