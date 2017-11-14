var express = require('express');
var session = require('express-session');
var logs = require('./log');
var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql');
var config = require('../etc/config.json');
var bodyParser = require('body-parser');
var path = require('path');

// var bkfd2Password = require("pbkdf2-password");
// var hasher = bkfd2Password();

var passwordHash = require('password-hash');

var admin = require("./admin/_admin_query");
var transp = require("./transp/_transp_query");
var expl = require("./expl/_expl_query");


var app = express();

var sqlConnetction = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});
// для разбора входящих post запросов в зявке
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    secret: 'sdfksfksdfksdhfkn23k4n23j4kn32jnke',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    })
}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://www.sfriend.ru:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// префикс виртуального пути
app.use('/static', express.static(path.join(__dirname, "../public")));
// Каталог шаблонов
app.set('views', path.join(__dirname, "../views"));
// Используемый шаблонизатор
app.set('view engine', 'pug');
// **************************************************
app.get('/', function (req, res) {
    if (req.session.authUser && req.session.serviceType === 1) {
        res.redirect('/expl');

    } else if (req.session.authUser && req.session.serviceType === 2) {
        res.redirect('/transp');
    }
    else if (req.session.authUser && req.session.serviceType === 777) {
        res.redirect('/admin');
    }
    else {
        res.render('index');
    }
});
app.post('/', (req, res) => {
    // Данные с формы
    var uname = req.body.login;
    var pwd = req.body.password; 
    // Поиск пользователя вБД
    var query = 'SELECT * FROM users WHERE authid = ?';
    sqlConnetction.query(query, ['local:' + uname], function (err, result) {
        var user = result[0];

        if (!user) {
            return res.send('No user. <a href="/">Login</a>');
        }
        else {
            if (passwordHash.verify(pwd, user.password)) {
                req.session.authUser = user.displayname;
                req.session.save(function () {
                    // Определяем сервис сотрудника
                    if (uname !== 'admin') {
                        var query = 'SELECT company_id,users.id,service_type FROM users INNER JOIN company ON users.company_id=company.id WHERE authid = ?';
                        sqlConnetction.query(query, ['local:' + uname], function (err, result) {
                            var st = result[0];
                            req.session.serviceType = st.service_type;
                            req.session.companyID = st.company_id;
                            req.session.userID = st.id;
                            // Направляем пользователя соглавное его сервису
                            if (st.service_type === 1) { res.redirect('/expl'); console.log(`Accessed ${req.session.authUser}`); }
                            else if (st.service_type === 2) { res.redirect('/transp'); console.log(`Accessed ${req.session.authUser}`); }
                            else { res.send("Неизвестная организация"); }
                        });
                    }
                    else {
                        req.session.serviceType = 777;
                        res.redirect('/admin');
                        // res.send("Администратор<br><a href='/logout'>Logout</a>");
                    }
                });
            } else {
                res.send('I do not know you. <a href="/">Signin</a>');
            }
        }
    });
});
// **************************************************
app.get('/admin', function (req, res) {
    console.log(req.query);
    var query = admin.action_GET(req.query.action,req.query.data);
    if (query !== null) {
        sqlConnetction.query(query, (err, result) => { res.send(result) });
    }
    else {
        if (!req.session.serviceType) { res.redirect('/') }
        if (req.session.serviceType === 1) { res.redirect('/expl') }
        if (req.session.serviceType === 2) { res.redirect('/transp') }
        res.render('index');
    }
});
app.post('/admin', function (req, res) {
    var query = admin.action_POST(req.body.action, req.body.data);
    
    if (query.type === 'USER_TO_WG' || query.type === 'COMPANY_TO_WG' || query.type === 'INSERT' || query.type === 'UPDATE' || query.type === 'ST' || query.type === 'WG' || query.type === 'WGbank' || query.type === 'COMPANY') {
        sqlConnetction.query(query.data, function (err, result) {  });
        return res.sendStatus(200);
    }
    if (query.type === 'DEL_USER_TO_WG' || query.type === 'DEL_COMPANY_TO_WG' || query.type === 'DELETE' || query.type === 'DEL_ST' || query.type === 'DEL_WG' || query.type === 'DEL_WGbank' || query.type === 'DEL_COMPANY') {
        for (key in query.data) {
            sqlConnetction.query(query.data[key], (err, result) => { });
        }
        return res.sendStatus(200);
    }
    return res.sendStatus(404);
})
// Эксплуатация
app.get('/expl', function (req, res) {
    var query = expl.action_GET(req.query.action)
    if (query !== null) {
        // ToDO
    }
    else {
        if (!req.session.serviceType) { res.redirect('/') }
        if (req.session.serviceType === 2) { res.redirect('/transp') }
        res.render('index');
    }
});
// Транспорт
app.get('/transp', function (req, res) {
    if (req.query.action !== 'AUTH') {
        var query = transp.action_GET(req.query.action, req.session.userID, req.session.serviceType, req.session.companyID, req.query.executor, req.query.sb_id, req.session.authUser, req.query.data);
        if (query !== null) {
            sqlConnetction.query(query, (err, result) => { res.send(result) });
        }
        else {
            if (!req.session.serviceType) { res.redirect('/') }
            else if (req.session.serviceType === 1) { res.redirect('/expl') }
            res.render('index');
        }
    }
    else {
        res.send({ id: req.session.userID, displayname: req.session.authUser });
    }
});
app.post('/transp', function (req, res) {
    var query = transp.action_POST(req.body.action, req.body.data, req.session.userID);
    if (query.type === 'ORDER') {
        if (query.data[1].length > 0) {
            for (key in query.data[1]) {
                sqlConnetction.query(query.data[1][key], (err, result) => { });
            }
        }
        sqlConnetction.query(query.data[0], (err, result) => { res.send(result) });
    }
    else if (query.type === 'DRIVER' || query.type === 'CAR') {
        sqlConnetction.query(query.data, (err, result) => { res.send(result) });
    }
    else if (query.type === 'DEL_DRIVERS' || query.type === 'DEL_CARS') {
        for (key in query.data) {
            sqlConnetction.query(query.data[key], (err, result) => { });
        }
    }
    else {
        res.send('post action undefined');
    }

});
// Разлог
app.get('/logout', (req, res) => {
    console.log(`Exit user ${req.session.authUser}`);
    delete req.session.authUser;
    delete req.session.serviceType;
    req.session.save(function () {
        res.redirect('/');
    });
});
// Страница не найдена
app.get('/404', function (req, res) {
    res.render('index');
});
// Если маршрут не найден
app.get('*', function (req, res) {
    res.redirect('/404');
});
app.listen(config.serverPort, function () {
    console.log(`Server is running on port ${config.serverPort}`);
});

