const del = require("del"); //удаляет в итоговой сборке файлы, удаленные в src-папке

//Конфигурация
const path = require("../config/path.js");

// Удаление директории
const clear = () => {
    return del(path.root);
} 

module.exports = clear;