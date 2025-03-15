// tbl_admin
const createAdmin = "INSERT INTO tbl_admin (first_name,last_name,mobile,email,pwd) VALUES($1,$2,$3,$4,$5) RETURNING *"
const adminLoginCredentials = "SELECT * FROM tbl_admin WHERE email = $1 AND pwd = $2"

// tbl_donations
const updateDonation = "UPDATE tbl_donations SET dntn_type = $1,first_name = $2,last_name = $3,email_id = $4,mobile = $5,gothram = $6,dntn_amt = $7,is_display = $8,is_approved = $9,created_date = $10, created_by = $11, modified_date = $12, modified_by = $13 WHERE donation_id = $14 RETURNING *"
const deleteDonation = "DELETE FROM tbl_donations WHERE donation_id = $1"

// tbl_event_types
const readAllEventTypes = "SELECT * FROM tbl_event_types"
const createEventType = "INSERT INTO tbl_event_types (event_type, created_by, modified_by ) VALUES($1,$2,$3) RETURNING *"
const updateEventType = "UPDATE tbl_event_types SET event_type = $1, created_by = $2, modified_by = $3 WHERE event_type_id = $4 RETURNING *"
const deleteEventType = "DELETE FROM tbl_event_types WHERE event_type_id = $1"

// tbl_events
const createEvent = "INSERT INTO tbl_events (event_type, description, event_date, event_name, start_time, end_time, created_by, modified_by ) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"
const getAllEvents = "SELECT * FROM tbl_events"
const updateEvent = "UPDATE tbl_events SET evnt_type = $1,description = $2,event_date = $3,event_name = $4,start_time = $5,end_time = $6,created_date = $7, created_by = $8, modified_date = $9, modified_by = $10 WHERE event_id = $11 RETURNING *"
const deleteEvent = "DELETE FROM tbl_events WHERE event_id = $1"

// tbl_astrlgy_vastu_services
const getAllAVServices = "SELECT * FROM tbl_astrlgy_vastu_services"
const updateAVService = "UPDATE tbl_astrlgy_vastu_services SET full_name = $1,service_type = $2,addres = $3,email = $4,mobile = $5,msg = $6,created_date = $7, created_by = $8, modified_date = $9, modified_by = $10 WHERE av_id = $11 RETURNING *"
const deleteAVService = "DELETE FROM tbl_astrlgy_vastu_services WHERE av_id = $1"

// tbl_user
const getAllUsers = "SELECT * FROM tbl_user"
const deleteUser = "DELETE FROM tbl_user WHERE user_id = $1"

// tbl_panchangam
const getAllPanchangam = "SELECT * FROM tbl_panchangam"
const createPanchangam = "INSERT INTO tbl_panchangam (tithi,nakshatra,yoga,yamagandam,rahukalam,varjyam,surodayam,suryastamam,panchangam_date,created_by, modified_by ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *"
const updatePanchangam = "UPDATE tbl_panchangam SET tithi = $1, nakshatra = $2,yoga = $3,yamagandam = $4,rahukalam = $5,varjyam = $6,surodayam = $7,suryastamam = $8,panchangam_date = $9,created_by = $10, modified_by = $11 WHERE panchangam_id = $12 RETURNING *"
const deletePanchangam = "DELETE FROM tbl_panchangam WHERE panchangam_id = $1"

// tbl_services_at_temple
const getAllServicesAtTemple = "SELECT * FROM tbl_services_at_temple"
const createServicesAtTemple = "INSERT INTO tbl_services_at_temple (type_of_service,service_date,pooja_description,amount,no_of_tickets,pooja_name,pooja_image) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *"
const updateServicesAtTemple = "UPDATE tbl_services_at_temple SET type_of_service = $1, service_date = $2,pooja_description = $3,amount = $4,no_of_tickets = $5,pooja_name = $6,pooja_image = $7 WHERE service_at_temple_id = $8 RETURNING *"
const deleteServicesAtTemple = "DELETE FROM tbl_services_at_temple WHERE service_at_temple_id = $1"

module.exports = {
    createAdmin,
    adminLoginCredentials,
    updateDonation,
    deleteDonation,
    readAllEventTypes,
    createEventType,
    updateEventType,
    deleteEventType,
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getAllAVServices,
    updateAVService,
    deleteAVService,
    getAllUsers,
    deleteUser,
    getAllPanchangam,
    createPanchangam,
    updatePanchangam,
    deletePanchangam,
    getAllServicesAtTemple,
    createServicesAtTemple,
    updateServicesAtTemple,
    deleteServicesAtTemple
};