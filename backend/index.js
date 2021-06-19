var express = require('express');
var app = express();
var mongoose = require('mongoose');

// Установим подключение по умолчанию
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;
// Получение подключения по умолчанию
var db = mongoose.connection;

// Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});




