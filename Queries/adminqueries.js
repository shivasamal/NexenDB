// tbl_admin
const createAdmin = "INSERT INTO tbl_admin (first_name,last_name,mobile,email,pwd) VALUES($1,$2,$3,$4,$5) RETURNING *"
const adminLoginCredentials = "SELECT * FROM tbl_admin WHERE email = $1 AND pwd = $2"

// tbl_user
const getAllUsers = "SELECT * FROM tbl_user"
const deleteUser = "DELETE FROM tbl_user WHERE user_id = $1"


module.exports = {
    createAdmin,
    adminLoginCredentials,
    getAllUsers,
    deleteUser,
};