const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Use Dart Sass compiler

// File paths
const files = {
  scssPath: 'src/scss/**/*.scss', // Your Sass files
  cssDest: 'dist/css'             // Destination for compiled CSS
};

// Task to compile Sass
function compileSass() {
  return src(files.scssPath)       // Source folder for Sass files
    .pipe(sass().on('error', sass.logError)) // Compile Sass and log errors
    .pipe(dest(files.cssDest));    // Destination folder for compiled CSS
}

// Watch task to recompile Sass on file changes
function watchSass() {
  watch(files.scssPath, compileSass);
}

// Default task
exports.default = series(compileSass, watchSass);


const browserSync = require('browser-sync').create();

// Serve files and specify Firefox as the default browser
function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    browser: 'firefox' // Set Firefox as the default browser
  });
  watch('src/scss/**/*.scss', compileSass);
  watch('dist/css/*.css').on('change', browserSync.reload);
  watch('*.html').on('change', browserSync.reload);
}

exports.serve = serve;


