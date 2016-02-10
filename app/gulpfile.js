var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var embedTemplates = require('gulp-angular-embed-templates');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var ghPages = require('gulp-gh-pages');
var replace = require('gulp-replace');
var del = require('del');

var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });

function startBrowserSync() {
    browserSync({
        server: {
            baseDir: './dist'
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
function mapError(err) {
    if (err.fileName) {
        // Regular error
        gUtil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) + ': ' + 'Line ' + chalk.magenta(err.lineNumber) + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column) + ': ' + chalk.blue(err.description));
    } else {
        // Browserify error..
        gUtil.log(chalk.red('Browserify ' + err.name) + ': ' + chalk.yellow(err.message));
    }
}

// Bundle for Browserify
function bundle(bundler) {
    var bundleTimer = duration('Javascript bundle time');

    bundler
        .bundle()
        .on('error', mapError) // Map error reporting
        .pipe(source('app.js')) // Set source name
        .pipe(buffer()) // Convert to gulp pipeline
        // .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
        // .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
        .pipe(gulp.dest('./dist/js')) // Set the output folder
        //.pipe(notify({
        //  message: 'Generated file: <%= file.relative %>',
        //})) // Output the file being created
        .pipe(bundleTimer)
        .pipe(browserSync.reload({
            stream: true
        })); // Reload the view in the browser
}

gulp.task('sass', function() {
	return gulp.src('./sass/main.scss')
		// .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(
            browserSync.reload({
                stream: true
            }));
});

gulp.task('index', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(
            browserSync.reload({
                stream: true
            }));
});

gulp.task('templates', function () {
    return gulp.src('./src/**/*.tpl.html')
        .pipe(gulp.dest('./dist'))
})

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/assets'))
})

gulp.task('copy-external-modules', function() {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.js',
        // 'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.min.js'
        ])
        .pipe(gulp.dest('dist/lib'))
});

gulp.task('html2js', function () {
    gulp.src('./dist/directives/**/*.js') // also can use *.js files 
        .pipe(embedTemplates({sourceType:'js'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile-ts', function() {
  var tsResult = gulp.src(['./src/**/*.ts', '!node_modules/**/*.*', '!build/**/*.*'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('dist/definitions')),
      tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
  ]);
});

gulp.task('compile-ts-min', function() {
  var tsResult = gulp.src(['./src/**/*.ts', '!node_modules/**/*.*', '!build/**/*.*'])
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

gulp.task('watch', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index'], function() {
    startBrowserSync();
    gulp.watch('./src/index.html', ['index']);
    gulp.watch('./src/directives/**/*.tpl.html', ['templates']).on('change', browserSync.reload);
    gulp.watch('./sass/main.scss', ['sass']);
});

gulp.task('dev', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index']);