const { src, dest, watch } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')

function css(done) {
    src('./src/assets/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) // Compilarlo
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest('./src/assets/build/css')) // Almacenarla en el disco duro
    done(); //Finaliza la tarea 
}

function dev(done) {
    watch('./src/assets/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;