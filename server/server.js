var express = require('express');
var session = require('express-session');
var logs = require('./log');
var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql');
var dbUtills = require('./dbUtills');
var config = require('../etc/config.json');
var bodyParser = require('body-parser');
var path = require('path');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();


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
            return hasher({ password: pwd, salt: user.salt }, function (err, password, salt, hash) {
                // Проверка пароля
                if (hash === user.password) {
                    req.session.authUser = user.displayname;
                    req.session.save(function () {
                        // Определяем сервис сотрудника
                        if (uname !== 'admin') {
                            var query = 'SELECT company_id,users.id,service_type FROM users INNER JOIN company ON users.company_id=company.id WHERE authid = ?';
                            sqlConnetction.query(query, ['local:' + uname], function (err, result) {
                                var st = result[0];
                                // console.log(st);
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
                            res.send("Администратор<br><a href='/logout'>Logout</a>");
                        }
                    });
                } else {
                    res.send('I do not know you. <a href="/">Signin</a>');
                }
            });
        }
    });
});
// **************************************************
// Эксплуатация
app.get('/expl', function (req, res) {
    if (!req.session.serviceType) { res.redirect('/') }
    if (req.session.serviceType === 2) { res.redirect('/transp') }
    res.render('index');

});
// Транспорт
app.get('/transp', function (req, res) {
    if (!req.session.serviceType) { res.redirect('/') }
    else if (req.session.serviceType === 1) { res.redirect('/expl') }
    res.render('index');
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
// Эксплуотация
app.get('/expl/myWG', function (req, res) {
    sqlConnetction.query(dbUtills.myWG + req.session.serviceType, (err, result) => { res.send(result); });
});
app.get('/expl/toMe', function (req, res) {
    sqlConnetction.query(dbUtills.toMeExpl + req.session.userID, (err, result) => { res.send(result); });
});
app.get('/expl/doneMe', function (req, res) {
    sqlConnetction.query(doneMe, (err, result) => { res.send(result); });
});
app.get('/expl/cancelClient', function (req, res) {
    // sqlConnetction.query(, (err, result) => { res.send(result); });
});
// Транспорт
// фильтры
app.post('/transp/myWG', function (req, res) {
    sqlConnetction.query(dbUtills.myWG + req.session.serviceType, (err, result) => { res.send(result) }); //req.session.serviceType
});
app.get('/transp/newOrder', function (req, res) {
    sqlConnetction.query(dbUtills.newOrder + req.session.serviceType, (err, result) => { res.send(result); });//req.session.serviceType
});
app.get('/transp/carAppoint', function (req, res) {
    sqlConnetction.query(dbUtills.carAppoint, (err, result) => { res.send(result); });
});
app.get('/transp/toMe', function (req, res) {
    sqlConnetction.query(dbUtills.toMeTransp + req.session.userID, (err, result) => { res.send(result); });
});
app.get('/transp/doneTrip', function (req, res) {
    sqlConnetction.query(dbUtills.doneTrip, (err, result) => { res.send(result); });
});
app.get('/transp/dataSend', function (req, res) {
    sqlConnetction.query(dbUtills.dataSend, (err, result) => { res.send(result); });
});
app.get('/transp/cancelClient', function (req, res) {
    sqlConnetction.query(dbUtills.cancelClient, (err, result) => { res.send(result); });
});
// ----
app.get('/transp/carDrivers', function (req, res) {
    sqlConnetction.query(dbUtills.carDrivers + req.session.companyID, (err, result) => { res.send(result); });
});
app.get('/transp/carDriversAll', function (req, res) {
    sqlConnetction.query(dbUtills.carDriversAll + req.session.companyID, (err, result) => { res.send(result); });
});
app.get('/transp/cars', function (req, res) {
    sqlConnetction.query(dbUtills.cars, (err, result) => { res.send(result); });
});
app.get('/transp/cars-status', function (req, res) {
    sqlConnetction.query(dbUtills.carsStatus, (err, result) => { res.send(result); });
});
app.get('/transp/transport_statuses', function (req, res) {
    sqlConnetction.query(dbUtills.transport_statuses, (err, result) => { res.send(result); });
});
app.get('/transp/transport-drivers-status', function (req, res) {
    sqlConnetction.query(dbUtills.transport_drivers_status, (err, result) => { res.send(result); });
});
app.get('/transp/wg', function (req, res) {
    sqlConnetction.query(dbUtills.transport_wg, (err, result) => { res.send(result); });
});
app.get('/transp/userstowg', function (req, res) {
    sqlConnetction.query(dbUtills.usersToWg + req.session.userID, (err, result) => { res.send(result); });
});
app.get('/transp/transpExecutor', function (req, res) {
    sqlConnetction.query(`${dbUtills.listExecutors} + '${req.query.executor}'`, (err, result) => { res.send(result); });
});
app.get('/transp/companyToUser', function (req, res) {
    sqlConnetction.query(dbUtills.companyToUser + req.session.userID, (err, result) => { res.send(result); });
});
// ------
app.get('/transp/closureStatuses', function (req, res) {
    sqlConnetction.query(dbUtills.closureStatuses, (err, result) => { res.send(result); });
});
// --ИСТОРИЯ--------
app.get('/transp/getHistory', function (req, res) {
    var query = `${dbUtills.getHistory} ${req.query.sb_id} ORDER BY date_edit DESC`;
    console.log(query);
    sqlConnetction.query(query, (err, result) => { res.send(result); });
});
// -----------------
app.post('/transp/saveOrder', (req, res) => {
    var now = new Date();
    var query = `UPDATE requests 
                SET status=${req.body.status.new},
                driver_id=${req.body.driver_id.new === undefined ? null : req.body.driver_id.new},
                workgroup_id=${req.body.workgroup_id.new === undefined ? null : req.body.workgroup_id.new},
                assignee=${req.body.assignee.new === undefined ? null : req.body.assignee.new},
                ride_start_time=${req.body.ride_start_time.new === undefined || req.body.ride_start_time.new === null ? null : req.body.ride_start_time.new},
                ride_end_time=${req.body.ride_end_time.new === undefined || req.body.ride_end_time.new === '' ? null : req.body.ride_end_time.new},
                ride_duration='${req.body.ride_duration.new === undefined || req.body.ride_duration.new === '' ? null : req.body.ride_duration.new}',
                ride_distance='${req.body.ride_distance.new === undefined || req.body.ride_distance.new === '' ? null : req.body.ride_distance.new}',
                ride_idle_time='${req.body.ride_idle_time.new === undefined || req.body.ride_idle_time.new === '' ? null : req.body.ride_idle_time.new}',
                ride_price='${req.body.ride_price.new === undefined || req.body.ride_price.new === '' ? null : req.body.ride_price.new}',
                closure_code=${req.body.closure_code.new === undefined || req.body.closure_code.new === '' ? null : req.body.closure_code.new},
                solution='${req.body.solution.new === undefined || req.body.solution.new === '' ? null : req.body.solution.new}'
                where id=${req.body.id}`;
    // Проверка на записи без изменений
    for (var key in req.body) {
        if (req.body[key].old !== req.body[key].new) {
            var audit = `INSERT INTO audit_requests
            (
                user_id,db_id,sb_id,old_status,new_status,old_driver_id,new_driver_id,old_workgroup_id,new_workgroup_id,old_assignee,new_assignee,
                old_ride_start_time,new_ride_start_time,old_ride_end_time,new_ride_end_time,old_ride_duration,new_ride_duration,
                old_ride_distance,new_ride_distance,old_ride_idle_time,new_ride_idle_time,old_ride_price,new_ride_price,old_solution,
                new_solution,old_closure_code,new_closure_code,date_edit
            )
            VALUES
            (
                ${req.session.userID},${req.body.id},'${req.body.sb_id}',
                ${req.body.status.old},${req.body.status.new},${req.body.driver_id.old},${req.body.driver_id.new},
                ${req.body.workgroup_id.old},${req.body.workgroup_id.new},${req.body.assignee.old},${req.body.assignee.new},
                ${req.body.ride_start_time.old},${req.body.ride_start_time.new},${req.body.ride_end_time.old},${req.body.ride_end_time.new},
                '${req.body.ride_duration.old}','${req.body.ride_duration.new}','${req.body.ride_distance.old}','${req.body.ride_distance.new}' ,
                '${req.body.ride_idle_time.old}','${req.body.ride_idle_time.new}','${req.body.ride_price.old}','${req.body.ride_price.new}',
                '${req.body.solution.old === undefined || req.body.solution.old === '' ? null : req.body.solution.old}',
                '${req.body.solution.new === undefined || req.body.solution.new === '' ? null : req.body.solution.new}',
                ${req.body.closure_code.old === undefined || req.body.closure_code.old === '' ? null : req.body.closure_code.old},
                ${req.body.closure_code.new === undefined || req.body.closure_code.new === '' ? null : req.body.closure_code.new},
                ${Math.floor(now.getTime() / 1000)}
            )`;
            sqlConnetction.query(audit, (err, result) => {});
            console.log(audit);
            break;
        }
    }
    sqlConnetction.query(query, (err, result) => {
        logs.record('Пользователь:' + ' ' + req.session.authUser + ' ' + 'внёс изменения в' + ' ' + req.body.sb_id);
        res.send(result);
    });
});
app.post('/transp/saveDriver', (req, res) => {
    if (req.body.type === 'INSERT') {
        var query = `INSERT INTO transport_drivers(driver_fullname,driver_phone,status,car_id,company_id) VALUES(
            '${req.body.driver_fullname}',${req.body.driver_phone},${req.body.status},${req.body.car_id},${req.body.company_id})`;
        sqlConnetction.query(query, (err, result) => {
            logs.record('Пользователь:' + ' ' + req.session.authUser + ' ' + 'создал нового водителя' + ' ' + req.body.driver_fullname);
            res.send(result);
        });
    }
    else {
        var query = `UPDATE transport_drivers SET
            driver_fullname = '${req.body.driver_fullname}',
            driver_phone = ${req.body.driver_phone},
            status = ${req.body.status},
            car_id = ${req.body.car_id === undefined || req.body.car_id === null ? null : req.body.car_id},
            company_id = ${req.body.company_id}
            WHERE id = ${req.body.id} `;
        sqlConnetction.query(query, (err, result) => {
            logs.record('Пользователь:' + ' ' + req.session.authUser + ' ' + 'изменил данные по водителю' + ' ' + req.body.driver_fullname);
            res.send(result);
        });
    }
});
app.post('/transp/saveCar', (req, res) => {
    if (req.body.type === 'INSERT') {
        var query = `INSERT INTO transport_cars(vehicle_brand,vehicle_id_number,vehicle_color,status,company_id) VALUES(
            '${req.body.vehicle_brand}','${req.body.vehicle_id_number}','${req.body.vehicle_color}',${req.body.status},${req.body.company_id})`;
        sqlConnetction.query(query, (err, result) => {
            logs.record('Пользователь:' + ' ' + req.session.authUser + ' ' + 'добавил в справочник авто ' + ' ' + req.body.vehicle_id_number);
            res.send(result);
        });
    }
    else {
        var query = `UPDATE transport_cars SET
            vehicle_brand = '${req.body.vehicle_brand}',
            vehicle_id_number = '${req.body.vehicle_id_number}',
            vehicle_color = '${req.body.vehicle_color}',
            status = ${req.body.status},
            company_id = ${req.body.company_id}
            WHERE id = ${req.body.id} `;
        sqlConnetction.query(query, (err, result) => {
            logs.record('Пользователь:' + ' ' + req.session.authUser + ' ' + 'изменил данные по авто ' + ' ' + req.body.vehicle_id_number);
            res.send(result);
        });
    }
});
app.post('/transp/deleteDrivers', (req, res) => {
    for (var i = 0; i < req.body.length; i++) {
        var query = `DELETE FROM transport_drivers WHERE id = ${req.body[i]}`;
        sqlConnetction.query(query, (err, result) => {
            if (result) {
                // res.send(true);
                logs.record('Пользователь:' + ' ' + req.session.authUser + ' ' + 'удалил авто с id ' + ' ' + req.body[i]);
            }
            else {
                // res.send('');  описать ошибку
            }
        });
    }
});
app.post('/transp/deleteCars', (req, res) => {
    for (var i = 0; i < req.body.length; i++) {
        var query = `DELETE FROM transport_cars WHERE id = ${req.body[i]}`;
        var result = sqlConnetction.query(query, (err, result) => { });
    }
    res.send();
});
// Если маршрут не найден
app.get('*', function (req, res) {
    res.redirect('/404');
});

app.listen(config.serverPort, function () {
    console.log(`Server is running on port ${config.serverPort}`);
});
