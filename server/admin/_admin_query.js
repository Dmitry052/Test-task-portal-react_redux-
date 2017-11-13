var bkfd2Password = require("pbkdf2-password");
var passwordHash = require('password-hash');

var dbUtills = require('./admin_dbUtills');

var query = {
    action_GET: function (action, data) {
        switch (action) {
            case 'st':
                return dbUtills.st;
            case 'company':
                return dbUtills.company;
            case 'wg':
                return dbUtills.wg;
            case 'wgbank':
                return dbUtills.wgbank;
            case 'users':
                return dbUtills.users;
            case 'companytowg':
                return dbUtills.companytowg;
            case 'usertowg':
                return dbUtills.usertowg;
            case 'wgincomapny':
                return dbUtills.wgincomapny + `'${data}'` + ' GROUP BY wg_name';
            case 'userinwg':
                return dbUtills.userinwg + `'${data}'` + ' GROUP BY username';
            case 'service_type_name':
                return dbUtills.service_type_name + `'${data}'`;
            default: 
                return null;
        }
    },
    action_POST: function (action, data) {
        switch (action) {
            case 'saveUser':
                var query;
                if (data.type === 'INSERT') {
                    var now = new Date();
                    query = `INSERT INTO users(authid,username,password,displayname,created_at,company_id,email) VALUES (
                        'local:${data.login}','${data.login}','${passwordHash.generate(data.pass)}','${data.displayname}',${Math.floor(now.getTime() / 1000)},${data.company_id},'
                        ${data.email}')`;
                    return { type: 'INSERT', data: query };
                }
                if (data.type === 'UPDATE') {
                    var now = new Date();
                    if (data.pass === '') {
                        query = `UPDATE users SET 
                        authid = 'local:${data.login}',
                        username = '${data.login}',
                        displayname = '${data.displayname}',
                        created_at = ${Math.floor(now.getTime() / 1000)},
                        company_id = ${data.company_id},
                        email = '${data.email}'
                        WHERE id = ${data.id}`;
                    }
                    else {
                        query = `UPDATE users SET 
                        authid = 'local:${data.login}',
                        username = '${data.login}',
                        password = '${passwordHash.generate(data.pass)}',
                        displayname = '${data.displayname}',
                        created_at = ${Math.floor(now.getTime() / 1000)},
                        company_id = ${data.company_id},
                        email = '${data.email}'
                        WHERE id = ${data.id}`;
                    }

                }
                return { type: 'UPDATE', data: query };
            case 'deleteUsers':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM users WHERE id = ${data[i]}`);
                }
                return { type: 'DELETE', data: query }
            case 'saveST':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO service_types(service_name) VALUES('${data.name}')`;
                }
                else {
                    query = `UPDATE service_types SET service_name ='${data.name}' WHERE id = ${data.id}`;
                }
                return { type: 'ST', data: query }
            case 'deleteST':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM service_types WHERE id = ${data[i]}`);
                }
                return { type: 'DEL_ST', data: query }
            case 'saveWG':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO workgroups(wg_name) VALUES('${data.name}')`;
                }
                else {
                    query = `UPDATE workgroups SET wg_name ='${data.name}' WHERE id = ${data.id}`;
                }
                return { type: 'WG', data: query }
            case 'deleteWG':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM workgroups WHERE id = ${data[i]}`);
                }
                return { type: 'DEL_WG', data: query }
            case 'saveWGbank':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO bankwg(wg_name) VALUES('${data.name}')`;
                }
                else {
                    query = `UPDATE bankwg SET wg_name ='${data.name}' WHERE id = ${data.id}`;
                }
                return { type: 'WGbank', data: query }
            case 'deleteWGbank':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM bankwg WHERE id = ${data[i]}`);
                }
                return { type: 'DEL_WGbank', data: query }
            case 'saveCompany':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO company(companyname,contact,coordinator,assignee_sber,service_type) VALUES(
                        '${data.companyname}','${data.contact}','${data.coordinator}','${data.assignee_sber}',${data.st_id})`;
                }
                else {
                    query = `UPDATE company SET 
                    companyname ='${data.companyname}', 
                    contact = '${data.contact}',
                    coordinator = '${data.coordinator}',
                    assignee_sber = '${data.assignee_sber}',
                    service_type = ${data.st_id}
                    WHERE id = ${data.id}`;
                }
                return { type: 'COMPANY', data: query }
            case 'deleteCompany':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM company WHERE id = ${data[i]}`);
                }
                return { type: 'DEL_COMPANY', data: query }
            case 'saveCompanyToWG':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO companytowg(company_id,bank_wg_id,wg_id) VALUES(
                    ${data.company_id},${data.bank_wg_id},${data.wg_id})`;
                }
                else {
                    query = `UPDATE companytowg SET 
                company_id =${data.company_id}, 
                bank_wg_id = ${data.bank_wg_id},
                wg_id = ${data.wg_id}
                WHERE id = ${data.id}`;
                }
                return { type: 'COMPANY_TO_WG', data: query }
            case 'deleteCompanyToWG':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM companytowg WHERE id = ${data[i]}`);
                }
                return { type: 'DEL_COMPANY_TO_WG', data: query }

            case 'saveUserToWG':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO usertowg(wg_id,username_id) VALUES(
                    ${data.wg_id},${data.user_id})`;
                }
                else {
                    query = `UPDATE usertowg SET 
                    wg_id =${data.wg_id}, 
                    username_id = ${data.user_id}
                    WHERE id = ${data.id}`;
                }
                return { type: 'USER_TO_WG', data: query }
            case 'deleteUserToWG':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM usertowg WHERE id = ${data[i]}`);
                }
                return { type: 'DEL_USER_TO_WG', data: query }
            default:
                return { type: null };
        }
    }
}

module.exports = query;