module.exports = {

toMeExpl: `SELECT sb_id,status,descr,full_descr,closure_code,date_created,date_done 
FROM requests 
WHERE status<7 and assignee=`,

doneMe: `SELECT sb_id,status,descr,full_descr,closure_code,date_created,date_done 
FROM requests 
INNER JOIN company ON requests.company_id = company.id 
WHERE service_type=1 and status=7`,
}