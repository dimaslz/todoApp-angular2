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
var ghPages = require('gulp-gh-pages');
var server = require('gulp-develop-server');
var exec = require('gulp-exec');
var livereload = require( 'gulp-livereload' );

var tsProject = ts.createProject('./app/src/tsconfig.json');

function startBrowserSync() {
    browserSync({
        server: {
            baseDir: './public'
        },
        notify: false,
        ghostMode: {
            clicks: false,
            forms: false,
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
		.pipe(gulp.dest('./public/css'));
		// .pipe(
        //     browserSync.reload({
        //         stream: true
        //     }));
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

gulp.task('github-page', function() {
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
gulp.task('copy-external-modules', function() {
    del.sync(['public/**']);
    gulp.src(['node_modules/ng2-notify/dist/**/*.js'])
        .pipe(gulp.dest('public/lib/ng2-notify'));
        
    gulp.src(['node_modules/socket.io/lib/socket.js'])
        .pipe(gulp.dest('public/lib/socket.io'));

    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        // 'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.min.js',
        'node_modules/systemjs/dist/system-polyfills.js'
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

var options = {
    server: {
        path: './bin/socket',
        // baseDir: './public',
        execArgv: [ '--harmony' ]
    },
    bs: {
        // proxy: 'http://localhost:5000'
        port: 5000
    }
};

var serverFiles = [
    './public/**/*.js'
];

gulp.task( 'server:start', function() {
    // server.listen( options.server, function( error ) {
    //     if( ! error ) browserSync( options.bs );
    // });
    server.listen( options.server, livereload.listen );
});

gulp.task( 'server:restart', function() {
    server.restart( function( error ) {
        if( ! error ) browserSync.reload();
    });
});

gulp.task( 'node', [ 'server:start' ], function() {
    gulp.watch( serverFiles, [ 'server:restart' ] )
});

gulp.task('watch', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index'], function() {
    startBrowserSync();
    gulp.watch('./app/src/index.html', ['index']);
    gulp.watch('./app/src/directives/**/*.tpl.html', ['templates']).on('change', browserSync.reload);
    gulp.watch('./app/src/**/*.ts', ['compile-ts']).on('change', browserSync.reload);
    gulp.watch('./app/sass/main.scss', ['sass']);
});

gulp.task('watch-node', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index', 'server:start'], function() {
    function restart( file ) {
        server.changed( function( error ) {
            if( ! error ) livereload.changed( file.path );
        });
    }
    
    gulp.watch('./app/src/index.html', ['index']);
    gulp.watch('./app/src/directives/**/*.tpl.html', ['templates']).on('change', restart);
    gulp.watch('./app/src/**/*.ts', ['compile-ts']).on('change', restart);
    gulp.watch('./app/sass/main.scss', ['sass']);
});

gulp.task('dev', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index']);