// tbl_subscribers
const createSubscriber = "INSERT INTO tbl_subscribers (email) VALUES($1) RETURNING *"
const readAllSubscribers = "SELECT * FROM tbl_subscribers"

// tbl_contactUs
const createContacts = "INSERT INTO tbl_contactUs (full_name,subject,location,email,mobile,msg) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"

module.exports = {
    createSubscriber,
    readAllSubscribers,
    createContacts,
};