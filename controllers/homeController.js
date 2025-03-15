const pool = require("../DB/index");
const queries = require("../Queries/homequeries");

var apiResponse = {
    data: Object,
    message: String,
    success: Boolean
}

/**
 * @swagger
 * components:
 *  schemas:
 *   Subscriber:
 *    type: object
 *    required:
 *     - email
 *     - sub_id
 *     - created_date
 *     - modified_date
 *    properties:
 *     sub_id:
 *      type: string
 *      description: Auto generated Id
 *      example: '1'
 *     email:
 *      type: string
 *      description: email of the Subscriber
 *      example: 'subscriber@gmail.com'
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
 *   ContactUs:
 *    type: object
 *    required:
 *     - contact_id
 *     - full_name
 *     - subject
 *     - email
 *     - created_date
 *     - modified_date
 *    properties:
 *     contact_id:
 *      type: string
 *      description: Auto generated Id
 *      example: '1'
 *     full_name:
 *      type: string
 *      description: email of the Subscriber
 *     subject:
 *      type: string
 *     location:
 *      type: string
 *     email:
 *      type: string
 *     mobile:
 *      type: string
 *     msg:
 *      type: string
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
 *  Subscriber:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'subscriber@gmail.com'
 *  ContactUs:
 *   type: object
 *   properties:
 *    full_name:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'    
 *    subject:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'    
 *    location:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'    
 *    email:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'
 *    mobile:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'
 *    msg:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'
 */

/**
 * @swagger
 * /api/Home/AddSubscriber:
 *  post:
 *   tags:
 *     - Home
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Subscriber'
 *   responses:
 *    200:
 *     description: success
 *     examples:
 *      application/json:
 *        schema:
 *         $ref: '#/definitions/Subscriber'
 */

exports.createSubscriber = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        const newSubscriber = await pool.query(
            queries.createSubscriber,
            [email]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newSubscriber.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = "Email already Exits",
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
};

/**
 * @swagger
 * /api/Home/getAllSubscribers:
 *  get:
 *   tags:
 *     - Home
 *   responses:
 *    200:
 *     description: success
 */

exports.readAllSubscribers = async (req, res) => {
    try {
        const subscribers = await pool.query(queries.readAllSubscribers);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = subscribers.rows,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err,
            apiResponse.statusCode = res.statusCode;
        return apiResponse; //res.status(500).send(err);
    }
}


/**
 * @swagger
 * /api/Home/AddContactUs:
 *  post:
 *   tags:
 *    - Home
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ContactUs'
 *   responses:
 *    200:
 *     description: success
 *     examples:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 */

exports.createContacts = async (req, res) => {
    try {
        const {
            full_name,
            subject,
            location,
            email,
            mobile,
            msg
        } = req.body;
        const contacts = await pool.query(
            queries.createContacts,
            [full_name, subject, location, email, mobile, msg]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = contacts.rows[0],
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
 * /api/Home/health:
 *  get:
 *   tags:
 *     - Home
 *   responses:
 *    200:
 *     description: success
 */

exports.checkHealth = async (req, res) => {
    res.status(200).send({
        message: "working..."
    });
}
