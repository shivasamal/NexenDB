const pool = require("../DB/index");

var apiResponse = {
    data: Object,
    message: String,
    statusCode: BigInt
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
 *    properties:
 *     sub_id:
 *      type: string
 *      description: Auto generated Id
 *      example: '1'
 *     email:
 *      type: string
 *      description: email of the Subscriber
 *      example: 'subscriber@gmail.com'
 *   ContactUs:
 *    type: object
 *    required:
 *     - contact_id
 *     - name
 *     - subject
 *     - email
 *    properties:
 *     contact_id:
 *      type: string
 *      description: Auto generated Id
 *      example: '1'
 *     name:
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
 *     message:
 *      type: string
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
 *    name:
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
 *    message:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'

 */

/**
 * @swagger
 * /api/Home/Subscriber:
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
        const { email } = req.body;
        const newSubscriber = await pool.query(
            "INSERT INTO tbl_subscribers (email) VALUES($1) RETURNING *",
            [email]);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = newSubscriber.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.statusCode = res.statusCode,
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
        const subscribers = await pool.query("SELECT * FROM tbl_subscribers");
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
 * /api/Home/ContactUs:
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
        const { name, subject, location, email, mobile, message } = req.body;
        const contacts = await pool.query(
            "INSERT INTO tbl_contactUs (name,subject,location,email,mobile,message) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            [name, subject, location, email, mobile, message]);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = contacts.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = null;
        res.json(apiResponse); //return res.status(500).send(err);
    }
}
