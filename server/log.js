var fs = require('fs');
var path = require('path');

var recordLog = {
    record: function (inputData) {
        var now = new Date();
        var fileName = path.resolve(__dirname, 'log/' + now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear() + '.log');
        function nowTime() {
            return now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + " ";
        }
        fs.readFile(fileName, "utf8", function (error, data) {
            if (error) {
                console.log('Файл отсутсвует. Созданее нового.');
                fs.writeFile(fileName, data + '\n' + nowTime() + inputData, function (error) {
                    if (error) {
                        console.log("Не удалось записать данные в log файл", fileName)
                    }
                });
            }
            else {
                fs.writeFile(fileName, data + '\n' + nowTime() + inputData, function (error) {
                    if (error) {
                        console.log("Не удалось записать данные в log файл", fileName)
                    }
                });
            }
        });
    }
}

module.exports = recordLog;


