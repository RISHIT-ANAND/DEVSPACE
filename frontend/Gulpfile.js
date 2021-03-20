const gulp = require('gulp' );
const cleanCSS = require('gulp-clean-css');
const { watch } = require('gulp');
var del = require('del');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const importer = require('sass-importer-npm');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssImport = require('postcss-import');

const postcss = require('gulp-postcss' );
const tailwindcss = require('tailwindcss');

const babel = require('gulp-babel');
const babelify = require('babelify');
const uglify = require('gulp-uglify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');


var swig = require('gulp-swig');
var frontMatter = require('gulp-front-matter');

const rename = require('gulp-rename');


gulp.task('vendor', function () {
  return gulp.src(
    [
      './node_modules/dom-factory/dist/*',
      './node_modules/material-design-kit/dist/material-design-kit.js',
      './node_modules/perfect-scrollbar/css/*',
      './node_modules/perfect-scrollbar/dist/*',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/material-design-icons-iconfont/dist/fonts/*.{eot,ttf,woff,woff2,ijmap}',
      './node_modules/toastr/build/toastr.min.*',
      './node_modules/chart.js/dist/*',
      './node_modules/ion-rangeslider/js/*',
      './node_modules/ion-rangeslider/css/*',
      './node_modules/flatpickr/dist/*.js',
      './node_modules/flatpickr/dist/*.css',
      './node_modules/moment/min/moment.min.js',
      './node_modules/moment-range/dist/moment-range.js',
      './node_modules/daterangepicker/*',
      './node_modules/dragula/dist/dragula.min.js',
      './node_modules/dragula/dist/dragula.min.css',
      './node_modules/jqvmap/dist/**/**/*',
      './node_modules/svg-country-flags/png250px/**'
    ], { base: 'node_modules' })
    .pipe(gulp.dest('./demos/public/vendor/'));
});


gulp.task('js:copy', function (done) {
    return gulp.src('./src/js/plugins/**/*')
        .pipe(gulp.dest('./demos/public/js/plugins/'));
        done()
});

gulp.task('js:copy-pages', function (done) {
    return gulp.src('./src/js/pages/**/*')
        .pipe(gulp.dest('./demos/public/js/pages/'));
        done()
});

gulp.task('assets', function(done) {
  return gulp.src(['./src/assets/**/**/*'], { base: 'src/assets' })
    .pipe(gulp.dest('./demos/public/assets/'));
    done();
});


gulp.task('scss', function(done) {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass({ importer: importer, includePaths: ['node_modules'] }).on('error', sass.logError))
    .pipe(postcss([
      // ...
      cssImport,
      tailwindcss( 'tailwind.config.js'),
      autoprefixer,
      // ...
    ]))
    // .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write('./maps'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./demos/public/css'))
    done();
    
})


gulp.task('clean:pages', function (done) {
  return del([
    './demos/Pages/**/*',
  ]);
  done();
});

gulp.task('watch:files', function() {
  gulp.watch('./src/sass/*.scss', gulp.series('scss'));
  gulp.watch('./src/js/*.js',  gulp.series('js'));
  gulp.watch('./src/js/plugins/*.js',  gulp.series('js:copy'));
  gulp.watch('./src/html/**/**/*', gulp.series('clean:pages', 'html-pages'));
  
});


gulp.task('js', function(done) {
  
  return browserify({entries: ["./src/js/app.js"]})
    .transform("babelify", {
      presets: ["@babel/preset-env"]
    })
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./demos/public/js"));
    done();
})

gulp.task('html-pages', function(done) {
  gulp.src([
        './src/html/pages/*.html',  '!./src/html/pages/_*.html',   '!./src/html/pages/WIP*.html'])
      .pipe(frontMatter({ property: 'data' }))
      .pipe(swig({defaults: { cache: false }}))
      
      .pipe(gulp.dest('./demos/Pages'));
       done();
});

gulp.task('html-layouts', function(done) {
  gulp.src('./src/html/layouts/*.html')
      .pipe(swig())
      .pipe(gulp.dest('./demos/Layouts'));
       done();
});

gulp.task('html-components', function(done) {
  gulp.src('./src/html/components/**/*.html')
      .pipe(frontMatter({ property: 'data' }))
      .pipe(swig())
      .pipe(gulp.dest('./demos/Components'));
       done();
});

gulp.task('html', gulp.series('html-components', 'html-pages', 'html-layouts'));

gulp.task('default', gulp.series('vendor', 'assets', 'html', 'scss', 'js', 'js:copy', 'js:copy-pages'));

gulp.task('watch', gulp.series('vendor', 'assets', 'html', 'scss', 'js', 'js:copy', 'js:copy-pages', 'watch:files'));