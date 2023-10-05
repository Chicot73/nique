const { src, dest } = require("gulp");  //const gulp = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");  //перехватчик ошибок
const notify = require("gulp-notify");
const concat = require("gulp-concat"); //Сборка стилей
const cssimport = require("gulp-cssimport"); //Импорт CSS
const autoprefixer = require("gulp-autoprefixer"); //добавляет -webkit, 
//требуется установить значение для "browserslist": [], в package.json
const csso = require("gulp-csso"); //Ужатие CSS, нужно ставить третью версию
const rename = require("gulp-rename"); //Отмена ужатия CSS 
const size = require("gulp-size");
const shorthand = require("gulp-shorthand"); //короткие выражения CSS
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css");

//обработка CSS
const css = () => {
    return src(path.css.src, {sourcemaps: app.isDev})
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "CSS",
            message: error.message
        }))
    }))
    .pipe(concat("main.css"))
    .pipe(cssimport())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(groupCssMediaQueries())
    .pipe(size({title: "main.css"}))
    .pipe(dest(path.css.dest, {sourcemaps: app.isDev}))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso({
        restructure: false,
        sourceMap: true,
        debug: true
    }))
    .pipe(size({title: "main.min.css"}))
    .pipe(dest(path.css.dest, {sourcemaps: app.isDev}));
}

module.exports = css;
