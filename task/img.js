const { src, dest } = require("gulp");  //const gulp = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");  //перехватчик ошибок
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");  //ужимает картинки
const newer = require("gulp-newer"); //не изменяет уже измененные картинки
const webp = require("gulp-webp"); //создает копии в webp
const gulpIf = require("gulp-if");

//обработка Image
const img = () => {
    return src(path.img.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "Image",
            message: error.message
        }))
    }))
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(gulpIf(app.isProd, imagemin(app.imagemin))) //действие выполняется только с флагом --production
    .pipe(dest(path.img.dest));
}

module.exports = img;
