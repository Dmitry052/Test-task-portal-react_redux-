module.exports = {

myWG: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %H:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %H:%i")as date_deadline, date_deadline as unix_date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,displayname,requests.id,commentary_for_driver,
workgroups.id as wg_id, users.id as user_id,
(select displayname from users where id = assignee) as assignee,
assignee as assignee_id
from requests
left JOIN company ON requests.company_id = company.id
left JOIN workgroups ON workgroups.id = requests.workgroup_id
inner join transport_statuses on transport_statuses.id = requests.status
inner join usertowg on usertowg.wg_id = requests.workgroup_id
inner join users on users.id = usertowg.username_id
WHERE requests.status <=5 and service_type=2 and username_id =`,

newOrder: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %H:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %H:%i")as date_deadline,date_deadline as unix_date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,assignee,displayname,requests.id,commentary_for_driver,
(select displayname from users where id = assignee) as assignee
from requests
left JOIN company ON requests.company_id = company.id
left JOIN workgroups ON workgroups.id = requests.workgroup_id
inner join transport_statuses on transport_statuses.id = requests.status
inner join usertowg on usertowg.wg_id = requests.workgroup_id
inner join users on users.id = usertowg.username_id
WHERE requests.status=2 and assignee is null and service_type=2 and username_id =`,

toMeTransp: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %H:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %H:%i")as date_deadline,date_deadline as unix_date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,displayname,requests.id,commentary_for_driver,
(select displayname from users where id = assignee) as assignee
from requests
left JOIN company ON requests.company_id = company.id
left JOIN workgroups ON workgroups.id = requests.workgroup_id
inner join transport_statuses on transport_statuses.id = requests.status
inner join usertowg on usertowg.wg_id = requests.workgroup_id
inner join users on users.id = usertowg.username_id
WHERE service_type=2 and requests.status <= 5 and assignee=`,

carAppoint : `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %H:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %H:%i")as date_deadline, date_deadline as unix_date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,displayname,requests.id,commentary_for_driver,
workgroups.id as wg_id, users.id as user_id,
(select displayname from users where id = assignee) as assignee
from requests
left JOIN company ON requests.company_id = company.id
left JOIN workgroups ON workgroups.id = requests.workgroup_id
inner join transport_statuses on transport_statuses.id = requests.status
inner join usertowg on usertowg.wg_id = requests.workgroup_id
inner join users on users.id = usertowg.username_id
WHERE requests.status =5 and service_type=2 and username_id =`,

doneTrip: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %H:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %H:%i")as date_deadline, date_deadline as unix_date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,displayname,requests.id,commentary_for_driver,
workgroups.id as wg_id, users.id as user_id,
(select displayname from users where id = assignee) as assignee
from requests
left JOIN company ON requests.company_id = company.id
left JOIN workgroups ON workgroups.id = requests.workgroup_id
inner join transport_statuses on transport_statuses.id = requests.status
inner join usertowg on usertowg.wg_id = requests.workgroup_id
inner join users on users.id = usertowg.username_id
WHERE requests.status =7 and service_type=2 and username_id =`,

dataSend: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %H:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %H:%i")as date_deadline,date_deadline as unix_date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,assignee,displayname,requests.id,commentary_for_driver 
from requests
left join transport_statuses on transport_statuses.id = requests.status
INNER JOIN company ON requests.company_id = company.id
INNER JOIN workgroups ON workgroups.id = requests.workgroup_id
LEFT JOIN users on users.id = requests.assignee
WHERE service_type=2 and requests.status=100`,

cancelClient: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %H:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %H:%i")as date_deadline, date_deadline as unix_date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,displayname,requests.id,commentary_for_driver,
workgroups.id as wg_id, users.id as user_id,
(select displayname from users where id = assignee) as assignee
from requests
left JOIN company ON requests.company_id = company.id
left JOIN workgroups ON workgroups.id = requests.workgroup_id
inner join transport_statuses on transport_statuses.id = requests.status
inner join usertowg on usertowg.wg_id = requests.workgroup_id
inner join users on users.id = usertowg.username_id
WHERE requests.status =8 and service_type=2 and username_id =`,               

carDrivers: `SELECT transport_drivers.id,driver_fullname,driver_phone,companyname,company.id as company_id,
vehicle_brand,vehicle_id_number,vehicle_color,transport_drivers_status.status as status,transport_drivers.status as num_status 
FROM users
inner join usertowg on usertowg.username_id = users.id
inner join companytowg on companytowg.wg_id = usertowg.wg_id
inner join company on company.id = companytowg.company_id
inner join transport_drivers on transport_drivers.company_id = companytowg.company_id
inner join transport_drivers_status on transport_drivers_status.id = transport_drivers.status
inner join transport_cars on transport_cars.id = transport_drivers.car_id
inner join transport_cars_status on transport_cars_status.id = transport_cars.status
where transport_drivers.status = 1 and users.id =`,

carDriversAll: `SELECT transport_drivers.id,driver_fullname,driver_phone,companyname,company.id as company_id,
vehicle_brand,vehicle_id_number,vehicle_color,transport_drivers_status.status as status,transport_drivers.status as num_status 
FROM users
inner join usertowg on usertowg.username_id = users.id
inner join companytowg on companytowg.wg_id = usertowg.wg_id
inner join company on company.id = companytowg.company_id
inner join transport_drivers on transport_drivers.company_id = companytowg.company_id
inner join transport_drivers_status on transport_drivers_status.id = transport_drivers.status
inner join transport_cars on transport_cars.id = transport_drivers.car_id
inner join transport_cars_status on transport_cars_status.id = transport_cars.status
where users.id=`,

cars: `SELECT transport_cars.id, vehicle_brand,vehicle_id_number,vehicle_color,company.id as company_id,companyname,
transport_cars_status.status,transport_cars.status as num_status
FROM transport_cars
inner join transport_cars_status on transport_cars_status.id = transport_cars.status
inner join company on company.id = transport_cars.company_id
inner join users on users.company_id = company.id
where users.id =`,
 
carsStatus: `SELECT * FROM transport_cars_status`,

transport_statuses: `SELECT * 
                        FROM transport_statuses`,

transport_wg: `SELECT * 
                FROM workgroups`,
transport_drivers_status: `SELECT * FROM transport_drivers_status;`,

usersToWg: `SELECT workgroups.id,wg_name from usertowg 
            INNER JOIN users ON users.id = usertowg.username_id 
            INNER JOIN workgroups ON workgroups.id = usertowg.wg_id 
            WHERE username_id =`,

listExecutors: `SELECT users.id as id,username,users.displayname
                FROM users
                inner join usertowg on usertowg.username_id = users.id
                inner join workgroups on workgroups.id = usertowg.wg_id
                where wg_name =`,

closureStatuses: `SELECT * FROM closure_statuses`,

companyToUser: `select company.id,company.companyname
from users
left join usertowg on users.id = usertowg.username_id
left join companytowg on companytowg.wg_id = usertowg.wg_id
left join company on company.id = companytowg.company_id
where users.id = `,

getHistory: `SELECT user_id,db_id,sb_id,
(select status  from transport_statuses where id = old_status)as old_status,
(select status  from transport_statuses where id = new_status)as new_status,
(select driver_fullname  from transport_drivers where id = old_driver_id)as old_driver_id,
(select driver_fullname  from transport_drivers where id = new_driver_id)as new_driver_id,
(select wg_name  from workgroups where id = old_workgroup_id)as old_workgroup_id,
(select wg_name  from workgroups where id = new_workgroup_id)as new_workgroup_id,
(select displayname  from users where id = old_assignee)as old_assignee,
(select displayname  from users where id = new_assignee)as new_assignee,
FROM_UNIXTIME(old_ride_start_time,"%d.%m.%Y %H:%i")old_ride_start_time,
FROM_UNIXTIME(new_ride_start_time,"%d.%m.%Y %H:%i")new_ride_start_time,
FROM_UNIXTIME(old_ride_end_time,"%d.%m.%Y %H:%i")old_ride_end_time,
FROM_UNIXTIME(new_ride_end_time,"%d.%m.%Y %H:%i")new_ride_end_time,
old_ride_duration,
new_ride_duration,
old_ride_distance,
new_ride_distance,
FROM_UNIXTIME(old_ride_idle_time,"%d.%m.%Y %H:%i")old_ride_idle_time,
FROM_UNIXTIME(new_ride_idle_time,"%d.%m.%Y %H:%i")new_ride_idle_time,
old_ride_price,
new_ride_price,
old_solution,
new_solution,
(select closure_code_name  from closure_statuses where id = old_closure_code)as old_closure_code,
(select closure_code_name  from closure_statuses where id = new_closure_code)as new_closure_code,
FROM_UNIXTIME(date_edit,"%d.%m.%Y %H:%i:%s") as date_edit,
displayname
FROM audit_requests
left join users on audit_requests.user_id = users.id
where db_id =`
} 
