module.exports = {
    st: `SELECT * FROM service_types`,
    users: `SELECT users.id,username,displayname,companyname,company_id,created_at,email 
    FROM users
    left join company on company.id = users.company_id`,
    usergroups: `SELECT workgroups.id,wg_name 
    FROM workgroups
    inner join usertowg on usertowg.wg_id = workgroups.id
    inner join users on users.id = usertowg.username_id
    where users.id =`,
    wg: `SELECT workgroups.id,wg_name, company.id as company_id,company.companyname  
    FROM workgroups
    inner join company on company.id = workgroups.company_id
    group by workgroups.id,wg_name, company_id,company.companyname`,
    wgbank: `SELECT * FROM bankwg`,
    get_id_wg: `SELECT id
    from workgroups
    where wg_name =`,
    company: `SELECT company.id as company_id,companyname,contact,coordinator,assignee_sber,company.service_type as st_id, service_name
    FROM company
    left join service_types on service_types.id = company.service_type`,
    companytowg: `SELECT companytowg.id as companytowg_id,companytowg.company_id as company_id,
    company.companyname,companytowg.bank_wg_id as bank_wg_id,bankwg.wg_name as bankwg_name,
    companytowg.wg_id as companytowg_wg_id, workgroups.wg_name as wg_name
    FROM companytowg
    left join company on company.id = companytowg.company_id
    left join bankwg on bankwg.id = companytowg.bank_wg_id
    inner join workgroups on workgroups.id = companytowg.wg_id`,
    wgincomapny: `SELECT wg_name 
    FROM workgroups
    where company_id =`,
    userinwg: `SELECT username 
    FROM users
    inner join usertowg on usertowg.username_id = users.id
    inner join workgroups on usertowg.wg_id = workgroups.id
    where wg_name =`,
    usertowg: `SELECT usertowg.id as usertowg_id,usertowg.wg_id as wg_id,workgroups.wg_name, usertowg.username_id, users.username,users.company_id,companyname FROM usertowg
    left join workgroups on workgroups.id = usertowg.wg_id
    left join users on users.id = usertowg.username_id
    left join company on company.id = users.company_id`,
    service_type_name: `SELECT service_types.id,service_name FROM service_types inner join company on company.service_type = service_types.id where company.id =`

}