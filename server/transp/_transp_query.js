var dbUtills = require('./transp_dbUtills');

var query = {
    action_GET: function (action, userID, serviceType, companyID, executor, sb_id, authUser, data) {
        console.log('data in utills', data);
        switch (action) {
            // Фильтры левого меню
            case 'myWG':
                return dbUtills.myWG + userID;
            case 'toMe':
                return dbUtills.toMeTransp + userID + ' and username_id =' + userID;
            case 'newOrder':
                return dbUtills.newOrder + userID;
            case 'carAppoint':
                return dbUtills.carAppoint + userID;
            case 'doneTrip':
                return dbUtills.doneTrip + userID;
            case 'cancelClient':
                return dbUtills.cancelClient + userID;
            // Для грида
            case 'carDrivers':
                return dbUtills.carDrivers + userID + ` group by id,driver_fullname,driver_phone,companyname,company_id,vehicle_brand,vehicle_id_number,vehicle_color,status,num_status`;
            case 'carDriversAll':
                return dbUtills.carDriversAll + userID + ` group by id,driver_fullname,driver_phone,companyname,company_id,vehicle_brand,vehicle_id_number,vehicle_color,status,num_status`;
            case 'cars':
                return dbUtills.cars + userID;
            case 'cars-status':
                return dbUtills.carsStatus;
            case 'transport_statuses':
                return dbUtills.transport_statuses;
            case 'transport-drivers-status':
                return dbUtills.transport_drivers_status
            case 'userstowg':
                return dbUtills.usersToWg + userID;
            case 'companyToUser':
                return dbUtills.companyToUser + userID;
            case 'closureStatuses':
                return dbUtills.closureStatuses;
            case 'transpExecutor':
                return dbUtills.listExecutors + `'${data}'`;
            case 'getHistory':
                return dbUtills.getHistory + `'${sb_id}'`;
            default:
                return null;
        }
    },
    action_POST: function (action, data, userID) {
        switch (action) {
            case 'saveOrder':
                var now = new Date();
                var audit = [];
                var query_req = `UPDATE requests SET status=${data.status.new},
                        driver_id=${data.driver_id.new === undefined ? null : data.driver_id.new},
                        workgroup_id=${data.workgroup_id.new === undefined ? null : data.workgroup_id.new},
                        assignee=${data.assignee.new === undefined ? null : data.assignee.new},
                        ride_start_time=${data.ride_start_time.new === undefined || data.ride_start_time.new === null ? null : data.ride_start_time.new},
                        ride_end_time=${data.ride_end_time.new === undefined || data.ride_end_time.new === '' ? null : data.ride_end_time.new},
                        ride_duration='${data.ride_duration.new === undefined || data.ride_duration.new === '' ? null : data.ride_duration.new}',
                        ride_distance='${data.ride_distance.new === undefined || data.ride_distance.new === '' ? null : data.ride_distance.new}',
                        ride_idle_time='${data.ride_idle_time.new === undefined || data.ride_idle_time.new === '' ? null : data.ride_idle_time.new}',
                        ride_price='${data.ride_price.new === undefined || data.ride_price.new === '' ? null : data.ride_price.new}',
                        closure_code=${data.closure_code.new === undefined || data.closure_code.new === '' ? null : data.closure_code.new},
                        solution='${data.solution.new === undefined || data.solution.new === '' ? null : data.solution.new}'
                        where id=${data.id}`;
                // Проверка на записи без изменений
                for (var key in data) {
                    if (data[key].old !== data[key].new) {
                        var query = `INSERT INTO audit_requests(user_id,db_id,sb_id,old_status,new_status,old_driver_id,new_driver_id,old_workgroup_id,new_workgroup_id,old_assignee,new_assignee,
                                old_ride_start_time,new_ride_start_time,old_ride_end_time,new_ride_end_time,old_ride_duration,new_ride_duration,
                                old_ride_distance,new_ride_distance,old_ride_idle_time,new_ride_idle_time,old_ride_price,new_ride_price,old_solution,
                                new_solution,old_closure_code,new_closure_code,date_edit)VALUES(
                                ${userID},${data.id},'${data.sb_id}',
                                ${data.status.old},${data.status.new},${data.driver_id.old},${data.driver_id.new},
                                ${data.workgroup_id.old},${data.workgroup_id.new},${data.assignee.old},${data.assignee.new},
                                ${data.ride_start_time.old},${data.ride_start_time.new},${data.ride_end_time.old},${data.ride_end_time.new},
                                '${data.ride_duration.old}','${data.ride_duration.new}','${data.ride_distance.old}','${data.ride_distance.new}' ,
                                '${data.ride_idle_time.old}','${data.ride_idle_time.new}','${data.ride_price.old}','${data.ride_price.new}',
                                '${data.solution.old === undefined || data.solution.old === '' ? null : data.solution.old}',
                                '${data.solution.new === undefined || data.solution.new === '' ? null : data.solution.new}',
                                ${data.closure_code.old === undefined || data.closure_code.old === '' ? null : data.closure_code.old},
                                ${data.closure_code.new === undefined || data.closure_code.new === '' ? null : data.closure_code.new},
                                ${Math.floor(now.getTime() / 1000)}
                            )`;
                        audit.push(query);
                        break;
                    } 
                }
                return { type: "ORDER", data: [query_req, audit] };
            case 'saveDriver':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO transport_drivers(driver_fullname,driver_phone,status,car_id,company_id) VALUES(
                            '${data.driver_fullname}',
                            ${data.driver_phone},
                            ${data.status},
                            ${data.car_id === undefined ? null : data.car_id},
                            ${data.company_id})`;
                }
                else {
                    query = `UPDATE transport_drivers SET 
                    driver_fullname = '${data.driver_fullname}',
                    driver_phone = ${data.driver_phone},
                    status = ${data.status},
                    car_id = ${data.car_id},
                    company_id = ${data.company_id} 
                    WHERE id = ${data.id}`;
                }
                return { type: "DRIVER", data: query };
            case 'saveCar':
                var query;
                if (data.type === 'INSERT') {
                    query = `INSERT INTO transport_cars(vehicle_brand,vehicle_id_number,vehicle_color,status,company_id) VALUES(
                        '${data.vehicle_brand}',
                        '${data.vehicle_id_number}',
                        '${data.vehicle_color}',
                        ${data.status},
                        ${data.company_id})`;
                }
                else {
                    query = `UPDATE transport_cars SET
                        vehicle_brand = '${data.vehicle_brand}',
                        vehicle_id_number = '${data.vehicle_id_number}',
                        vehicle_color = '${data.vehicle_color}',
                        status = ${data.status},
                        company_id = ${data.company_id}
                        WHERE id = ${data.id} `;
                }
                return { type: "CAR", data: query };
            case 'deleteDrivers':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM transport_drivers WHERE id = ${data[i]}`);
                }
                return { type: "DEL_DRIVERS", data: query };
            case 'deleteCars':
                var query = [];
                for (var i = 0; i < data.length; i++) {
                    query.push(`DELETE FROM transport_cars WHERE id = ${data[i]}`);
                }
                return { type: "DEL_CARS", data: query }
            default:
                return null;
        }
    }
}

module.exports = query;