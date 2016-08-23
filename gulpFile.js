var gulp = require('gulp');
var zip = require('gulp-zip');
var forceDeploy = require('gulp-jsforce-deploy');



gulp.task('mnfzip',function(){
    return gulp.src('dist/*.js')
        .pipe(zip('angular2.resource'))
        .pipe(gulp.dest('sfdc-dist/staticresources/'))

});

gulp.task('deploy',function(){
    return gulp.src('./sfdc-dist/**', { base: "." })
        .pipe(zip('package.zip'))
        .pipe(forceDeploy({
            username:'pawelpisarektest@pawelpisarektest.pl',
            password:'',
            loginUrl:'https://c.eu11.visual.force.com',
            version:'36.0'
        }))
})

// <apex:includeScript loadOnReady="true" value="{!URLFOR($Resource.angular2,'vendor.bundle.js')}" />
//     <apex:includeScript loadOnReady="true" value="{!URLFOR($Resource.angular2,'app.bundle.js')}" />
