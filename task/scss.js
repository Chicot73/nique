const { src, dest } = require("gulp");  //const gulp = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");  //перехватчик ошибок
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer"); //добавляет -webkit, 
//требуется установить значение для "browserslist": [], в package.json
const csso = require("gulp-csso"); //Ужатие SCSS, нужно ставить третью версию
const rename = require("gulp-rename"); //Отмена ужатия SCSS 
const size = require("gulp-size");
const shorthand = require("gulp-shorthand"); //короткие выражения SCSS
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const webpCss = require("gulp-webp-css");

//обработка SCSS
const scss = () => {
    return src(path.scss.src, {sourcemaps: app.isDev})
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "SCSS",
            message: error.message
        }))
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(groupCssMediaQueries())
    .pipe(size({title: "main.css"}))
    .pipe(dest(path.scss.dest, {sourcemaps: app.isDev}))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso({
        restructure: false,
        sourceMap: true,
        debug: true
    }))
    .pipe(size({title: "main.min.css"}))
    .pipe(dest(path.scss.dest, {sourcemaps: app.isDev}));
}

module.exports = scss;
