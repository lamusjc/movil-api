//Importamos las librerias
var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');
var PORT = process.env.PORT || 3000;
//Configuramos el express
var app = express();
var http = require('http');
var server = http.Server(app);

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use('/', require('./api/controllers'));

// Conexion con la base de datos
// connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "movildb",
// });

function handleDisconnect() {
    connection = mysql.createConnection('mysql://b9b671c66b2196:1d169670@us-cdbr-east-02.cleardb.com/heroku_62c9b999f96f18d?reconnect=true'); // Recreate the connection, since


    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }

        console.log('\nConectado a la base de datos con éxito con id: ' + connection.threadId);
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

// connection = mysql.createConnection('mysql://b9b671c66b2196:1d169670@us-cdbr-east-02.cleardb.com/heroku_62c9b999f96f18d?reconnect=true');

// //Intentar conectar con la base de datos
// connection.connect(function (err) {
//     if (err) {
//         console.error('Error conectando la base de datos: ' + err.stack);
//         return;
//     }
//     console.log('\nConectado a la base de datos con éxito con id: ' + connection.threadId);
// });

handleDisconnect();

//Iniciar el servidor
server.listen(PORT, function () {
    console.log('\nServidor local iniciado con éxito en el puerto: ' + PORT);
});