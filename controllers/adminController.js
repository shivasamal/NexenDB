const pool = require("../DB/index");
const queries = require("../Queries/adminqueries");
const jwt = require("jsonwebtoken");

var apiResponse = {
    data: Object,
    message: String,
    token: Object,
    success: Boolean,
    statusCode: Number
}

/**
 * @swagger
 * components:
 *  schemas:
 *   Admin:
 *    type: object
 *    required:
 *     - admin_id
 *     - first_name
 *     - last_name
 *     - mobile
 *     - email
 *     - pwd
 *     - created_date
 *     - modified_date
 *    properties:
 *     first_name:
 *      type: string
 *      description: first name of the admin
 *      example: 'Alasteir'
 *     last_name:
 *      type: string
 *      description: lastName of the admin
 *      example: 'Wingham'
 *     mobile:
 *      type: string
 *      description: mobile of the admin
 *      example: '9621478953'
 *     email:
 *      type: string
 *      description: mail id of the admin
 *      example: 'AlasteirWingham@gmail.com'
 *     pwd:
 *      type: string
 *      description: password of the admin
 *      example: 'xxxxxxxxxxx'
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04 22:07:39'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 */

/**
 * @swagger
 * definitions:
 *  Admin:
 *   type: object
 *   properties:
 *    first_name:
 *     type: string
 *     description: first name of the admin
 *     example: 'Alasteir'
 *    last_name:
 *     type: string
 *     description: lastName of the admin
 *     example: 'Wingham'
 *    mobile:
 *     type: string
 *     description: mobile of the admin
 *     example: '9621478953'
 *    email:
 *     type: string
 *     description: mail id of the admin
 *     example: 'AlasteirWingham@gmail.com'
 *    pwd:
 *     type: string
 *     description: password of the admin
 *     example: 'xxxxxxxxxxx'
 *  Admin_Login:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     example: 'string'
 *    pwd:
 *     type: string
 *     example: 'string'


 */

/**
 * @swagger
 * /api/Admin/Authenticate:
 *  post:
 *   tags:
 *     - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Admin'
 *   responses:
 *    200:
 *     description: success
 */

exports.createAdmin = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            mobile,
            email,
            pwd
        } = req.body;
        console.log(req.body);
        const newAdmin = await pool.query(queries.createAdmin, [first_name, last_name, mobile, email, pwd]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newAdmin.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse); //return res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Admin/login:
 *  post:
 *   tags:
 *    - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Admin_Login'
 *   responses:
 *    200:
 *     description: success
 */

exports.adminLoginCredentials = async (req, res) => {
    try {
        const {
            email,
            pwd
        } = req.body;
        const adminCredentials = await pool.query(queries.adminLoginCredentials, [email, pwd]);
        if (adminCredentials.rows[0] == null) {
            apiResponse.data = null;
            apiResponse.message = "Invalid Credentials";
            apiResponse.success = false;
        } else if (adminCredentials.rows[0] != null) {
            
            const user = {
                email: req.body.email,
                pwd: req.body.pwd
            };
            // jwt.sign({user},'secretkey',(err,token)=>{ config.secret
            //     res.json({token}); 86400
            // })
              //res.status(200).send({ auth: true, token: token,apiResponse: adminCredentials.rows[0], });
             var token =  jwt.sign({user}, 'secretkey',  {
                expiresIn: "900s" // expires in 15 min
            });
            res.status(200).send({ auth: true, token: token, data:adminCredentials.rows[0],message:"success",success:true});

            apiResponse.data = adminCredentials.rows[0],
                apiResponse.message = "success",
                apiResponse.token = token[0],
                apiResponse.success = true
        } else {
            apiResponse.data = null;
            apiResponse.message = err.detail;
            apiResponse.success = false;
        }
        res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err.detail,
            apiResponse.statusCode = res.statusCode;
        return apiResponse; //res.status(500).send(err);
    }
}


/**
 * @swagger
 * /api/Admin/getAllUsers:
 *  get:
 *   tags:
 *    - Admin
 *   responses:
 *    200:
 *     description: success
 */

exports.getAllUsers = async (req, res) => {
    try {
        const users = await pool.query(queries.getAllUsers);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = users.rows,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err,
            apiResponse.success = false;
        return apiResponse; //res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Admin/DeleteUser/{user_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: user_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deleteUser = async (req, res) => {
    try {
        const {
            user_id
        } = req.params;
        let data = {};
        const deleteUser = await pool.query(queries.deleteUser, [user_id]);
        data = deleteUser.rowCount;
        if (data != 0) {
            apiResponse.message = "Deleted Successfully",
                apiResponse.success = true;
            apiResponse.data = [];
        } else {
            apiResponse.data = [];
            apiResponse.message = "No user with this id",
                apiResponse.success = false;
        }
        res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false;
        res.json(500).json(error);
    }
}

