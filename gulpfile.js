var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var del = require('del');
var clean = require('gulp-clean');

var tsProject = ts.createProject('./app/src/tsconfig.json');

function startBrowserSync() {
    browserSync({
        server: {
            baseDir: './public'
        },
        notify: false,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        }
    });
}

// Error reporting function
// function mapError(err) {
//     if (err.fileName) {
//         // Regular error
//         gUtil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) + ': ' + 'Line ' + chalk.magenta(err.lineNumber) + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column) + ': ' + chalk.blue(err.description));
//     } else {
//         // Browserify error..
//         gUtil.log(chalk.red('Browserify ' + err.name) + ': ' + chalk.yellow(err.message));
//     }
// }

gulp.task('sass', function() {
	return gulp.src('./app/sass/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css'))
		.pipe(
            browserSync.reload({
                stream: true
            }));
});

gulp.task('index', function() {
    return gulp.src('./app/src/index.html')
        .pipe(gulp.dest('./public'))
        .pipe(
            browserSync.reload({
                stream: true
            }));
});

gulp.task('assets', function () {
    return gulp.src('./app/src/assets/**/*')
        .pipe(gulp.dest('./public/assets'))
})

// gulp.task('html2js', function () {
//     gulp.src('./dist/directives/**/*.js') // also can use *.js files 
//         .pipe(embedTemplates({sourceType:'js'}))
//         .pipe(gulp.dest('./dist'));
// });

gulp.task('compile-ts-min', function() {
  var tsResult = gulp.src(['./app/src/**/*.ts', '!node_modules/**/*.*', '!build/**/*.*'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

        //   return tsResult.js
		// 		// .pipe(concat('output.js')) 
		// 		.pipe(sourcemaps.write()) 
		// 		.pipe(gulp.dest('dist/js'));
  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('dist/definitions')),
      tsResult.js
        .pipe(concat('output.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
  ]);
});

gulp.task('deploy', function() {
    gulp.src(['src/index.html'])
    .pipe(
        replace("<base href=\"/\">", "<base href=\"/learningAngular2/\">")
    )
    .pipe(gulp.dest('dist/index.html'));
    
//   return gulp.src('./dist/**/*')
//     .pipe(ghPages());
});


/********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
gulp.task('clean-public', function () {
	return gulp.src('./public')
		.pipe(clean({force: true}));
});

gulp.task('copy-external-modules', ['clean-public'], function() {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.js',
        'node_modules/ng2-notify/**/*.js',
        // 'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2-library-example/**/*.js'
        ])
        .pipe(gulp.dest('public/lib'))
});

gulp.task('compile-ts', function() {
  var tsResult = gulp.src(['./app/src/**/*.ts'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('public/definitions')),
      tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'))
  ]);
});

gulp.task('templates', function () {
    return gulp.src('./app/src/**/*.tpl.html')
        .pipe(gulp.dest('./public'))
})

gulp.task('github-page', function() {
    gulp.src(['src/index.html'])
    .pipe(
        replace("<base href=\"/\">", "<base href=\"/ng2-notify/\">")
    )
    .pipe(gulp.dest('public/index.html'));
    
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('watch', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index'], function() {
    startBrowserSync();
    gulp.watch('./app/src/index.html', ['index']);
    gulp.watch('./app/src/directives/**/*.tpl.html', ['templates']).on('change', browserSync.reload);
    gulp.watch('./app/src/**/*.ts', ['compile-ts']).on('change', browserSync.reload);
    gulp.watch('./app/sass/main.scss', ['sass']);
});

gulp.task('dev', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index']);