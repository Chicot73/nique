const { src, dest, watch, series, parallel } = require("gulp");  //const gulp = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");  //перехватчик ошибок
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include"); //шаблонизация
const htmlmin = require("gulp-htmlmin"); //ужимает HTML
const size = require("gulp-size"); //выдает инфо с размером файла
const webpHtml = require("gulp-webp-html"); 

//обработка html

const html = () => {
    return src(path.html.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "HTML",
            message: error.message
        }))
    }))
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(size({ title: "До сжатия" }))
    .pipe(htmlmin(app.htmlmin))
    .pipe(size({ title: "После сжатия" }))
    .pipe(dest(path.html.dest));
}

module.exports = html;