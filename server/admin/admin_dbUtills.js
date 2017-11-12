module.exports = {
    st: `SELECT * FROM service_types`,
    users: `SELECT users.id,username,displayname,companyname,company_id,FROM_UNIXTIME(created_at,"%d.%m.%Y %h:%i")as created_at,email 
    FROM users
    left join company on company.id = users.company_id`,
    wg: `SELECT * FROM workgroups`,
    wgbank: `SELECT * FROM bankwg`,
    company: `SELECT company.id as company_id,companyname,contact,coordinator,assignee_sber,company.service_type as st_id, service_name
    FROM company
    left join service_types on service_types.id = company.service_type`,
    companytowg: `SELECT companytowg.id as companytowg_id,companytowg.company_id as company_id,
    company.companyname,companytowg.bank_wg_id as bank_wg_id,bankwg.wg_name as bankwg_name,
    companytowg.wg_id as companytowg_wg_id, workgroups.wg_name as wg_name
    FROM companytowg
    left join company on company.id = companytowg.company_id
    left join bankwg on bankwg.id = companytowg.bank_wg_id
    left join workgroups on workgroups.id = companytowg.wg_id`,
    usertowg: `SELECT usertowg.id as usertowg_id,usertowg.wg_id as wg_id,
    workgroups.wg_name, usertowg.username_id, users.username
    FROM usertowg
    left join workgroups on workgroups.id = usertowg.wg_id
    left join users on users.id = usertowg.username_id`,
}