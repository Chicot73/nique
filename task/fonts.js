const { src, dest } = require("gulp");  //const gulp = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");  //перехватчик ошибок
const notify = require("gulp-notify");
const newer = require("gulp-newer"); //не изменяет уже измененные картинки
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");

//обработка Fonts
const fonts = () => {
    return src(path.fonts.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "Fonts",
            message: error.message
        }))
    }))
    .pipe(newer(path.fonts.dest))
    .pipe(fonter(app.fonter))
    .pipe(dest(path.fonts.dest))
    .pipe(ttf2woff2())
    .pipe(dest(path.fonts.dest));
}

module.exports = fonts;
