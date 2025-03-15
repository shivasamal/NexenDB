const pool = require("../DB/index");
const queries = require("../Queries/userqueries");

var apiResponse = {
    data: Object,
    message: String,
    success: Boolean
}

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - user_id
 *     - first_name
 *     - last_name
 *     - mobile
 *     - email
 *     - pwd
 *     - is_approved
 *     - created_date
 *     - modified_date
 *    properties:
 *     user_id:
 *      type: Integer
 *      description: user Id
 *      example: 1
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
 *     is_approved:
 *      type: boolean
 *      description: approved status
 *      example: false
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 */

/**
 * @swagger
 * definitions:
 *  User:
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
 *    is_approved:
 *     type: boolean
 *     description: status
 *     example: false
 *    modified_by:
 *     type: string
 *     example: 'Admin'
 *  User_Login:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     example: 'string'
 *    pwd:
 *     type: string
 *     example: 'string'
 *  User_Update:
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
 */

/**
 * @swagger
 * /api/User/Authenticate:
 *  post:
 *   tags:
 *     - User
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: success
 */

exports.createUser = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            mobile,
            email,
            pwd
        } = req.body;
        const newUser = await pool.query(queries.userAuthenticate, [first_name, last_name, mobile, email, pwd]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newUser.rows[0],
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
 * /api/User/login:
 *  post:
 *   tags:
 *    - User
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User_Login'
 *   responses:
 *    200:
 *     description: success
 */

exports.userLoginCredentials = async (req, res) => {
    try {
        const {
            email,
            pwd
        } = req.body;
        const userCredentials = await pool.query(queries.userLogin, [email, pwd]);
        if (userCredentials.rows[0] == null) {
            apiResponse.data = null;
            apiResponse.message = "Invalid Credentials";
            apiResponse.success = false;
        } else if (userCredentials.rows[0] != null) {
            apiResponse.data = userCredentials.rows[0];
            apiResponse.message = "success";
            apiResponse.success = true;
        } else {
            apiResponse.data = null;
            apiResponse.message = err.detail;
            apiResponse.success = false;
        }
        res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err.detail,
            apiResponse.success = false;
        return apiResponse; //res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/User/updateUser/{user_id}:
 *  put:
 *   tags:
 *    - User
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: user_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User_Update'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User_Update'
 */

exports.updateUser = async (req, res) => {
    try {
        const {
            user_id
        } = req.params;
        const {
            first_name,
            last_name,
            mobile
        } = req.body;
        const updateUser = await pool.query(queries.userUpdate, [first_name, last_name, mobile, user_id]);
        if(updateUser.rows[0] == null){
            apiResponse.message = "something went wrong";
            apiResponse.success = false;
            apiResponse.data = updateUser.rows[0];
        }
        else{
            apiResponse.message = "success";
            apiResponse.success = true;
            apiResponse.data = updateUser.rows[0];
        }
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}


/**
 * @swagger
 * /api/User/getUserById/{user_id}:
 *  get:
 *   tags:
 *    - User
 *   parameters:
 *    - in: path
 *      name: user_id
 *      schema:
 *       type: string
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */

 exports.getUserById = async (req, res) => {
    try {
        const {user_id} = req.params;
        const userDetail = await pool.query(queries.userDetails, [user_id]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = userDetail.rows,
            res.json(apiResponse);

    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err,
            apiResponse.success = false;
        return apiResponse; //res.status(500).send(err);
    }
}
