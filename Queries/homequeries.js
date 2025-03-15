// tbl_subscribers
const createSubscriber = "INSERT INTO tbl_subscribers (email) VALUES($1) RETURNING *"
const readAllSubscribers = "SELECT * FROM tbl_subscribers"

// tbl_contactUs
const createContacts = "INSERT INTO tbl_contactUs (full_name,subject,location,email,mobile,msg) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"

// tbl_donation_types
const readAllDonationTypes = "SELECT * FROM tbl_donation_types"

// tbl_donations
const addDonations = "INSERT INTO tbl_donations (dntn_type,first_name,last_name,email_id,mobile,gothram,dntn_amt,is_display,is_approved, created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *"
const readAllDonations = "SELECT * FROM tbl_donations"

// tbl_astrlgy_vastu_services
const createAVService = "INSERT INTO tbl_astrlgy_vastu_services (full_name, service_type, addres, email, mobile, msg, created_by, modified_by ) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"

// tbl_piligrim_services
const createPilgrimService = "INSERT INTO tbl_piligrim_services (srvc_name,srvc_date,no_of_persons,mobile,email,is_items_req, created_by, modified_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"
const getAllPilgrmSrvcs = "SELECT * FROM tbl_piligrim_services"
const updatePilgrmService = "UPDATE tbl_piligrim_services SET srvc_name = $1,srvc_date = $2,no_of_persons = $3,mobile = $4,email = $5,is_items_req = $6,created_date = $7, created_by = $8,  modified_by = $9 WHERE pilgrm_id = $10 RETURNING *"

module.exports = {
    createSubscriber,
    readAllSubscribers,
    createContacts,
    readAllDonationTypes,
    addDonations,
    readAllDonations,
    createAVService,
    createPilgrimService,
    getAllPilgrmSrvcs,
    updatePilgrmService
};