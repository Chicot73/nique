const { watch, series, parallel } = require("gulp");  //const gulp = require("gulp");
const browserSync = require("browser-sync").create(); //Localhost

//Конфигурация
const path = require("./config/path.js");
const app = require("./config/app.js");

//Задачи
//const clear = require('./task/clear.js');
const pug = require('./task/pug.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');
const img = require('./task/img.js');
const fonts = require('./task/fonts.js');

//Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
}

//Наблюдение
const watcher = () => {
    watch(path.pug.watch, pug).on("all", browserSync.reload);
    watch(path.scss.watch, scss).on("all", browserSync.reload);
    watch(path.js.watch, js).on("all", browserSync.reload);
    watch(path.img.watch, img).on("all", browserSync.reload);
    watch(path.fonts.watch, fonts).on("all", browserSync.reload);
}

const build = series(
    parallel(pug, scss, js, img, fonts)
);

const dev = series(
    build,
    parallel(watcher, server)
);

//Задачи
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
//exports.clear = clear;

//Сборка
exports.default = app.isProd
    ? build
    : dev;