module.exports = {
    // Эксплуотация
toMeExpl: `SELECT sb_id,status,descr,full_descr,closure_code,date_created,date_done 
        FROM requests 
        WHERE status<7 and assignee=`,

doneMe: `SELECT sb_id,status,descr,full_descr,closure_code,date_created,date_done 
        FROM requests 
        INNER JOIN company ON requests.company_id = company.id 
        WHERE service_type=1 and status=7`,
    // Транспорт
myWG: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %h:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %h:%i")as date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,assignee,displayname,requests.id 
from requests
left join transport_statuses on transport_statuses.id = requests.status
INNER JOIN company ON requests.company_id = company.id
INNER JOIN workgroups ON workgroups.id = requests.workgroup_id
LEFT JOIN users on users.id = requests.assignee
WHERE service_type=`,

toMeTransp: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %h:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %h:%i")as date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,assignee,displayname,requests.id 
from requests
left join transport_statuses on transport_statuses.id = requests.status
INNER JOIN company ON requests.company_id = company.id
INNER JOIN workgroups ON workgroups.id = requests.workgroup_id
LEFT JOIN users on users.id = requests.assignee
WHERE service_type=2 and requests.status=5 and assignee=`,

doneTrip: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %h:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %h:%i")as date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,assignee,displayname,requests.id 
from requests
left join transport_statuses on transport_statuses.id = requests.status
INNER JOIN company ON requests.company_id = company.id
INNER JOIN workgroups ON workgroups.id = requests.workgroup_id
LEFT JOIN users on users.id = requests.assignee
WHERE service_type=2 and requests.status=7`,

dataSend: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %h:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %h:%i")as date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,assignee,displayname,requests.id 
from requests
left join transport_statuses on transport_statuses.id = requests.status
INNER JOIN company ON requests.company_id = company.id
INNER JOIN workgroups ON workgroups.id = requests.workgroup_id
LEFT JOIN users on users.id = requests.assignee
WHERE service_type=2 and requests.status=100`,

cancelClient: `select sb_id, transport_statuses.status as status, requests.status as id_status,users.displayname,descr,full_descr,closure_code,
FROM_UNIXTIME(date_created,"%d.%m.%Y %h:%i")as date_created,FROM_UNIXTIME(date_deadline,"%d.%m.%Y %h:%i")as date_deadline,
bank_contact,bank_contact_phone,travel_from,travel_to,ride_stops,ride_start_time,ride_end_time,ride_duration,ride_distance,
ride_idle_time,ride_price,solution,driver_id,workgroup_id,wg_name,assignee,displayname,requests.id 
from requests
left join transport_statuses on transport_statuses.id = requests.status
INNER JOIN company ON requests.company_id = company.id
INNER JOIN workgroups ON workgroups.id = requests.workgroup_id
LEFT JOIN users on users.id = requests.assignee
WHERE service_type=2 and requests.status=8`,               

    carDrivers: `SELECT * 
                 FROM transport_drivers 
                 WHERE company_id=`,

    cars: `SELECT * 
           FROM transport_cars`,

    transport_statuses: `SELECT * 
                         FROM transport_statuses`,

    transport_wg: `SELECT * 
                   FROM workgroups`,

    usersToWg: `SELECT workgroups.id,wg_name from usertowg 
                INNER JOIN users ON users.id = usertowg.username_id 
                INNER JOIN workgroups ON workgroups.id = usertowg.wg_id 
                WHERE username_id =`,

    listExecutors: `SELECT 
                    displayname,wg_id,username_id
                    FROM usertowg 
                    INNER JOIN workgroups on usertowg.wg_id = workgroups.id 
                    INNER JOIN users on usertowg.username_id = users.id 
                    WHERE wg_name =`,

    closureStatuses: `SELECT * FROM closure_statuses`
} 
