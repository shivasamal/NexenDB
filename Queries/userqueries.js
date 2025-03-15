// tbl_user
const userLogin = "SELECT * FROM tbl_user WHERE email = $1 AND pwd = $2";
const userAuthenticate = "INSERT INTO tbl_user (first_name,last_name,mobile,email,pwd) VALUES($1,$2,$3,$4,$5) RETURNING *";
const userUpdate = "UPDATE tbl_user SET first_name = $1, last_name = $2, mobile = $3,modified_date = current_timestamp  WHERE user_id = $4 RETURNING *"
const userDetails = "SELECT * FROM tbl_user WHERE user_id = $1";

module.exports = {
    userLogin,
    userAuthenticate,
    userUpdate,
    userDetails
};